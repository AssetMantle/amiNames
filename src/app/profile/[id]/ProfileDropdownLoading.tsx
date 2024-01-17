"use client";

import { chain } from "@/constant";
import NameListModal from "@/ui_components/NameListModal";
import { icons } from "@/utils/images";
import { useChain } from "@cosmos-kit/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfileDropdownLoading() {
  return (
    <>
      <h1 className="text-[28px] font-semibold text-primary flex gap-3 items-center">
        {`Loading...`}
      </h1>
    </>
  );
}
