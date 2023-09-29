import {
  linkedinUrl,
  referralLink,
  referralProgramSecDesc,
  referralProgramSecHeading,
  referralText,
  telegramUrl,
  twitterUrl,
  warpcastUrl,
} from "@/constant";
import { icons } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const ReferralProgram = () => {
  const query = useSearchParams();
  const queryValue = query.get("referral");
  const domain = window.location.origin;
  return (
    <div className=" bg-[#F6F7F7] py-[100px]">
      <div className="container mx-auto text-center ">
        <p className="heading1_extrabold ">{referralProgramSecHeading}</p>
        <p className="paragraph_regular !text-[24px] mt-6">{referralProgramSecDesc}</p>
        <div className="flex flex-col items-center">
          <div className="border border-[#396AF6] rounded-full flex items-center bg-[#396AF6]/10 w-fit mt-12">
            <div className="flex items-center justify-center bg-[#396AF6] rounded-l-full px-6 py-4 ">
              <Image src={icons.speaker} alt="speaker" />
              <p className="paragraph_regular !text-[20px] leading-[30px] text-white">{`${referralText}`}</p>
            </div>
            <div className="md:px-20 px-0">
              <p className="paragraph_regular !text-[20px] leading-[30px] text-[#396AF6] text-center">
                {`${domain}?referral=`}
                <span className="md:text-white md:bg-[#396AF6] md:p-2 md:rounded-lg text-[#396AF6] font-medium md:font-regular">{`${
                  queryValue ?? "sampleref"
                }`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
