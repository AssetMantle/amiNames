import React, { useEffect, useState } from "react";
import Modal from "@/ui_components/Modal";
import Button from "@/ui_components/Button";
import Image from "next/image";
import { icons } from "@/utils/images";
import { useChain } from "@cosmos-kit/react";
import {
  chain,
  defaultChainDenom,
  mintModalHeadingText,
  defaultFeeAmount,
  defaultFeeGas,
  rpc,
  warpcastUrl,
  assetmantleUrlLink,
} from "@/constant";
import {
  assetmantle,
  cosmos,
  getSigningAssetmantleClient,
} from "@assetmantle/mantlejs";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  showToastMessage,
} from "@/utils";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { IconWrapper } from "./IconWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./Loading";

const MintModal = ({
  isOpen,
  setOpen,
  userName,
  isPremium,
  provisionAddress,
  isValidRef,
}: any) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const query = useSearchParams();
  const router = useRouter();
  const recaptchaRef = React.createRef();
  const chainContext = useChain(chain);
  const [loader, setLoader] = useState(false);
  const [LoadingScreen, setLoadingScreen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isInsufficientBalance, setIsInsufficientBalance] = useState(false);
  const [transactionData, setTransactonData] = useState({} as any);
  const { address, getOfflineSignerDirect, connect, getCosmWasmClient } =
    chainContext;
  const handleMint = async () => {
    //@ts-ignore
    recaptchaRef.current.execute();
    if (!address) {
      connect();
      return;
    }
    setLoader(true);
    let response;
    const fee = {
      amount: [
        {
          denom: defaultChainDenom,
          amount: defaultFeeAmount,
        },
      ],
      gas: defaultFeeGas,
    };
    let memo;
    let msg;
    try {
      let referer = query.get("referral");

      if (!isValidRef) {
        const list = getFromLocalStorage("amiNamesList");
        if (!list?.length) {
          throw new Error("Invalid referral link");
        } else {
          const nameList =
            list && list.filter((item: any) => item.address === address);
          referer = nameList?.[0]?.name;
        }
      }

      // get signer from getOfflineSigner passed from the selected chain and wallet from cosmos kit component
      const signer = await getOfflineSignerDirect();
      // create the signing client using the given signer and selected rpc endpoint
      const mantleRpcClient = await getSigningAssetmantleClient({
        rpcEndpoint: rpc,
        signer,
      });
      const balance = await mantleRpcClient.getBalance(
        address,
        defaultChainDenom
      );
      if (Number(balance?.amount) < 0.3) {
        throw new Error("Insufficient balance");
      }
      // verify the signing client and from address
      if (!mantleRpcClient || !address) {
        throw new Error("stargateClient or from address undefined");
      }
      // get the message composer function from mantlejs
      memo = `${referer},${userName}`;
      if (isPremium) {
        const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;
        msg = send({
          fromAddress: address,
          toAddress: provisionAddress,
          amount: [
            {
              denom: defaultChainDenom,
              amount: defaultFeeAmount,
            },
          ],
        });
      } else {
        msg =
          assetmantle.modules.identities.transactions.name.MessageComposer.withTypeUrl.handle(
            {
              from: address,
              name: assetmantle.schema.ids.base.StringID.fromPartial({
                iDString: userName,
              }),
            }
          );
      }
      // call the sign and broadcast function and pass the message and other arguments
      response = await mantleRpcClient.signAndBroadcast(
        address,
        [msg],
        fee,
        memo
      );
      if (response.rawLog?.includes("entity already exists")) {
        showToastMessage("error", "AMI name already registered");
        setLoader(false);
        setOpen(false);
        return;
      }
      if (!response.code) {
        setSuccess(true);
        setLoader(false);
      } else {
        showToastMessage("error", response?.rawLog ?? "");
        setLoader(false);
        setOpen(false);
        return;
      }
      const amiNamesList = getFromLocalStorage("amiNamesList") ?? [];
      amiNamesList.push({
        address: address,
        name: userName,
      });
      saveToLocalStorage("amiNamesList", amiNamesList);
      setTransactonData(response);
      window.dispatchEvent(new Event("storage"));
      return { response, error: null };
    } catch (error) {
      //@ts-ignore
      showToastMessage("error", error?.message);
      setLoader(false);
      setOpen(false);
    }
  };

  const getBalance = async () => {
    if (address) {
      const client = await getCosmWasmClient();
      const balance = await client.getBalance(address, defaultChainDenom);
      if (Number(balance?.amount) < 0.3) {
        setIsInsufficientBalance(true);
      } else {
        setIsInsufficientBalance(false);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      getBalance();
    }
  }, [isOpen]);

  const onReCAPTCHAChange = (captchaCode: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    //@ts-ignore
    recaptchaRef?.current?.reset();
  };

  const handleCopy = (addressId: string) => {
    navigator.clipboard.writeText(addressId);
    showToastMessage("success", "Link Copied");
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
  };

  return (
    <>
      <Modal
        openModal={isOpen}
        setOpenModal={setOpen}
        className="rounded-lg"
        header={""}
        closeModal={() => {
          setLoadingScreen(true);
          router.push(`/profile/${userName}`);
          handleClose();
        }}
      >
        {success ? (
          <>
            <Image
              className="object-contain absolute h-8 w-8 top-2 right-2 cursor-pointer"
              alt="selected"
              src={icons.close}
              onClick={
                loader
                  ? () => {
                      return;
                    }
                  : () => handleClose()
              }
            />
            <div className="flex flex-col items-center pt-[30px] pb-8 font-inter">
              <div className="border-b border-b-[#D4DCE2] flex flex-col items-center pb-6">
                <Image src={icons.successTick} alt="success" />
                <p className="font-semibold text-[40px] leading-[48px] text-primary mt-6">
                  Claimed successfully!
                </p>
                <a
                  className="mt-4 underline block cursor-pointer"
                  target="_blank"
                  href={`https://explorer.assetmantle.one/transactions/${transactionData.transactionHash}`}
                >
                  View in explorer
                </a>
              </div>
              <p className="paragraph_regular mt-6">
                Share the referral link and invite your friends to AMI Names
              </p>

              <div className="mt-4 flex items-center gap-2 cursor-pointer">
                <a
                  className=" heading3_semibold leading-6 block cursor-pointer text-[#396AF6]"
                  target="_blank"
                  href={`${window.location.origin}?referral=${userName}`}
                >
                  {`${window.location.origin}?referral=${userName}`}
                </a>

                <IconWrapper
                  iconClassName="content_copy"
                  iconSize="text-2xl text-[#396AF6]"
                  onClick={() => {
                    handleCopy(
                      `${window.location.origin}?referral=${userName}`
                    );
                  }}
                />
              </div>

              <p className="paragraph_regular mt-6">or share via</p>
              <div className="flex items-center justify-center mt-6">
                <div className="grid grid-cols-4 gap-7">
                  <Link
                    href={`https://twitter.com/intent/tweet?url=${window.location.origin}?referral=${userName}`}
                    target="_blank"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image
                        src={icons.twitter}
                        width={36}
                        height={36}
                        alt="twitter"
                      />
                      <p className="text-[12px] leading-4 font-medium text-black">
                        {"Twitter"}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`https://telegram.me/share/url?url=${window.location.origin}?referral=${userName}`}
                    target="_blank"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image
                        src={icons.telegram}
                        width={36}
                        height={36}
                        alt="telegram"
                      />
                      <p className="text-[12px] leading-4 font-medium text-black">
                        {"Telegram"}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}?referral=${userName}`}
                    target="_blank"
                  >
                    <div className="flex flex-col items-center justify-center  gap-2">
                      <Image
                        src={icons.linkedin}
                        width={36}
                        height={36}
                        alt="linkedin"
                      />
                      <p className="text-[12px] leading-4 font-medium text-black">
                        {"LinkedIn"}
                      </p>
                    </div>
                  </Link>
                  <Link href={warpcastUrl} target="_blank">
                    <div className="flex flex-col items-center justify-center  gap-2">
                      <Image
                        src={icons.warpcast}
                        width={36}
                        height={36}
                        alt="warpcast"
                      />
                      <p className="text-[12px] leading-4 font-medium text-black">
                        {"Warpcast"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Image
              className="object-contain absolute h-8 w-8 top-2 right-2 cursor-pointer"
              alt="selected"
              src={icons.close}
              onClick={
                loader
                  ? () => {
                      return;
                    }
                  : () => setOpen(false)
              }
            />
            <div className=" mb-4 flex flex-col items-center font-inter">
              <p className="text-primary text-center text-[20px]">
                {mintModalHeadingText}
              </p>
              <div className="bg-[#EBF0FE] rounded-lg border border-[#88A6FA] mt-8 mb-6 w-[80%] py-5">
                <p className="text-primary text-center leading-10 text-[32px] font-black">
                  {userName}
                </p>
              </div>
              <div className="p-5 mb-8 text-[16px] w-[80%] border border-[#88A6FA] rounded-lg">
                {isPremium && (
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-primary opacity-80">Registration fee</p>
                    <p className="text-primary opacity-80"> ~0.002 MNTL </p>
                  </div>
                )}
                <div className="flex items-center justify-between mb-5">
                  <p className="text-primary opacity-80">Network fee</p>
                  <p className="text-primary opacity-80">~0.3 MNTL</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-primary font-medium">Estimated total</p>
                  <p className="text-primary font-medium">
                    ~{isPremium ? 0.302 : 0.3} MNTL
                  </p>
                </div>
              </div>
              <Button
                type="button"
                className={` ${
                  loader || isInsufficientBalance
                    ? "cursor-not-allowed disabled opacity-30"
                    : ""
                } inline-block rounded-full bg-[#396AF6] px-[120px] pb-2 pt-2.5 text-md font-medium  leading-normal text-white  transition duration-150 ease-in-out hover:bg-warning-600  focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]`}
                onClick={
                  isInsufficientBalance
                    ? () => {
                        return;
                      }
                    : () => handleMint()
                }
              >
                {loader ? "Please wait..." : "Claim"}
              </Button>
              {isInsufficientBalance && (
                <p className="mt-2 text-error text-center">
                  Insufficient balance,
                  <br /> wallet should contain minimum balance of 0.3MTNL token
                  to claim.
                </p>
              )}

              <div className="mt-5 flex items-center gap-1">
                <Link href={assetmantleUrlLink} target={"_blank"}>
                  <Image src={icons.assetmantleLogo} alt="assetMantleLogo" />
                </Link>
                <p className="text-primary font-semibold">Blockchain</p>
              </div>
            </div>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={siteKey}
              onChange={onReCAPTCHAChange}
            />
          </>
        )}
      </Modal>
      <Loading Show={LoadingScreen} setShow={setLoadingScreen} />
    </>
  );
};
export default MintModal;
