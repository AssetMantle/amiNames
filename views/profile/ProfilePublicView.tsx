"use client";
import { readUserSocials } from "@/config";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePublicView({
  profileNames,
}: {
  profileNames: string[]; // Expect an array of strings
}) {
  const CreateValidURL = (url: string): any => {
    return url.startsWith("www") ? `https://${url}` : url;
  };
  const [SocialData, setSocialData] = useState<any>({});

  const profileName = profileNames?.[0] || "kombo";

  const socialData: any = async () => await readUserSocials(profileName || "");

  return (
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
          {profileName}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-[min(320px,100%)]">
        {SocialData?.twitter && (
          <a
            target="_blank"
            className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] bg-black"
            href={CreateValidURL(SocialData?.twitter)}
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
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
  );
}
