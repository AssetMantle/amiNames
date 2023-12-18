"use client";

import { Suspense, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { getFromLocalStorage } from "@/utils";
import { useChain } from "@cosmos-kit/react";
import { chain } from "@/constant";
import NameListModal from "@/ui_components/NameListModal";
import Image from "next/image";
import { icons } from "@/utils/images";
import Link from "next/link";
import SocialModal from "@/ui_components/SocialModal";

export default function Home({ params }: { params: { id: string } }) {
  const PROFILE_NAME = params.id;
  const chainContext = useChain(chain);
  const { address } = chainContext;

  const [namesList, setNamesList] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [SocialModOpenState, setSocialModOpenState] = useState(false);
  const [SocialModOpenType, setSocialModOpenType] = useState("add");

  function getNames() {
    try {
      if (typeof window !== "undefined") {
        const names = localStorage.getItem("amiNamesList");
        if (names) {
          const list = JSON.parse(names);
          if (Array.isArray(list) && list.length > 0) {
            const nameList =
              list && list.filter((item: any) => item.address === address);
            setNamesList(nameList);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      namesList && namesList.length > 0 && setIsOpen(true);
    }
  }

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const names = localStorage.getItem("amiNamesList");
        if (names) {
          const list = JSON.parse(names);
          if (Array.isArray(list) && list.length > 0) {
            let nameList =
              list && list.filter((item: any) => item.address === address);
            setNamesList(nameList);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [address]);

  return (
    <>
      <main
        className="flex flex-col items-center justify-center py-[100px] gap-5"
        style={{
          backgroundImage: "url('/assets/images/bg.png')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "599px 339px",
        }}
      >
        <h1 className="text-[28px] font-semibold text-primary flex gap-3 items-center">
          Hi{" "}
          {!(
            address &&
            namesList &&
            [...namesList].filter((el) => el.name === PROFILE_NAME).length > 0
          ) ? (
            <span className="hero-heading-gradient-text uppercase">
              {PROFILE_NAME}
            </span>
          ) : (
            <button
              className="hero-heading-gradient-text uppercase flex items-center border border-black rounded-3xl px-3 py-0 gap-2"
              onClick={getNames}
            >
              {PROFILE_NAME}{" "}
              <Image className="" alt="down icon" src={icons.chevronDown} />
            </button>
          )}
        </h1>

        <div className="w-[170px] relative bg-white p-2 rounded-md">
          <Suspense fallback={"Loading..."}>
            <QRCodeSVG
              width="100%"
              height="100%"
              value={`https://names.assetmantle.one/profile/${PROFILE_NAME}`}
            />
          </Suspense>
        </div>

        <div className="flex flex-col gap-3">
          {/* {address && (
            <button
              onClick={getNames}
              className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
            >
              <Image
                className=""
                width={30}
                height={30}
                alt="ami"
                src={icons.amiLogo}
              />{" "}
              My Names
            </button>
          )} */}
          <Link
            href=""
            className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
            target="_blank"
          >
            <Image
              className=""
              width={30}
              height={30}
              alt="twitter"
              src={icons.twitter}
            />{" "}
            Twitter
          </Link>
          <Link
            href=""
            className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
            target="_blank"
          >
            <Image
              className=""
              width={30}
              height={30}
              alt="telegram"
              src={icons.telegram}
            />{" "}
            Telegram
          </Link>
          <Link
            href=""
            className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
            target="_blank"
          >
            <Image
              className=""
              width={30}
              height={30}
              alt="instagram"
              src={icons.instaShare}
            />{" "}
            Instagram
          </Link>

          <button
            onClick={() => {
              setSocialModOpenType("add");
              setSocialModOpenState(true);
            }}
            className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)] disabled:opacity-50"
            disabled={
              !(
                address &&
                namesList &&
                [...namesList].filter((el) => el.name === PROFILE_NAME).length >
                  0
              )
            }
          >
            <Image
              className=""
              width={24}
              height={24}
              alt="edit"
              src={`/assets/images/pencil.svg`}
            />{" "}
            Add/Edit
          </button>
        </div>
        {/* {address && (
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSocialModOpenType("add");
                setSocialModOpenState(true);
              }}
            >
              <Image
                width={20}
                height={20}
                alt="plus circle"
                src={`/assets/images/plus-circle.svg`}
              />
            </button>
            <button
              onClick={() => {
                setSocialModOpenType("edit");
                setSocialModOpenState(true);
              }}
            >
              <Image
                width={20}
                height={20}
                alt="edit"
                src={`/assets/images/pencil.svg`}
              />
            </button>
          </div>
        )} */}
      </main>
      {namesList && (
        <NameListModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          namesList={namesList}
        />
      )}
      <SocialModal
        isOpen={SocialModOpenState}
        setIsOpen={setSocialModOpenState}
        type={SocialModOpenType}
      />
    </>
  );
}
