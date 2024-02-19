import { icons } from "@/utils/images";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-[100dvw] h-[100dvh] flex flex-col items-center justify-center bg-white text-headingText">
      <span>
        <Image className="h-8 w-8" alt="loader" src={icons.loader} />
      </span>
      Loading...
    </div>
  );
}
