"use client";

import { chain } from "@/constant";
import NameListModal from "@/ui_components/NameListModal";
import { icons } from "@/utils/images";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfileDropdown({ profile }: any) {
  const chainContext = useChain(chain);
  const PROFILE_NAME = profile;
  const { address } = chainContext;
  const [namesList, setNamesList] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

  function getNames() {
    try {
      if (typeof window !== "undefined") {
        const names = localStorage.getItem("amiNamesList");
        if (names) {
          const list = JSON.parse(names);
          if (Array.isArray(list) && list.length > 0) {
            const nameList =
              list && list.filter((item: any) => item.address === address);
            setNamesList(nameList);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      namesList && namesList.length > 0 && setIsOpen(true);
    }
  }

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

  return (
    <>
      <h1 className="text-[28px] font-semibold text-primary flex gap-3 items-center">
        Hi{" "}
        {!(
          address &&
          namesList &&
          [...namesList].filter((el) => el.name === PROFILE_NAME).length > 0
        ) ? (
          <span className="hero-heading-gradient-text uppercase">
            {PROFILE_NAME}
          </span>
        ) : (
          <button
            className="hero-heading-gradient-text uppercase flex items-center border border-black rounded-3xl px-3 py-0 gap-2"
            onClick={getNames}
          >
            {PROFILE_NAME}{" "}
            <Image className="" alt="down icon" src={icons.chevronDown} />
          </button>
        )}
      </h1>
      {namesList && (
        <NameListModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          namesList={namesList}
        />
      )}
    </>
  );
}
