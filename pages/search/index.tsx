"use client";
import MintModal from "@/components/modals/MintModal";
import { useReferralRouter } from "@/config";
import { chain } from "@/constant";
import {
  getFromLocalStorage,
  isValidReferrer,
  showToastMessage,
  updateMyAmiList,
} from "@/utils";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import { ChangeEvent, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {
  const router = useReferralRouter();
  const chainContext = useChain(chain);
  const { address, connect } = chainContext;
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [idExist, setIsExist] = useState(false);
  const [loader, setLoader] = useState(false);
  const [mintModal, setMintModal] = useState(false);
  const [premiumAddr, setPremiumAddr] = useState({
    isPremium: false,
    provisionAddress: "",
  });

  const userNameExist = async (value: string) => {
    const retrievedUsername = await isValidReferrer(value.toLowerCase());
    setPremiumAddr({
      isPremium: retrievedUsername?.isPremium,
      provisionAddress: retrievedUsername?.address as string,
    });

    // Retrieve and parse the JSON from localStorage
    const storedAccounts = getFromLocalStorage("cosmos-kit@2:core//accounts");
    console.log("storedAccounts: ", storedAccounts);
    const connectedAdd =
      storedAccounts?.length > 0 ? storedAccounts?.[0]?.address : "";

    if (
      retrievedUsername?.isValidUserName &&
      connectedAdd === retrievedUsername?.address
    ) {
      // Retrieve and parse the existing list from localStorage
      updateMyAmiList(value, retrievedUsername?.address);
    }
    setIsExist(retrievedUsername?.isValidUserName);
    setLoader(false);
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    userNameExist(value).then(() => setLoader(false));
  }, 1000);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    // Check if the input value matches the allowed pattern and is within length limit
    if (/^[a-z0-9_]*$/.test(value) && value.length <= 30) {
      setInputValue(value);
      setLoader(true);
      debouncedSearch(value);
    }
  };

  const handleMintModal = async () => {
    if (!idExist) {
      if (!address) {
        try {
          await connect();
          setMintModal(true);
        } catch (error) {
          //@ts-ignore
          console.error("error in handleMintModal: ", error);
          showToastMessage("error", "Error while connecting wallet");
        }
      } else {
        setUserName(inputValue.toLowerCase());
        setIsOpen(true);
        setInputValue("");
      }
    } else {
      router.pushWithReferral(`/${inputValue}`);
    }
  };

  useMemo(() => {
    if (address && mintModal) {
      handleMintModal();
      setMintModal(false);
    }
  }, [address]);

  return (
    <main className="flex h-[calc(100dvh-97.02px)] flex-col items-center justify-center font-inter p-6 am-ami-container-sm">
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
      />
    </main>
  );
}
