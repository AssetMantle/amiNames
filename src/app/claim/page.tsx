"use client";
import { ChangeEvent, useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import MintModal from "@/ui_components/MintModal";
import { icons } from "@/utils/images";
import Image from "next/image";
import { chain, homePageHeadingGradientText, homePageHeadingText, homePageHeadingFree } from "@/constant";
import { useChain } from "@cosmos-kit/react";
import { getFromLocalStorage, isValidReferrer, saveToLocalStorage, showToastMessage, trimAddress } from "@/utils";
import { useSearchParams } from "next/navigation";
import { IconWrapper } from "@/ui_components/IconWrapper";

export default function Home() {
  const query = useSearchParams();
  const chainContext = useChain(chain);
  const { address, connect, status } = chainContext;
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [idExist, setIsExist] = useState(false);
  const [loader, setLoader] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [isValidRef, setIsValidRef] = useState(false);
  const [premiumAddr, setPremiumAddr] = useState({
    isPremium: false,
    provisionAddress: "",
  });

  useEffect(() => {
    async function getIsValidRef() {
      if (query) {
        const queryValue = query.get("referral");
        const isValidRef = await isValidReferrer(queryValue ?? "");
        setIsValidRef(isValidRef.isValidUserName);
      }
    }
    getIsValidRef();
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^[a-z0-9_]*$/.test(e.target.value)) {
      if (e?.target?.value?.length > 30) {
        return;
      }
      setLoader(true);
      debounceFn(e.target.value);
      setInputValue(e.target.value);
    }
  };

  const userNameExist = async (value: string) => {
    const isValidRef = await isValidReferrer(value.toLowerCase());
    setPremiumAddr({
      isPremium: isValidRef.isPremium,
      provisionAddress: isValidRef.address as string,
    });
    const connectedAdd = getFromLocalStorage("conntectedAddress") ?? "";
    if (connectedAdd === isValidRef.address && isValidRef.isValidUserName) {
      const existList = getFromLocalStorage("amiNamesList");
      const nameList = existList.map((item: any) => item.name);
      if (!nameList.includes(value)) {
        existList.push({ address: isValidRef.address, name: value });
        saveToLocalStorage("amiNamesList", existList);
        window.dispatchEvent(new Event("storage"));
      }
    }
    setIsExist(isValidRef.isValidUserName);
    setLoader(false);
  };

  const debounceFn = useCallback(debounce(userNameExist, 1000), []);

  const handleMintModal = async () => {
    if (!idExist) {
      if (!address) {
        try {
          const isConnected = await connect();
          setMintModal(true);
        } catch (error) {
          //@ts-ignore
          showToastMessage("error", error?.message);
        }
      } else {
        setUserName(inputValue.toLowerCase());
        setIsOpen(true);
        setInputValue("");
      }
    }
  };

  useMemo(() => {
    if (address && mintModal) {
      handleMintModal();
      setMintModal(false);
    }
    saveToLocalStorage("conntectedAddress", address);
    const existList = getFromLocalStorage("amiNamesList");
    saveToLocalStorage("amiNamesList", existList);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
  }, [address]);

  useEffect(() => {
    if (status === "NotExist") {
      showToastMessage("error", "Wallet extension is not installed");
    }
  }, [status]);

  return (
    <main className="md:flex md:h-[calc(100vh-90px)] md:flex-col md:items-center md:justify-center font-inter block pt-16">
      <div className="text-center p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-semibold text-primary pt-8 pb-3">
          {homePageHeadingText}
          <span className="hero-heading-gradient-text"> {homePageHeadingGradientText} </span>
          {homePageHeadingFree}
        </h1>
        <p className="md:text-[24px] text-[18px] font-regular text-primary pb-6 mb-3">
          Introducing {`Cosmos's`} first Self sovereign Identity.
        </p>
        <input
          type="text"
          id="large-input"
          className="block md:w-[400px] w-[100%] m-auto p-4 text-gray-900 border border-[#396AF6] bg-gray-50  rounded-3xl"
          placeholder="Enter the AMI Name"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
        {!inputValue && (
          <div className="flex items-center justify-center gap-1 md:mt-4 mt-1 text-left md:text-center">
            <IconWrapper className="cursor-pointer" iconClassName="info" iconSize="text-[16px] text-black/60" />
            <p className="supportText_regular text-black/60">
              {"No Uppercase or Special Characters, except Underscore '_'"}
            </p>
          </div>
        )}
        {inputValue && (
          <div
            onClick={handleMintModal}
            className="absolute text-left bg-white w-[450px] m-auto mt-1 border outline-none focus:outline-none border-borderGrey left-1/2 transform -translate-x-1/2 cursor-pointer hover:bg-grey max-w-[90%]"
          >
            <div className="flex items-center justify-between p-2 px-4 gap-2">
              <div>
                <p className="text-md font-medium text-primary">{inputValue}</p>
                {idExist && !loader ? (
                  <p className="text-[12px] font-medium text-primary/70">{premiumAddr.provisionAddress}</p>
                ) : null}
              </div>
              {loader ? (
                <span>
                  <Image className="h-8 w-8" alt="loader" src={icons.loader} />
                </span>
              ) : !idExist && !loader ? (
                <span className="border border-green text-sm px-2 py-1 text-success border-successBorder rounded-lg">
                  Available
                </span>
              ) : idExist && !loader ? (
                <span className="border border-green text-sm p-2 text-warning border-warningBorder rounded-lg">
                  Registered
                </span>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <MintModal
        isOpen={isOpen}
        setOpen={setIsOpen}
        userName={userName}
        isPremium={premiumAddr.isPremium}
        provisionAddress={premiumAddr.provisionAddress}
        isValidRef={isValidRef}
      />
    </main>
  );
}
