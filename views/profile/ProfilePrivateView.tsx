"use client";
import Loading from "@/components/Loading";
import AddLinkModal from "@/components/modals/AddLinkModal";
import { fetchProfileSocials, fetchSetProfile } from "@/config";
import { LinksList } from "@/constant";
import { showToastMessage } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import PrivateQRCode from "./PrivateQRCode";

export default function ProfilePrivateView({
  profileNames,
  PROFILE_NAME,
}: {
  profileNames: string[]; // Expect an array of strings
  PROFILE_NAME: string | string[] | undefined;
}) {
  const [Switch, setSwitch] = useState(false);
  const [ModalState, setModalState] = useState(false);
  const [ModalFor, setModalFor] = useState("");
  const [loading, setLoading] = useState(true);
  const [socialData, setSocialData] = useState<any>({});
  const [originalSocialData, setOriginalSocialData] = useState<any>({});

  const [profile, setProfile] = useState<string>("");
  const [IsViewQR, setIsViewQR] = useState(true);

  useEffect(() => {
    // console.log("inside useEffect, profile: ", originalSocialData);
    const fetchSocialData = async () => {
      try {
        const profileName = profileNames?.[0];
        setLoading(true);
        const data = await fetchProfileSocials(profileName);

        if (!data?.error) {
          // Save the original socials data in the state
          const originalSocialData = data?.socials || {};

          // Clean the socialData (filter out entries with empty or whitespace-only values)
          const cleanedSocialData = Object.fromEntries(
            Object.entries(originalSocialData).filter(
              ([_, value]) => typeof value === "string" && value.trim() !== ""
            )
          );

          // Store the cleaned social data and the original social data
          setSocialData(cleanedSocialData); // Store cleaned data
          setOriginalSocialData(originalSocialData); // Store the original data
          setProfile(profileName);

          // Check if cleaned socialData is empty, and set the switch accordingly
          if (Object.keys(cleanedSocialData).length === 0) {
            setSwitch(true); // Show "Link Platforms" if no valid social data
          }
        } else {
          throw new Error(data?.error);
        }
      } catch (err) {
        console.error(err);
        showToastMessage("error", "Error reading profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchSocialData();
  }, [profileNames, PROFILE_NAME]);

  const handleDelete = (platform: string) => {
    setSocialData((prevData: any) => {
      const updatedData = { ...prevData };
      delete updatedData[platform];
      return updatedData;
    });
  };

  // Custom handler for the Chevron button
  const handleChevron = async () => {
    console.log("inside handleChevron");
    // Deep comparison of socialData with the original data
    const isChanged =
      JSON.stringify(socialData) !== JSON.stringify(originalSocialData);

    if (isChanged) {
      try {
        const result = await fetchSetProfile(profile, socialData);

        if (!result?.error) {
          console.log("SocialData set successfully");
          showToastMessage("success", "Social Data saved successfully");
          setOriginalSocialData(socialData);
        } else {
          console.error("Failed to set profile:", result?.error);
          showToastMessage("error", "Error while saving Social Data");
        }
      } catch (error) {
        console.error("Error in setting profile:", error);
      } finally {
        setIsViewQR(true);
      }
    } else {
      // Handle case where no changes have been made (optional)
      console.log("No changes to social data.");
    }
    setIsViewQR(true);
  };

  if (loading || !profile) return <Loading />;

  return IsViewQR ? (
    <PrivateQRCode
      PROFILE_NAMES={profileNames}
      PROFILE_NAME={profile}
      changeView={setIsViewQR}
    />
  ) : (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-9 p-6 box-border snap-start snap-always">
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
            {profile}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-[min(320px,100%)] h-max">
          <h2
            className={`leading-[20px] font-bold text-xl cursor-pointer text-center text-headingText`}
          >
            Manage Social Links
          </h2>
          <h3
            className="text-base font-semibold flex items-center justify-between gap-4"
            style={{ color: "#6188F8" }}
            role="button"
            tabIndex={0}
            onClick={() => setSwitch(!Switch)}
          >
            Linked Platforms:{" "}
            <Image
              src={"/assets/images/icons/chevron-down.svg"}
              alt="Search Icon"
              width={16}
              height={16}
              className={`${Switch ? "rotate-0" : "rotate-180"}`}
            />
          </h3>
          {!Switch && (
            <div className="flex flex-col gap-5 max-h-[230px] overflow-y-auto">
              {Object.keys(socialData).length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  onClick={() => setSwitch(true)} // Switch to "Link Platforms" when clicked
                >
                  <Image
                    src="/assets/images/addSocials.png"
                    alt="Add Social Links"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                  <p className="text-xl text-gray-800">Add Links Now</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {LinksList.filter(
                      (link) =>
                        socialData[link.key] && socialData[link.key] !== ""
                    ).map((link) => (
                      <div
                        key={link.key}
                        className="flex flex-wrap items-center gap-2"
                      >
                        <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                          <div
                            className={`rounded-[50%] p-1 ${link?.classNames}`}
                          >
                            <Image
                              width={24}
                              height={24}
                              className={`my-auto`}
                              alt={link.text}
                              src={link.icon}
                            />
                          </div>
                          {link.text}
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={socialData[link.key]} // Dynamically fetch value from socialData
                          className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                        />
                        <ImBin
                          className="text-red-500 cursor-pointer"
                          size={20}
                          role="button"
                          tabIndex={0}
                          onClick={() => handleDelete(link.key)} // Pass the key to handleDelete
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          <div className="border-b border-b-[#D4DCE2]"></div>
          <h3
            className="text-base font-semibold flex items-center justify-between gap-4"
            style={{ color: "#6188F8" }}
            role="button"
            tabIndex={0}
            onClick={() => setSwitch(!Switch)}
          >
            Link Platform:{" "}
            <Image
              src={"/assets/images/icons/chevron-down.svg"}
              alt="Search Icon"
              width={16}
              height={16}
              className={`${Switch ? "rotate-180" : "rotate-0"}`}
            />
          </h3>
          {Switch && (
            <div className="flex flex-col gap-6">
              <div
                className="grid grid-cols-3 gap-4"
                style={{ gridTemplateColumns: "repeat(3,1fr)" }}
              >
                {React.Children.toArray(
                  LinksList.filter((link) => !socialData[link.key]).map(
                    (link) => (
                      <div
                        className="flex flex-col gap-2 items-center"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setModalFor(link.text);
                          setModalState(true);
                        }}
                      >
                        <div
                          className={`rounded-[50%] p-1 ${link?.classNames}`}
                        >
                          <Image
                            src={link.icon}
                            alt={`${link.text} Icon`}
                            width={24}
                            height={24}
                          />
                        </div>
                        <p className="">{link.text}</p>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={handleChevron} className="bg-transparent p-2">
          <Image
            src={"/assets/images/icons/chevron-down.svg"}
            alt="Ami Names"
            width={32}
            height={32}
            className=""
          />
        </button>
      </div>

      <AddLinkModal
        LinksList={LinksList}
        ModalFor={ModalFor}
        isOpen={ModalState}
        setOpen={setModalState}
        onClose={() => {
          setModalFor("");
          setModalState(false);
        }}
        socialData={socialData}
        setSocialData={setSocialData}
      />
    </>
  );
}
