import SelectNameModal from "@/components/modals/SelectNameModal";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import React, { Dispatch, SetStateAction, Suspense, useState } from "react";

export default function PrivateQRCode({
  PROFILE_NAMES,
  PROFILE_NAME,
  changeView,
}: {
  PROFILE_NAMES: string[];
  PROFILE_NAME: string | string[] | undefined;
  changeView: Dispatch<SetStateAction<boolean>>;
}) {
  const [SelectNameModalState, setSelectNameModalState] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-9 p-6 box-border snap-start snap-always">
        <div
          className="flex items-center justify-center mx-auto relative"
          role="button"
          tabIndex={0}
          onClick={() => setSelectNameModalState(true)}
        >
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
        <div className="w-[min(250px,95%)] relative rounded-md">
          <Suspense fallback={"Loading..."}>
            <QRCodeSVG
              width="100%"
              height="100%"
              value={`https://ami-na.me/profile/${PROFILE_NAME}?referral=${PROFILE_NAME}`}
            />
          </Suspense>
        </div>
        <button
          onClick={() => changeView(false)}
          className="bg-transparent p-2 w-10 aspect-square relative"
        >
          <Image
            src={"/assets/images/icons/chevron-down.svg"}
            alt="Ami Names"
            width={32}
            height={32}
            className="rotate-180 -z-10"
          />
        </button>
      </div>
      <SelectNameModal
        isOpen={SelectNameModalState}
        setOpen={setSelectNameModalState}
        namesList={PROFILE_NAMES}
        onClose={() => {
          setSelectNameModalState(false);
        }}
        currentName={PROFILE_NAME}
      />
    </>
  );
}
