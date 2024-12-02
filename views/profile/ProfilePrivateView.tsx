"use client";
import AddLinkModal from "@/components/modals/AddLinkModal";
import Image from "next/image";
import React, { useState } from "react";
import PrivateQRCode from "./PrivateQRCode";

export default function ProfilePrivateView({
  profileNames,
  BODY,
}: {
  profileNames: string[]; // Expect an array of strings
  BODY: React.RefObject<HTMLElement>;
}) {
  const [Switch, setSwitch] = useState(false);
  const [ModalState, setModalState] = useState(false);
  const [ModalFor, setModalFor] = useState("");
  const [inputValue, setInputValue] = useState("");

  const profileName = profileNames?.[0];

  const LinksList = [
    {
      icon: "/assets/images/icons/link-45deg.svg",
      text: "Add Link",
    },
    {
      icon: "/assets/images/icons/linkedin.png",
      text: "LinkedIn",
    },
    {
      icon: "/assets/images/icons/facebook.svg",
      text: "Facebook",
    },
    {
      icon: "/assets/images/icons/youtube.svg",
      text: "YouTube",
    },
    {
      icon: "/assets/images/icons/github.svg",
      text: "GitHub",
    },
    {
      icon: "/assets/images/icons/medium.svg",
      text: "Medium",
    },
  ];

  return (
    <>
      <PrivateQRCode PROFILE_NAME={profileName} BODY={BODY} />

      <div className="flex flex-col items-center justify-center h-[calc(100dvh-97.02px)] gap-9">
        <div className="flex items-center justify-center mx-auto relative">
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
          <div className="flex-1 flex gap-1 pl-9 pr-6 py-2 text-gray-900 border border-[#396AF6] bg-gray-50  rounded-e-3xl -ms-7 hero-heading-gradient-text uppercase font-black text-2xl">
            {profileName}
          </div>
          <Image
            src={"/assets/images/icons/chevron-down.svg"}
            alt="Ami Names"
            width={16}
            height={16}
            className="ml-4"
          />
        </div>

        <div className="flex flex-col gap-3 w-[min(320px,100%)]">
          <h2
            className={`leading-[20px] font-bold text-xl cursor-pointer text-center text-headingText`}
          >
            Manage Social Links
          </h2>
          <h3
            className="text-base font-semibold flex items-center justify-between gap-4"
            style={{ color: "#6188F8" }}
            role="button"
            tabIndex={0}
            onClick={() => setSwitch(!Switch)}
          >
            Linked Platforms:{" "}
            <Image
              src={"/assets/images/icons/chevron-down.svg"}
              alt="Search Icon"
              width={16}
              height={16}
              className={`${Switch ? "rotate-0" : "rotate-180"}`}
            />
          </h3>
          {!Switch && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                    <Image
                      width={24}
                      height={24}
                      className="my-auto"
                      alt="Twitter"
                      src={`/assets/images/icons/twitter.png`}
                    />{" "}
                    Twitter:
                  </div>
                  <input
                    type="text"
                    className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                  />
                  <div className="flex items-center gap-2"></div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                    <Image
                      width={24}
                      height={24}
                      className="my-auto"
                      alt="telegram"
                      src={`/assets/images/icons/telegram.png`}
                    />{" "}
                    Telegram:
                  </div>
                  <input
                    type="text"
                    className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                  />
                  <div className="flex items-center gap-2"></div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                    <Image
                      width={24}
                      height={24}
                      className="my-auto"
                      alt="Instagram"
                      src={"/assets/images/icons/instagram.svg"}
                    />{" "}
                    Instagram:
                  </div>
                  <input
                    type="text"
                    className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                  />
                  <div className="flex items-center gap-2"></div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                    <Image
                      width={24}
                      height={24}
                      className="my-auto"
                      alt="Instagram"
                      src={"/assets/images/icons/globe.svg"}
                    />{" "}
                    Website:
                  </div>
                  <input
                    type="text"
                    className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                  />
                  <div className="flex items-center gap-2"></div>
                </div>
              </div>
            </div>
          )}
          <div className="border-b border-b-[#D4DCE2]"></div>
          <h3
            className="text-base font-semibold flex items-center justify-between gap-4"
            style={{ color: "#6188F8" }}
            role="button"
            tabIndex={0}
            onClick={() => setSwitch(!Switch)}
          >
            Link Platform:{" "}
            <Image
              src={"/assets/images/icons/chevron-down.svg"}
              alt="Search Icon"
              width={16}
              height={16}
              className={`${Switch ? "rotate-180" : "rotate-0"}`}
            />
          </h3>
          {Switch && (
            <div className="flex flex-col gap-6">
              <div className="flex-1 flex gap-1 px-4 py-2 text-gray-900 border border-[#396AF6] rounded-3xl">
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
                <input
                  type="text"
                  name="platform-input"
                  id="platform-input"
                  className="flex-1 text-lg outline-none bg-transparent"
                  placeholder="Search Platform"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div
                className="grid grid-cols-3 gap-4"
                style={{ gridTemplateColumns: "repeat(3,1fr)" }}
              >
                {React.Children.toArray(
                  LinksList?.map((link) => (
                    <div
                      className=" flex flex-col gap-2 items-center"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setModalFor(link.text);
                        setModalState(true);
                      }}
                    >
                      <Image
                        src={
                          link?.icon
                            ? link.icon
                            : "/assets/images/icons/search.svg"
                        }
                        alt={`${link.text} Icon"`}
                        width={24}
                        height={24}
                      />
                      <p className="">{link.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            BODY.current &&
              BODY.current.scrollHeight &&
              BODY.current.scrollTo(0, 0);
          }}
        >
          <Image
            src={"/assets/images/icons/chevron-down.svg"}
            alt="Ami Names"
            width={32}
            height={32}
            className="ml-4 "
          />
        </button>
      </div>

      <AddLinkModal
        LinksList={LinksList}
        ModalFor={ModalFor}
        isOpen={ModalState}
        setOpen={setModalState}
        onClose={() => {
          setModalFor("");
          setModalState(false);
        }}
      />
    </>
  );
}
