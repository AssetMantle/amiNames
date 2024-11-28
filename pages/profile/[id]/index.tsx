"use client";
import { readUserSocials } from "@/config/dbApi";
import Header from "@/layout/Header";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import React, { Suspense, useEffect, useRef, useState } from "react";

export default function Profile({ params }: { params: { id: string } }) {
  const PROFILE_NAME = params.id;

  const [IsMyProfile, setIsMyProfile] = useState(false);
  const [SocialData, setSocialData] = useState<any>({});
  const BODY = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socialData: any = async () => await readUserSocials(PROFILE_NAME);
    setSocialData(socialData);
  }, [PROFILE_NAME]);

  const CreateValidURL = (url: string): any => {
    return url.startsWith("www") ? `https://${url}` : url;
  };

  return (
    <>
      <Header profileName={PROFILE_NAME} />
      <main
        className="am-ami-container-sm p-6 h-[calc(100dvh-97.02px)] overflow-y-auto scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
        ref={BODY}
      >
        {IsMyProfile ? (
          <>
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
                  {PROFILE_NAME}
                </div>
                <Image
                  src={"/assets/images/icons/chevron-down.svg"}
                  alt="Ami Names"
                  width={16}
                  height={16}
                  className="ml-4"
                />
              </div>
              <div className="w-[170px] relative bg-white p-2 rounded-md">
                <Suspense fallback={"Loading..."}>
                  <QRCodeSVG
                    width="100%"
                    height="100%"
                    value={`https://names.assetmantle.one/profile/${PROFILE_NAME}?referral=${PROFILE_NAME}`}
                  />
                </Suspense>
              </div>
              <button
                onClick={() => {
                  BODY.current &&
                    BODY.current.scrollHeight &&
                    BODY.current.scrollTo(0, BODY.current.scrollHeight * 2);
                }}
              >
                <Image
                  src={"/assets/images/icons/chevron-down.svg"}
                  alt="Ami Names"
                  width={32}
                  height={32}
                  className="ml-4 rotate-180"
                />
              </button>
            </div>
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
                  {PROFILE_NAME}
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
                <p
                  className={`leading-[20px] font-bold text-xl cursor-pointer text-center text-headingText`}
                >
                  Manage Social Links
                </p>
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
                  <div className="border-b border-b-[#D4DCE2]"></div>
                </div>
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-9">
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
                {PROFILE_NAME}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[min(320px,100%)]">
              {SocialData?.twitter && (
                <a
                  target="_blank"
                  className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] bg-black"
                  href={CreateValidURL(SocialData?.twitter)}
                >
                  <Image
                    className=""
                    width={30}
                    height={30}
                    alt="twitter"
                    src={`/assets/images/icons/twitter.png`}
                  />{" "}
                  Twitter
                </a>
              )}
              {SocialData?.telegram && (
                <a
                  target="_blank"
                  className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] am-ami-bg-telegram"
                  href={CreateValidURL(SocialData?.telegram)}
                >
                  <Image
                    className=""
                    width={30}
                    height={30}
                    alt="telegram"
                    src={`/assets/images/icons/telegram.png`}
                  />{" "}
                  Telegram
                </a>
              )}
              {SocialData?.instagram && (
                <a
                  target="_blank"
                  className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] am-ami-bg-instagram"
                  href={CreateValidURL(SocialData?.instagram)}
                >
                  <Image
                    className=""
                    width={24}
                    height={24}
                    alt="instagram"
                    src={"/assets/images/icons/instagram-t.svg"}
                  />{" "}
                  Instagram
                </a>
              )}
              {SocialData?.website && (
                <a
                  target="_blank"
                  className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] bg-black"
                  href={CreateValidURL(SocialData?.website)}
                >
                  <Image
                    className=""
                    width={24}
                    height={24}
                    alt="Website"
                    src={"/assets/images/icons/globe-w.svg"}
                  />{" "}
                  Website
                </a>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
