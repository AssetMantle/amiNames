import Image from "next/image";
import React from "react";
import { GrDownload } from "react-icons/gr";

export default function PromptInstall({
  fun,
  open,
  close,
}: {
  fun: () => void;
  open: boolean;
  close: () => void;
}) {
  return open ? (
    <div className="fixed inset-0 w-dvw h-dvh bg-black/40 backdrop-blur flex">
      <div className="absolute inset-0 w-full h-full z-0" onClick={close}></div>
      <div
        className={`mt-auto mx-auto bg-white rounded-t-3xl p-6 pb-8 w-[min(600px,100%)] z-10 relative${
          open ? " am-ami-animate-to-top" : ""
        }`}
      >
        <Image
          className="object-contain absolute h-8 w-8 top-5 right-5 cursor-pointer"
          alt="selected"
          src={`/assets/images/icons/close.svg`}
          width={32}
          height={32}
          onClick={close}
        />
        <h1 className="font-bold text-xl">Install Our App</h1>
        <div className="flex items-center justify-between gap-6 pt-5 pr-2">
          <p className={``}>
            Get our App experience optimized for your device.
          </p>
          <button className="px-4 py-3 text-xl font-semibold bg-[#88A6FA] rounded-lg flex items-center gap-3 text-white">
            <Image
              src="/assets/images/icons/download.svg"
              alt="download"
              width={20}
              height={20}
            />{" "}
            Install
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
