"use client";
import { blogsUrl, chain, docsUrl } from "@/constant";
import Button from "@/ui_components/Button";
import Popover from "@/ui_components/Popover";
import { getFromLocalStorage, isValidReferrer, trimAddress } from "@/utils";
import { icons } from "@/utils/images";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NameListModal from "./NameListModal";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const [isValidUser, setIsValidUser] = useState(false);
  const { address, connect, disconnect } = useChain(chain);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [namesList, setNamesList] = useState<any>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDisconnect = async () => {
    const isDisConnected = await disconnect();
    router.push("/");
  };

  const handlePopoverClick = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    setIsPopoverOpen(!isPopoverOpen);
    setTargetElement(event.currentTarget);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setIsMenuOpen(!isMenuOpen);
    setTargetElement(event.currentTarget);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", () => {
      const list = getFromLocalStorage("amiNamesList");
      const nameList =
        list && list.filter((item: any) => item.address === address);
      setNamesList(nameList);
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      const names = localStorage.getItem("amiNamesList");
      if (names) {
        const list = JSON.parse(names);
        if (Array.isArray(list) && list.length > 0) {
          let nameList =
            list && list.filter((item: any) => item.address === address);
          setNamesList(nameList);

          if (nameList.length > 0) router.push(`/profile/${nameList[0].name}`);
          else router.push("/claim");
        } else {
          router.push(`/claim`);
        }
      } else {
        router.push(`/claim`);
      }
    }
  }, [address]);

  useEffect(() => {
    window.addEventListener("beforeunload", onReload);
    return () => {
      window.removeEventListener("beforeunload", onReload);
    };
  }, []);

  useEffect(() => {
    async function getIsValidRef() {
      if (query) {
        const queryValue = query.get("referral");
        const isValidRef = await isValidReferrer(queryValue ?? "");
        setIsValidUser(isValidRef.isValidUserName);
        if (!isValidRef.isValidUserName) {
          const list = getFromLocalStorage("amiNamesList");
          if (list?.length) setIsValidUser(true);
        }
      }
    }
    getIsValidRef();
  }, [query]);

  const queryValue = query.get("referral");

  const handleClick = () => {
    connect();
  };

  const onReload = () => {
    handleDisconnect();
  };

  const openNameListModal = () => {
    setIsOpen(true);
  };

  return (
    <header className="fixed flex items-center justify-between gap-4 bg-white w-full left-0 md:px-12 py-5 z-[50] font-inter px-2">
      <Link href={`/?referral=${queryValue}`}>
        <div className="col-span-1 flex items-center gap-2">
          <Image
            className=""
            width={36}
            height={36}
            alt="selected"
            src={icons.amiLogo}
          />
          <p className="heading1_black md:!text-[28px] !text-[20px]">
            {"AMI Names"}
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <Link className="" href={blogsUrl} target="_blank">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[16px] text-black leading-6 font-semibold font-inter py-2">
              Blog
            </p>
          </div>
        </Link>
        <Link className="" href={docsUrl} target="_blank">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[16px] text-black leading-6 font-semibold font-inter py-2">
              Docs
            </p>
          </div>
        </Link>
        {pathname !== "/" && namesList.length > 0 && (
          <div
            className="relative"
            onClick={() => {
              router.push(`/claim?referral=${namesList[0].name}`);
            }}
          >
            <p className={`paragraph_semibold cursor-pointer ml-1 text-black`}>
              Claim Name
            </p>
          </div>
        )}
        {!address ? (
          <div className="col-span-1 text-right">
            <Button
              type="button"
              className="inline-block rounded-full bg-[#396AF6] px-6 pb-2 pt-2.5 text-md font-medium  leading-normal text-white  transition duration-150 ease-in-out hover:bg-warning-600  focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
              onClick={handleClick}
            >
              Connect Wallet
            </Button>
          </div>
        ) : null}

        {address && (
          <div className="flex items-center gap-6">
            {/* {namesList && namesList.length ? (
              <div
                className="relative"
                onClick={() => {
                  openNameListModal();
                }}
              >
                <p
                  className={`paragraph_semibold cursor-pointer ml-1 text-black`}
                >
                  My names
                </p>
              </div>
            ) : null} */}
            <p
              role="presentation"
              className="flex flex-end items-center justify-center float-right gap-2 w-[180px] text-sm text-primary border border-[#396AF6] rounded-full p-2 py-3 cursor-pointer"
              onClick={(e) => handlePopoverClick(e)}
            >
              <span>{trimAddress(address, 8)}</span>
              <Image className="" alt="down icon" src={icons.chevronDown} />
              <Popover
                isOpen={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                className=""
                leftPad={18}
                content={
                  <Button
                    type="button"
                    className="inline-block rounded-full buttonBg px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white font-inter"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </Button>
                }
                target={targetElement}
              />
            </p>
          </div>
        )}
        {/* <div
          role="presentation"
          onClick={(e) => {
            handleMenuClick(e);
          }}
        >
          <IconWrapper className="cursor-pointer" iconClassName="menu" />
          <Popover
            isOpen={isMenuOpen}
            leftPad={-70}
            onClose={() => setIsMenuOpen(false)}
            className="mt-2 bg-grey/30"
            content={
              <div className="w-[72px]">
                <Link className="" href={blogsUrl} target="_blank">
                  <div className="flex items-center justify-center gap-2 border-b border-b-grey/80">
                    <p className="text-[16px] text-black leading-6 font-semibold font-inter py-2">
                      Blog
                    </p>
                    <IconWrapper
                      className="cursor-pointer"
                      iconClassName="open_in_new"
                      iconSize="text-[16px]"
                    />
                  </div>
                </Link>
                <Link className="" href={docsUrl} target="_blank">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-[16px] text-black leading-6 font-semibold font-inter py-2">
                      Docs
                    </p>
                    <IconWrapper
                      className="cursor-pointer"
                      iconClassName="open_in_new"
                      iconSize="text-[16px]"
                    />
                  </div>
                </Link>
              </div>
            }
            target={targetElement}
          />
        </div> */}
      </div>
      {namesList && (
        <NameListModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          namesList={namesList}
        />
      )}
    </header>
  );
}
