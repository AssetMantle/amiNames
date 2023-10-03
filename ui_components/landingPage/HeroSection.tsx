"use client";
import {
  assetmantleUrlLink,
  discordUrl,
  heroSecBtnText,
  heroSecDescHeadingText,
  heroSecDescText,
  heroSecHeadingGradientText,
  heroSecHeadingText,
  heroSecSupportText,
  instaUrl,
  linkedinUrl,
  telegramUrl,
  twitterUrl,
  warpcastUrl,
} from "@/constant";
import { icons } from "@/utils/images";
import Image from "next/image";
import Button from "../Button";
import { IconWrapper } from "../IconWrapper";
import { isValidReferrer } from "@/utils";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const HeroSection = () => {
  const [isValidUser, setIsValidUser] = useState(false);

  const router = useRouter();
  const query = useSearchParams();

  useEffect(() => {
    async function getIsValidRef() {
      if (query) {
        const queryValue = query.get("referral");
        const isValidRef = await isValidReferrer(queryValue ?? "");
        setIsValidUser(isValidRef.isValidUserName);
      }
    }
    getIsValidRef();
  }, [query]);
  const handleClick = () => {
    const queryValue = query.get("referral");
    router.push(`/claim?referral=${queryValue}`);
  };
  return (
    <div className="block md:flex items-center container mx-auto bg-white w-full md:h-[calc(100vh-90px)] px-4">
      <div className="flex-1">
        <h1 className="heading1_black 2xl:!text-[48px] 2xl:!leading-[56px]">
          {heroSecHeadingText} <br />
          <span className="hero-heading-gradient-text">{heroSecHeadingGradientText}</span>
        </h1>
        <p className="paragraph_semibold mt-6 ">
          {heroSecDescHeadingText} <span className="paragraph_regular">{heroSecDescText}</span>
        </p>
        <div className="mt-1 flex items-center gap-2 mb-10">
          <p className="text-primary paragraph_regular font-semibold">fulfilled by</p>
          <Link href={assetmantleUrlLink} target={"_blank"}>
            <Image src={icons.assetmantleLogo} alt="assetMantleLogo" />
          </Link>
          <p className="text-primary paragraph_regular font-semibold">Blockchain</p>
        </div>
        <Button
          type="button"
          className={`${
            isValidUser ? "opacity-100" : "opacity-30"
          } inline-block rounded-full bg-[#396AF6] px-6 pb-2 pt-2.5 2xl:!py-3 2xl:!px-10 font-inter text-md font-medium  leading-normal text-white  transition duration-150 ease-in-out hover:bg-warning-600  focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]`}
          onClick={() => {
            handleClick();
          }}
          disabled={!isValidUser}
        >
          <div className="flex">
            {heroSecBtnText}
            <IconWrapper iconClassName="arrow_right_alt" className="" iconSize="text-[20px] text-white" />
          </div>
        </Button>

        <p className="supportText_regular mt-4">{heroSecSupportText}</p>
        <div className="flex items-center mt-6 pb-4">
          <div className="grid grid-cols-4 gap-6">
            <Link href={twitterUrl} target="_blank">
              <div className="flex flex-col items-center justify-center gap-2">
                <Image src={icons.twitter} width={28} height={28} alt="twitter" />
              </div>
            </Link>
            <Link href={telegramUrl} target="_blank">
              <div className="flex flex-col items-center justify-center gap-2">
                <Image src={icons.telegram} width={28} height={28} alt="telegram" />
              </div>
            </Link>
            <Link href={discordUrl} target="_blank">
              <div className="flex flex-col items-center justify-center  gap-2">
                <Image src={icons.discordShare} width={28} height={28} alt="linkedin" />
              </div>
            </Link>
            <Link href={instaUrl} target="_blank">
              <div className="flex flex-col items-center justify-center  gap-2">
                <Image src={icons.instaShare} width={28} height={28} alt="linkedin" />
              </div>
            </Link>

            {/* <Link href={warpcastUrl} target="_blank">
              <div className="flex flex-col items-center justify-center  gap-2">
                <Image src={icons.warpcast} width={28} height={28} alt="warpcast" />
              </div>
            </Link> */}
          </div>
        </div>
      </div>
      <div className="flex-1 hidden md:block">
        <Image src={icons.heroImg} alt="hero_img" />
      </div>
    </div>
  );
};
