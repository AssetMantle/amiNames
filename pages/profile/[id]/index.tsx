"use client";
import Loading from "@/components/Loading";
import { defaultChainName } from "@/config";
import Header from "@/layout/Header";
import { showToastMessage } from "@/utils";
import ProfilePrivateView from "@/views/profile/ProfilePrivateView";
import ProfilePublicView from "@/views/profile/ProfilePublicView";
import { useChain } from "@cosmos-kit/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const PROFILE_NAME: string = `${router?.query?.id}`;
  const [isLogin, setIsLogin] = useState(false);
  const { address, connect } = useChain(defaultChainName);
  // states require to generate the JSXs
  const [profileNames, setProfileNames] = useState<string[]>([]);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const BODY = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("inside useEffect, profile: ", PROFILE_NAME);
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
        // Filter for the current address and extract the names
        const names = parsedData
          .filter((item) => item.address === address)
          .map((item) => item.name);

        if (names?.length == 0) {
          setProfileNames([PROFILE_NAME]);
          setIsMyProfile(false);
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
          // Set the names array as is
          setProfileNames(names);
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
  }, [PROFILE_NAME, isLogin, address]);

  console.log(
    "profileNames: ",
    profileNames,
    " isMyProfile: ",
    isMyProfile,
    " query: ",
    PROFILE_NAME
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <Header profileName={PROFILE_NAME} setIsLogin={setIsLogin} />
      <main
        className="am-ami-container-sm p-6 h-[calc(100dvh-97.02px)] overflow-y-auto scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
        ref={BODY}
      >
        {isMyProfile ? (
          <ProfilePrivateView profileNames={profileNames} BODY={BODY} />
        ) : (
          <ProfilePublicView profileNames={profileNames} />
        )}
        {/* <Loading /> */}
      </main>
    </>
  );
}
