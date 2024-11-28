import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-[100dvw] h-[100dvh] flex flex-col items-center justify-center bg-white text-headingText z-[100]">
      <Image
        alt="loader"
        src={"/assets/images/loading-tl.png"}
        width={546}
        height={546}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[min(746px,95dvw)] scale-[3] aspect-square"
      />
      <Image
        alt="loader"
        src={"/assets/images/loading-br.png"}
        width={546}
        height={546}
        className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[min(746px,95dvw)] scale-[3] aspect-square"
      />

      <Image
        src={"/assets/images/LogoSearch.svg"}
        alt="Ami Names"
        width={200}
        height={200}
        style={{
          width: "100px",
          aspectRatio: "1/1",
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="static z-10"
      />
    </div>
  );
}
