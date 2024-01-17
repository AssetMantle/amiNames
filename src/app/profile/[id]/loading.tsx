import { icons } from "@/utils/images";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Suspense } from "react";
import ProfileDropdownLoading from "./ProfileDropdownLoading";

export default async function ProfileSkeleton() {
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
        <ProfileDropdownLoading />
        <div className="w-[170px] relative bg-white p-2 rounded-md">
          <Suspense fallback={"Loading..."}>
            <QRCodeSVG
              width="100%"
              height="100%"
              value={`https://names.assetmantle.one`}
            />
          </Suspense>
        </div>

        <div className="flex flex-col gap-3">
          <a>
            <Image
              className=""
              width={30}
              height={30}
              alt="twitter"
              src={icons.twitter}
            />{" "}
            Loading...
          </a>
          <a>
            <Image
              className=""
              width={30}
              height={30}
              alt="telegram"
              src={icons.telegram}
            />{" "}
            Loading...
          </a>
          <a>
            <Image
              className=""
              width={30}
              height={30}
              alt="instagram"
              src={icons.instaShare}
            />{" "}
            Loading...
          </a>
          <a>
            <Image
              className=""
              width={30}
              height={30}
              alt="Website"
              src={"/assets/images/globe.svg"}
            />{" "}
            Loading...
          </a>
          <a>
            <Image
              className=""
              width={30}
              height={30}
              alt="Add"
              src={"/assets/images/globe.svg"}
            />{" "}
            Loading...
          </a>
        </div>
      </main>
    </>
  );
}
