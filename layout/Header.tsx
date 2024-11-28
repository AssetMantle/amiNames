"use client";
import { chain } from "@/constant";
import { getFromLocalStorage } from "@/utils";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header({ profileName = "" }) {
  const router = useRouter();
  const { address, connect, disconnect } = useChain(chain);

  const [NamesList, setNamesList] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      const list = getFromLocalStorage("amiNamesList");
      const nameList =
        list && list.filter((item: any) => item.address === address);
      setNamesList(nameList);
    }
  }, [address]);

  const handleProfileIconClick = () => {
    if (address && !NamesList.includes(profileName)) {
      router.push(`/profile/${NamesList[0].name}`);
    } else {
      connect();
    }
  };

  console.log();

  return (
    <header className="sticky top-0 left-0 right-0 w-full flex items-center justify-center bg-white">
      <div className="am-ami-container-sm p-6 py-6 flex items-center justify-between gap-6">
        <button onClick={handleProfileIconClick}>
          <Image
            src={`/assets/images/icons/profile-outline.svg`}
            alt="Profile Icon"
            width={50}
            height={50}
          />
        </button>
        <Link href={`/search?referral=${profileName}`}>
          <Image
            src={`/assets/images/icons/search-outline.svg`}
            alt="Profile Icon"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </header>
  );
}
