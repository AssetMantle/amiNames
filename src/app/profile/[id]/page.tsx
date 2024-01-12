import { readUserSocials } from "@/config/dbApi";
import { icons } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Suspense } from "react";
import AddSocials from "./AddSocials";
import ProfileDropdown from "./ProfileDropdown";

export const dynamic = "force-dynamic";

export default async function Home({ params }: { params: { id: string } }) {
  const PROFILE_NAME = params.id;
  const socialData: any = await readUserSocials(PROFILE_NAME);

  console.log(socialData);

  return (
    <>
      <main
        className="flex flex-col items-center justify-center py-[100px] gap-5"
        style={{
          backgroundImage: "url('/assets/images/bg.png')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "599px 339px",
        }}
      >
        <ProfileDropdown profile={PROFILE_NAME} />
        <div className="w-[170px] relative bg-white p-2 rounded-md">
          <Suspense fallback={"Loading..."}>
            <QRCodeSVG
              width="100%"
              height="100%"
              value={`https://names.assetmantle.one/profile/${PROFILE_NAME}`}
            />
          </Suspense>
        </div>

        <div className="flex flex-col gap-3">
          {socialData?.twitter && (
            <Link
              target="_blank"
              className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
              href={socialData?.twitter}
            >
              <Image
                className=""
                width={30}
                height={30}
                alt="twitter"
                src={icons.twitter}
              />{" "}
              Twitter
            </Link>
          )}
          {socialData?.telegram && (
            <Link
              target="_blank"
              className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
              href={socialData?.telegram}
            >
              <Image
                className=""
                width={30}
                height={30}
                alt="telegram"
                src={icons.telegram}
              />{" "}
              Telegram
            </Link>
          )}
          {socialData?.instagram && (
            <Link
              target="_blank"
              className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
              href={socialData?.instagram}
            >
              <Image
                className=""
                width={30}
                height={30}
                alt="instagram"
                src={icons.instaShare}
              />{" "}
              Instagram
            </Link>
          )}
          {socialData?.website && (
            <Link
              target="_blank"
              className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)]"
              href={socialData?.website}
            >
              <Image
                className=""
                width={30}
                height={30}
                alt="Website"
                src={"/assets/images/globe.svg"}
              />{" "}
              Website
            </Link>
          )}

          <AddSocials profile={PROFILE_NAME} socialData={socialData} />
        </div>
      </main>
    </>
  );
}
