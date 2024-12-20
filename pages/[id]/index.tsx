"use client";
import Loading from "@/components/Loading";
import { defaultChainName } from "@/config";
import { isValidReferrer, showToastMessage, updateMyAmiList } from "@/utils";
import ProfilePrivateView from "@/views/profile/ProfilePrivateView";
import ProfilePublicView from "@/views/profile/ProfilePublicView";
import { useChain } from "@cosmos-kit/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const PROFILE_NAME = router.query.id as string;
  const [isLogin, setIsLogin] = useState(false);
  const { address } = useChain(defaultChainName);
  // states require to generate the JSXs
  const [profileNames, setProfileNames] = useState<string[]>([]);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginStat = localStorage.getItem("loggedIn");
    loginStat === "yes" ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Redirect to error page if PROFILE_NAME is not available
      if (!PROFILE_NAME) {
        return;
      }
      const localStorageData = localStorage.getItem("amiNamesList");
      // Parse the localStorage data
      const parsedData: { address: string; name: string }[] = localStorageData
        ? JSON.parse(localStorageData)
        : [];

      // Check if the user is logged in
      if (isLogin) {
        if (!address) return;
        try {
          // search if current name belongs to the address
          const retrievedUsername = await isValidReferrer(
            PROFILE_NAME.toLowerCase()
          );

          // Filter for the current address and extract the names
          const names = parsedData
            .filter((item) => item.address === address)
            .map((item) => item.name);

          if (names?.length == 0 && retrievedUsername?.address !== address) {
            setProfileNames([PROFILE_NAME]);
            showToastMessage(
              "error",
              "No Profile found for Connected Wallet. Search for your Profile"
            );
            return;
          }

          // Check if PROFILE_NAME exists in the names array
          if (names.includes(PROFILE_NAME)) {
            // Create a new array with PROFILE_NAME first
            setProfileNames([
              PROFILE_NAME,
              ...names.filter((name) => name !== PROFILE_NAME),
            ]);
          } else {
            if (retrievedUsername?.address === address) {
              updateMyAmiList(PROFILE_NAME, address);
              setProfileNames([
                PROFILE_NAME,
                ...names.filter((name) => name !== PROFILE_NAME),
              ]);
            }
            // Set the names array as is
            else {
              setProfileNames(names);
            }
          }
          setIsMyProfile(true);

          console.log("Names associated with the address:", names);
        } catch (error) {
          setProfileNames([PROFILE_NAME]);
          setIsMyProfile(false);
          showToastMessage(
            "error",
            "Error Connecting to your Profile. Search for your profile again"
          );
        }
      } else {
        try {
          // search if current name belongs to the address
          const retrievedUsername = await isValidReferrer(
            PROFILE_NAME.toLowerCase()
          );

          // Search for PROFILE_NAME and get its associated address
          const associatedEntry = parsedData.find(
            (item) => item.name === PROFILE_NAME
          );

          if (associatedEntry) {
            const associatedAddress = associatedEntry.address;

            // Find all names related to the associated address
            const names = parsedData
              .filter((item) => item.address === associatedAddress)
              .map((item) => item.name);

            // Create a new array with PROFILE_NAME first
            setProfileNames([
              PROFILE_NAME,
              ...names.filter((name) => name !== PROFILE_NAME),
            ]);
            setIsMyProfile(true);
          } else {
            if (address && retrievedUsername?.address == address) {
              updateMyAmiList(PROFILE_NAME, address);
              // Find all names related to the associated address
              const names = parsedData
                .filter((item) => item.address === address)
                .map((item) => item.name);
              // Create a new array with PROFILE_NAME first
              setProfileNames([
                PROFILE_NAME,
                ...names.filter((name) => name !== PROFILE_NAME),
              ]);
              setIsMyProfile(true);
            }
            // PROFILE_NAME not found in localStorage
            setProfileNames([PROFILE_NAME]);
            setIsMyProfile(false);
          }
        } catch (error) {
          setProfileNames([PROFILE_NAME]);
          setIsMyProfile(false);
          showToastMessage(
            "error",
            "Error Connecting to your Profile. Search for your profile again"
          );
          console.error("Error while searching for PROFILE_NAME:", error);
        }
      }
      setIsLoading(false);
    };

    // Call the async function inside useEffect
    fetchData();
  }, [PROFILE_NAME, isLogin, address]); // Dependencies to re-run useEffect

  if (isLoading || profileNames?.length == 0) return <Loading />;

  return (
    <>
      <main className="am-ami-container-sm h-[calc(100dvh-97.02px)] overflow-y-hidden scroll-smooth snap-mandatory snap-y relative">
        {isMyProfile ? (
          <>
            <ProfilePrivateView
              profileNames={profileNames}
              PROFILE_NAME={PROFILE_NAME}
            />
          </>
        ) : (
          <ProfilePublicView profileNames={profileNames} />
        )}
        {/* <Loading /> */}
      </main>
    </>
  );
}
