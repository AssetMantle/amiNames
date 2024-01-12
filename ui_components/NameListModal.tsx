"use client";
import React, { useEffect } from "react";
import Modal from "@/ui_components/Modal";
import Image from "next/image";
import { icons } from "@/utils/images";
import { stringToColor } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NameListModal = ({ isOpen, setIsOpen, namesList }: any) => {
  const router = useRouter();
  const path = usePathname();
  const query = useSearchParams();
  const queryValue = query.get("referral");
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <Modal
      openModal={isOpen}
      setOpenModal={setIsOpen}
      className="rounded-lg"
      header={""}
      closeModal={() => {
        handleClose();
      }}
    >
      <div>
        <Image
          className="object-contain absolute h-8 w-8 top-2 right-2 cursor-pointer"
          alt="selected"
          src={icons.close}
          onClick={() => handleClose()}
        />
        <p
          className={`paragraph_semibold !leading-10 !text-[32px] cursor-pointer ml-1 text-headingText`}
        >
          My Names
        </p>

        <div className="mt-6 flex flex-col gap-3 max-h-60 overflow-y-auto">
          {namesList.map((item: any, ind: number) => {
            return (
              <Link
                href={`/profile/${item.name}?referral=${
                  queryValue || namesList[0].name
                }`}
                key={ind}
              >
                <div className="flex items-center gap-3 px-6 py-4 border border-[#88A6FA] rounded-xl">
                  <Image
                    width={16}
                    height={16}
                    alt="checked"
                    src={`/assets/images/check-circle-fill.png`}
                    className={`${
                      path && path.split("/")[2] === item.name
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  <p
                    className={`leading-6 text-[20px] text-headingText font-inter font-medium`}
                  >
                    {item.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-b border-b-[#000000]/50 my-8"></div>

        <button
          className="flex gap-3 mx-auto text-center text-[#6188F8]"
          onClick={() =>
            router.push(`/claim?referral=${queryValue || namesList[0].name}`)
          }
        >
          Claim New Name{" "}
          <Image
            width={20}
            height={20}
            alt="plus circle"
            src={`/assets/images/plus-circle.svg`}
          />
        </button>
      </div>
    </Modal>
  );
};
export default NameListModal;
