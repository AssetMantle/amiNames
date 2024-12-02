import React, { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import Image from "next/image";
import Link from "next/link";

export default function SelectNameModal({
  isOpen,
  setOpen,
  onClose,
  namesList,
  currentName,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  namesList: string[];
  currentName: string | string[] | undefined;
}) {
  return (
    <Modal
      openModal={isOpen}
      setOpenModal={setOpen}
      className="rounded-xl p-4"
      header={""}
      closeModal={onClose}
    >
      <Image
        className="object-contain absolute h-8 w-8 top-5 right-5 cursor-pointer"
        alt="selected"
        src={`/assets/images/icons/close.svg`}
        width={32}
        height={32}
        onClick={onClose}
      />
      <div className="flex flex-col gap-6">
        <p className="text-primary text-[20px] font-bold w-full">My Names</p>

        {namesList &&
          Array.isArray(namesList) &&
          namesList.length > 0 &&
          React.Children.toArray(
            namesList.map((name) => (
              <div className="py-2 px-4 text-gray-900 border border-[#396AF6] bg-gray-50 rounded-xl relative">
                <span
                  className={`${
                    currentName === name
                      ? "hero-heading-gradient-text font-black"
                      : "font-bold"
                  } uppercase text-2xl`}
                >
                  {name}
                </span>
                {!(currentName === name) && (
                  <Link
                    href={`/profile/${name}?referral=${currentName}`}
                    className="opacity-0 absolute w-full h-full inset-0"
                  />
                )}
              </div>
            ))
          )}
      </div>
    </Modal>
  );
}
