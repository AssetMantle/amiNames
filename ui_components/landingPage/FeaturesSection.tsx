import {
  feature1Desc,
  feature1Heading,
  feature2Desc,
  feature2Heading,
  feature3Desc,
  feature3Heading,
  featureSecHeading,
} from "@/constant";
import { icons } from "@/utils/images";
import Image from "next/image";

export const FeaturesSection = () => {
  return (
    <div className="bg-black w-full py-[100px]">
      <div className="container mx-auto">
        <p className="heading1_extrabold !text-white text-center">
          {featureSecHeading}
        </p>
        <div className="flex items-center justify-center mt-12">
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col items-center bg-[#282B30] px-5 py-10 text-center rounded-lg max-w-[370px] max-h-[280px]">
              <Image src={icons.passwordlessLogin} alt="features" />
              <p className="heading3_bold text-white my-6">{feature1Heading}</p>
              <p className="paragraph_regular text-white">{feature1Desc}</p>
            </div>
            <div className="flex flex-col items-center bg-[#282B30] px-5 py-10 text-center rounded-lg max-w-[370px] max-h-[280px]">
              <Image src={icons.interoperability} alt="features" />
              <p className="heading3_bold text-white my-6">{feature2Heading}</p>
              <p className="paragraph_regular text-white">{feature2Desc}</p>
            </div>
            <div className="flex flex-col items-center bg-[#282B30] px-5 py-10 text-center rounded-lg max-w-[370px] max-h-[280px]">
              <Image src={icons.beyondCosmos} alt="features" />
              <p className="heading3_bold text-white my-6">{feature3Heading}</p>
              <p className="paragraph_regular text-white">{feature3Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
