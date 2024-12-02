import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import React, { Suspense } from "react";

export default function PrivateQRCode({
  PROFILE_NAME,
  BODY,
}: {
  PROFILE_NAME: string | string[] | undefined;
  BODY: React.RefObject<HTMLElement>;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-97.02px)] gap-9">
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
          {PROFILE_NAME}
        </div>
        <Image
          src={"/assets/images/icons/chevron-down.svg"}
          alt="Ami Names"
          width={16}
          height={16}
          className="ml-4"
        />
      </div>
      <div className="w-[170px] relative bg-white p-2 rounded-md">
        <Suspense fallback={"Loading..."}>
          <QRCodeSVG
            width="100%"
            height="100%"
            value={`https://ami-na.me/profile/${PROFILE_NAME}?referral=${PROFILE_NAME}`}
          />
        </Suspense>
      </div>
      <button
        onClick={() => {
          BODY.current &&
            BODY.current.scrollHeight &&
            BODY.current.scrollTo(0, BODY.current.scrollHeight);
        }}
      >
        <Image
          src={"/assets/images/icons/chevron-down.svg"}
          alt="Ami Names"
          width={32}
          height={32}
          className="ml-4 rotate-180"
        />
      </button>
    </div>
  );
}
