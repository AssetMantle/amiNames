"use client";
import {
  chain,
  defaultChainDenom,
  defaultFeeAmount,
  defaultFeeGas,
  warpcastUrl,
} from "@/constant";

import { isValidReferrer, showToastMessage, updateMyAmiList } from "@/utils";
import { assetmantle, cosmos } from "@assetmantle/mantlejs";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
//@ts-ignore
import { defaultReferrer, useReferralRouter } from "@/config";
import { useBalance, useTx } from "@/utils/useTx";
import { ClipboardCopyText } from "@interchain-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MdContentCopy } from "react-icons/md";
import Modal from "./Modal";

const MintModal = ({
  isOpen,
  setOpen,
  userName,
  isPremium,
  provisionAddress,
}: any) => {
  // const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const router = useReferralRouter();
  const recaptchaRef = React.createRef();
  const chainContext = useChain(chain);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [CurrentBalance, setCurrentBalance] = useState<string>("0");
  const { address } = chainContext;
  const { tx } = useTx();
  const { getBalance } = useBalance();
  const query = useSearchParams();

  useEffect(() => {
    const amount = async () => {
      const val = (address && (await getBalance(address))) ?? "0";
      setCurrentBalance(val);
    };
    amount();
  }, [address]);

  const handleMint = async () => {
    //@ts-ignore
    if (!address) {
      showToastMessage("error", "Wallet not connected properly");
      handleClose();
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
    let isValidRef = false;
    let referrer;
    try {
      if (query) {
        referrer = query.get("referral");
        const isValidRefObject = await isValidReferrer(referrer || "");
        isValidRef = isValidRefObject?.isValidUserName;
      }
      const finalReferrer = isValidRef ? referrer : defaultReferrer;

      // get the message composer function from mantlejs
      memo = `${finalReferrer},${userName}`;
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
      console.log("msg: ", msg, " memo: ", memo, " fee: ", fee);
      response = await tx([msg], memo, { fee });
      if (response.isSuccess) {
        setSuccess(true);
        setLoader(false);
        updateMyAmiList(userName, address);
        localStorage.setItem("referral", userName as string);
      } else {
        if (response?.error?.message?.includes?.("entity already exists")) {
          showToastMessage("error", "AMI name already registered");
          console.error("error in tx: ", response?.error?.message);
          setLoader(false);
          return;
        } else {
          showToastMessage("error", response?.error?.message ?? "");
          console.error("error in tx2: ", response?.error?.message);
          setLoader(false);
          return;
        }
      }

      return { response, error: null };
    } catch (error) {
      //@ts-ignore
      showToastMessage("error", error?.message);
      setLoader(false);
      setOpen(false);
    }
  };

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

  const newGeneratedUrl = `${window.location.origin}?referral=${userName}`;

  const claimedModalJSX = (
    <>
      <Image
        className="object-contain absolute h-8 w-8 top-5 right-5 cursor-pointer"
        alt="selected"
        src={`/assets/images/icons/close.svg`}
        width={32}
        height={32}
        onClick={
          loader
            ? () => {
                return;
              }
            : () => handleClose()
        }
      />
      <div className="flex flex-col items-center py-7 px-2 font-inter w-full gap-6">
        <div className="border-b-2 border-b-[#D4DCE2] flex flex-col gap-6 items-center pb-6 w-full">
          <Image
            src={`/assets/images/icons/success_tick.svg`}
            alt="success"
            width={94}
            height={94}
          />
          <p className="font-bold text-[24px] leading-[24px] text-primary">
            Claimed successfully!
          </p>
        </div>
        <p className="paragraph_regular text-center">
          Share the referral code and invite your friends to AMI Names
        </p>

        <div className="flex items-center gap-2 cursor-pointer">
          <a
            className=" text-md leading-4 block cursor-pointer text-[#396AF6] truncate flex-1"
            target="_blank"
            href={newGeneratedUrl}
            rel="noreferrer"
          >
            {newGeneratedUrl}
          </a>
          <MdContentCopy
            role="button"
            tabIndex={0}
            className="text-2xl text-[#396AF6]"
            onClick={() => {
              handleCopy(newGeneratedUrl);
            }}
          />
        </div>

        <p className="paragraph_regular">or share via</p>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-4 gap-7">
            <Link
              href={`https://twitter.com/intent/tweet?url=${newGeneratedUrl}`}
              target="_blank"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={`/assets/images/icons/twitter.png`}
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
              href={`https://telegram.me/share/url?url=${newGeneratedUrl}`}
              target="_blank"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Image
                  src={`/assets/images/icons/telegram.png`}
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
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${newGeneratedUrl}`}
              target="_blank"
            >
              <div className="flex flex-col items-center justify-center  gap-2">
                <Image
                  src={`/assets/images/icons/linkedin.png`}
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
                  src={`/assets/images/icons/warpcast.png`}
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
  );

  const confirmModalJSX = (
    <>
      <Image
        className="object-contain absolute h-8 w-8 top-5 right-5 cursor-pointer"
        alt="selected"
        src={`/assets/images/icons/close.svg`}
        width={32}
        height={32}
        onClick={
          loader
            ? () => {
                return;
              }
            : () => setOpen(false)
        }
      />
      <div className="flex gap-6 flex-col items-center font-inter">
        <p className="text-primary text-[20px] font-bold w-full">
          Name Available
        </p>
        <div className="bg-[#bfe3c299] rounded-lg border border-[#42A153] w-[100%] py-5">
          <p className="text-primary text-center leading-10 text-[32px] font-black break-all w-full">
            {userName}
          </p>
        </div>
        {address ? (
          <div className="flex flex-col gap-1 w-full">
            <div className="w-full flex gap-3 items-center justify-between border border-gray-500 rounded-lg py-3 px-4">
              <ClipboardCopyText
                text={address}
                truncate="middle"
                // className="flex gap-2 items-center border border-gray-600 rounded-lg py-3 px-4 text-gray-600"
                className="border-none flex items-center gap-3 w-max text-gray-600"
              />
              <p className=" text-gray-700 font-medium">
                {!isNaN(Number(CurrentBalance))
                  ? Number(CurrentBalance).toFixed(2)
                  : CurrentBalance}{" "}
                MNTL
              </p>
            </div>
            <p className="text-right block w-full text-sm pr-4">
              Need more $MNTL ? Get it{" "}
              <a
                href="https://swapfast.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                here
              </a>
            </p>
          </div>
        ) : null}

        <div className="px-4 py-6 text-[16px] w-[100%] border border-[#88A6FA] rounded-lg flex flex-col gap-5">
          {isPremium && (
            <div className="flex items-center justify-between">
              <p className="text-primary opacity-80">Registration fee</p>
              <p className="text-primary opacity-80"> ~0.002 MNTL </p>
            </div>
          )}
          <div className="flex items-center justify-between">
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
        <button
          type="button"
          className={` ${
            loader ? "cursor-not-allowed disabled opacity-30" : ""
          } rounded-full w-full bg-[#396AF6] px-6 py-[12px] text-md text-center font-semibold leading-[100%] text-white  transition duration-150 ease-in-out hover:bg-warning-600  focus:bg-warning-600 flex items-center justify-center gap-2 relative`}
          onClick={() => handleMint()}
        >
          {loader ? "Please wait..." : "Claim"}
        </button>
      </div>
    </>
  );

  return (
    <>
      <Modal
        openModal={isOpen}
        setOpenModal={setOpen}
        className="rounded-xl p-4"
        header={""}
        closeModal={() => {
          success && router.pushWithReferral(`/${userName}`);
          handleClose();
        }}
      >
        {success ? claimedModalJSX : confirmModalJSX}
      </Modal>
    </>
  );
};
export default MintModal;
