import { icons } from "@/utils/images";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function Loading({ Show, setShow }: any) {
  const pathname = usePathname();

  useEffect(() => {
    Show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [Show]);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    Show && (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-[100dvw] h-[100dvh] flex flex-col items-center justify-center bg-white text-headingText z-10">
        <span>
          <Image className="h-8 w-8" alt="loader" src={icons.loader} />
        </span>
        Loading...
      </div>
    )
  );
}
