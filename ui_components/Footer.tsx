"use client";
import React from "react";
import Image from "next/image";
import { icons } from "@/utils/images";
import Link from "next/link";
import { blocktheoryUrl, blogsUrl, contactUsUrl, docsUrl } from "@/constant";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes("claim") ? (
        <div className={`bg-black w-full md:p-12 p-4`}>
          <div className="flex items-center justify-between border-b border-b-[#485053] pb-8">
            <div className="col-span-1 flex items-center gap-2">
              <Image className="" width={36} height={36} alt="selected" src={icons.amiLogoWhite} />
              <p className="heading1_black text-white md:!text-[38px] !text-[24px] !leading-[28px] font-inter px-2 md:px-0">
                {"AMI Names"}
              </p>
            </div>
            <div className="flex items-center gap-12">
              <Link href={contactUsUrl} target="_blank">
                <p className="text-[20px] text-white leading-6 font-semibold font-inter">Contact us</p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-12">
            <Link href={blocktheoryUrl} target="_blank">
              <div className="flex items-center justify-center gap-2">
                <p className="text-[20px] text-white leading-6 font-semibold font-inter hidden md:block">Built by</p>
                <Image className="" alt="selected" src={icons.logo} />
              </div>
              <p className="paragraph_regular !text-white !text-center font-inter">Blockchain R&D Hub</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={`bg-white flex flex-col items-center justify-center mb-12 mt-8 md:mt-0`}>
          <Link href={blocktheoryUrl} target="_blank">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[12px] text-black leading-6 font-normal font-inter">Built by</p>
              <Image className="" alt="selected" src={icons.logoWhite} />
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
