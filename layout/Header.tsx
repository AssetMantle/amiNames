"use client";
import { HeaderProps } from "@/config";
import { chain } from "@/constant";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import Link from "next/link";

export default function Header({
  profileName,
  setIsLogin,
  isLogin,
}: HeaderProps) {
  const { connect, address } = useChain(chain);

  const handleProfileIconClick = async () => {
    if (!address) {
      await connect();
      setIsLogin(true);
    } else {
      await connect();
      setIsLogin(false);
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 w-full flex items-center justify-center bg-white">
      <div className="am-ami-container-sm p-6 py-6 flex items-center justify-between gap-6">
        <button onClick={handleProfileIconClick}>
          <Image
            src={`/assets/images/icons/profile-${
              isLogin ? "fill" : "outline"
            }.svg`}
            alt="Profile Icon"
            width={50}
            height={50}
          />
        </button>
        <Link href={`/search`}>
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
