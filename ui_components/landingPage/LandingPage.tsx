import { chain } from "@/constant";
import { isValidReferrer } from "@/utils";
import { useChain } from "@cosmos-kit/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FAQs } from "./FAQs";
import { FeaturesSection } from "./FeaturesSection";
import { HeroSection } from "./HeroSection";
import { ReferralProgram } from "./ReferralProgram";

export const LandingPage = () => {
  const { address } = useChain(chain);
  const router = useRouter();
  const query = useSearchParams();
  const queryValue = query.get("referral");
  const homeFlag = query.get("home");
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    async function getIsValidRef() {
      if (query) {
        const queryValue = query.get("referral");
        if (!queryValue) {
          const names = localStorage.getItem("amiNamesList");
          if (names) {
            const list = JSON.parse(names);
            router.replace(`/?referral=${list?.[0]?.name}`);
          }
        }
        const isValidRef = await isValidReferrer(queryValue ?? "");
        console.log("isValidRef: ", isValidRef, " queryParam: ", queryValue);
        setIsValidUser(isValidRef?.isValidUserName);
      }
    }
    getIsValidRef();
  }, [query]);

  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      const names = localStorage.getItem("amiNamesList");
      if (homeFlag) return;
      if (names) {
        const list = JSON.parse(names);
        if (Array.isArray(list) && list.length > 0) {
          let nameList =
            list && list.filter((item: any) => item.address === address);
          if (nameList.length > 0)
            router.replace(
              `/profile/${nameList[0].name}?referral=${
                queryValue || nameList[0].name
              }`
            );
          else router.replace("/claim");
        } else {
          router.replace(`/claim`);
        }
      } else {
        router.replace(`/claim`);
      }
    }
  }, [address]);

  return (
    <div className="w-full h-full">
      <HeroSection isValidUser={isValidUser} />
      <FeaturesSection />
      <ReferralProgram />
      <FAQs />
    </div>
  );
};
