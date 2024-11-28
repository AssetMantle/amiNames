"use client";
import { ChangeEvent, useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import Image from "next/image";
import { chain } from "@/constant";
import { useChain } from "@cosmos-kit/react";
import {
  getFromLocalStorage,
  isValidReferrer,
  saveToLocalStorage,
  showToastMessage,
} from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { IconWrapper } from "@/components/IconWrapper";
import MintModal from "@/components/modals/MintModal";

export default function Home() {
  const router = useRouter();
  const query = useSearchParams();
  const chainContext = useChain(chain);
  const { address, connect, status } = chainContext;
  const [ValidInput, setValidInput] = useState(Boolean);
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
      setValidInput(true);
      if (e?.target?.value?.length > 30) {
        return;
      }
      setLoader(true);
      debounceFn(e.target.value);
      setInputValue(e.target.value);
    } else {
      setValidInput(false);
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
    } else {
      router.push(`/profile/${inputValue}`);
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
    <main className="flex h-[100dvh] flex-col items-center justify-center font-inter p-6 am-ami-container-sm">
      <div className="flex items-center justify-center w-[min(320px,100%)] mx-auto relative">
        <div className="flex aspect-square w-[50px] rounded-[50%] scale-[1.1] origin-left">
          <Image
            src={"/assets/images/LogoSearch.svg"}
            alt="Ami Names"
            width={200}
            height={200}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="flex-1 flex gap-1 pl-9 pr-4 py-2 text-gray-900 border border-[#396AF6] rounded-3xl -ms-7">
          <input
            type="text"
            id="large-input"
            pattern="^[a-z0-9_]+$"
            className="flex-1 text-lg outline-none bg-transparent"
            placeholder="Search AMI Name"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
          />
          <div className=" aspect-square w-[20px] my-auto">
            <Image
              src={"/assets/images/icons/search.svg"}
              alt="Search Icon"
              width={30}
              height={30}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>

        {inputValue && (
          <div
            onClick={handleMintModal}
            className="absolute text-left bg-white w-full m-auto mt-1 border outline-none focus:outline-none border-borderGrey left-1/2 transform -translate-x-1/2 cursor-pointer hover:bg-gray-50 max-w-[95%] top-[50px]"
          >
            <div className="flex items-center justify-between p-2 px-4 gap-2 w-full overflow-hidden">
              <div className="flex-1 flex flex-col">
                <p className="text-md font-medium text-primary break-all w-full">
                  {inputValue}
                </p>
                {idExist && !loader ? (
                  <p className="text-[12px] font-medium text-primary/70 break-all w-full">
                    {premiumAddr.provisionAddress}
                  </p>
                ) : null}
              </div>
              {loader ? (
                <span>
                  <Image
                    className="h-8 w-8"
                    alt="loader"
                    src={`/assets/images/icons/loader.gif`}
                    width={32}
                    height={32}
                  />
                </span>
              ) : !idExist && !loader ? (
                <span className="border border-green-500 text-sm px-2 py-1 text-green-500 border-successBorder rounded-lg">
                  Available
                </span>
              ) : idExist && !loader ? (
                <span className="text-sm p-2 text-yellow-500 border border-yellow-500 rounded-lg">
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
