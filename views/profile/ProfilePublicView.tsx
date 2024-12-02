import { fetchProfileSocials } from "@/config";
import { showToastMessage } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePublicView({
  profileNames,
}: {
  profileNames: string[]; // Expect an array of strings
}) {
  const CreateValidURL = (url: string): any => {
    return url.startsWith("www") ? `https://${url}` : url;
  };

  const [socialData, setSocialData] = useState<any>({});
  const [profile, setProfile] = useState<string>("");
  const [loading, setLoading] = useState(true);
  /* const socialData = {
    twitter: "https://t.me/kombos",
    telegram: "https://t.me/kombos",
    instagram: "https://t.me/kombos",
    website: "https://t.me/kombos",
  }; */

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const profileName = profileNames?.[0];
        setLoading(true);
        const data = await fetchProfileSocials(profileName);

        if (!data?.error) {
          setSocialData(data?.socials); // Assuming the API returns `{ profile, socials }`
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

  if (loading || !profile) return <p> component is loading </p>;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-9">
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
        {socialData?.twitter && (
          <a
            target="_blank"
            className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] bg-black"
            href={CreateValidURL(socialData?.twitter)}
            rel="noopener noreferrer"
          >
            <Image
              className=""
              width={30}
              height={30}
              alt="twitter"
              src={`/assets/images/icons/twitter.png`}
            />{" "}
            Twitter
          </a>
        )}
        {socialData?.telegram && (
          <a
            target="_blank"
            className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] am-ami-bg-telegram"
            href={CreateValidURL(socialData?.telegram)}
            rel="noopener noreferrer"
          >
            <Image
              className=""
              width={30}
              height={30}
              alt="telegram"
              src={`/assets/images/icons/telegram.png`}
            />{" "}
            Telegram
          </a>
        )}
        {socialData?.instagram && (
          <a
            target="_blank"
            className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] am-ami-bg-instagram"
            href={CreateValidURL(socialData?.instagram)}
            rel="noopener noreferrer"
          >
            <Image
              className=""
              width={24}
              height={24}
              alt="instagram"
              src={"/assets/images/icons/instagram-t.svg"}
            />{" "}
            Instagram
          </a>
        )}
        {socialData?.website && (
          <a
            target="_blank"
            className="flex items-center justify-center gap-2 border rounded-md px-5 py-2 text-white font-medium w-[min(320px,100%)] bg-black"
            href={CreateValidURL(socialData?.website)}
            rel="noopener noreferrer"
          >
            <Image
              className=""
              width={24}
              height={24}
              alt="Website"
              src={"/assets/images/icons/globe-w.svg"}
            />{" "}
            Website
          </a>
        )}
      </div>
    </div>
  );
}
