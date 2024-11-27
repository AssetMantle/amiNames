"use client";

import { chain } from "@/constant";
import SocialModal from "@/ui_components/SocialModal";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AddSocials({ profile, socialData }: any) {
  const chainContext = useChain(chain);
  const { address } = chainContext;
  const [namesList, setNamesList] = useState<any>();
  const [SocialModOpenState, setSocialModOpenState] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const names = localStorage.getItem("amiNamesList");
        if (names) {
          const list = JSON.parse(names);
          if (Array.isArray(list) && list.length > 0) {
            let nameList =
              list && list.filter((item: any) => item.address === address);
            setNamesList(nameList);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [address]);

  const isAddEnabled = () => {
    return !!(
      address &&
      namesList &&
      [...namesList].filter((el) => el.name === profile).length > 0
    );
  };

  const addButtonJSX = (
    <>
      {" "}
      <button
        onClick={() => {
          setSocialModOpenState(true);
          console.log(socialData);
        }}
        className="flex gap-2 items-center border rounded-md px-5 py-2 font-semibold w-[min(190px,100%)] disabled:opacity-50"
        disabled={!isAddEnabled()}
      >
        <Image
          className=""
          width={24}
          height={24}
          alt="edit"
          src={`/assets/images/pencil.svg`}
        />{" "}
        Add/Edit
      </button>
      <SocialModal
        isOpen={SocialModOpenState}
        setIsOpen={setSocialModOpenState}
        profile={profile}
        socialData={socialData}
      />
    </>
  );

  return <>{isAddEnabled() && addButtonJSX}</>;
}
