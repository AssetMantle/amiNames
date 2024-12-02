import Loading from "@/components/Loading";
import { fetchProfileSocials } from "@/config";
import { LinksList } from "@/constant";
import { showToastMessage } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePublicView({
  profileNames,
}: {
  profileNames: string[]; // Expect an array of strings
}) {
  const [socialData, setSocialData] = useState<any>({});
  const [profile, setProfile] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const profileName = profileNames?.[0];
        setLoading(true);
        const data = await fetchProfileSocials(profileName);

        if (!data?.error) {
          // Ensure `socials` values are strings and filter out entries with empty or whitespace-only values
          const cleanedSocialData = Object.fromEntries(
            Object.entries(data?.socials || {}).filter(
              ([_, value]) => typeof value === "string" && value.trim() !== "" // Ensure the value is a string and not empty or whitespace
            )
          );

          setSocialData(cleanedSocialData); // Store the cleaned social data in state
          setProfile(data?.profile);
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
  }, [profileNames]);

  if (loading || !profile) return <Loading />;

  const hasSocialLinks = Object.keys(socialData).length > 0;

  console.log(
    "length socials: ",
    Object.keys(socialData).length,
    " socials: ",
    socialData
  );

  return (
    <div className="flex flex-col items-center justify-center h-full gap-9 p-6">
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
      <div className="flex flex-col gap-3 w-[min(320px,100%)]">
        {hasSocialLinks ? (
          // Display social links dynamically
          LinksList.map(
            (link) =>
              socialData[link.key] && (
                <a
                  key={link.key}
                  target="_blank"
                  className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)]"
                  href={socialData[link.key]}
                  rel="noopener noreferrer"
                >
                  <Image
                    className=""
                    width={30}
                    height={30}
                    alt={link.text}
                    src={link.icon}
                  />{" "}
                  {link.text}
                </a>
              )
          )
        ) : (
          // Show "Add Links Now" when no social data
          <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
            <Image
              src="/assets/images/noLinks.png"
              alt="Add Social Links"
              width={120}
              height={120}
              className="object-contain"
            />
            <p className="text-xl text-gray-800">No Links Attached</p>
          </div>
        )}
      </div>
    </div>
  );
}
