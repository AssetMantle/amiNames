"use client";
import Loading from "@/components/Loading";
import { useReferralRouter } from "@/config";
import { chain } from "@/constant";
import { useChain } from "@cosmos-kit/react";
import { useEffect } from "react";

export default function RootPage() {
  const router = useReferralRouter();
  const { address } = useChain(chain);

  useEffect(() => {
    const checkAndRedirect = () => {
      // Retrieve and parse data from localStorage
      const localStorageData = localStorage.getItem("amiNamesList");
      // Parse the localStorage data
      const parsedData: { address: string; name: string }[] = localStorageData
        ? JSON.parse(localStorageData)
        : [];

      // If the wallet is connected
      if (address) {
        const matchingProfile = parsedData.find(
          (item: { address: string; name: string }) => item.address === address
        );

        if (matchingProfile) {
          // If a name is found for the connected wallet, redirect to that profile
          if (router.asPath !== `/${matchingProfile.name}`) {
            router.pushWithReferral(`/${matchingProfile.name}`);
            return;
          }
        }
      }

      // If no match is found for the connected wallet, check the last name in the parsed data
      const lastIndex = parsedData.length - 1;
      if (lastIndex >= 0) {
        const lastName = parsedData[lastIndex].name;
        // Redirect to the last found name
        if (router.asPath !== `/${lastName}`) {
          router.pushWithReferral(`/${lastName}`);
          return;
        }
      }

      // If no names are found in parsedData, redirect to the search page
      if (router.asPath !== "/search") {
        router.pushWithReferral("/search");
      }
    };

    checkAndRedirect();
  }, [address, router]);

  return <Loading />;
}
