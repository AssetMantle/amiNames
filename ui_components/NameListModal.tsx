"use client";
import React from "react";
import Modal from "@/ui_components/Modal";
import Image from "next/image";
import { icons } from "@/utils/images";
import { stringToColor } from "@/utils";

const NameListModal = ({ isOpen, setIsOpen, namesList }: any) => {
  const handleClose = () => {
    setIsOpen(false);
  };

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
          My names
        </p>

        <div className="border border-black mt-6">
          {namesList.map((item: any, ind: number) => {
            return (
              <div
                className="flex items-center gap-4 px-6 py-4 border-b border-b-[#010101]/50 last:border-b-0"
                key={ind}
              >
                <div
                  className={`w-6 h-6 rounded-full`}
                  style={{ backgroundColor: stringToColor(item.name) }}
                >
                  <p className="paragraph_regular text-center text-white">
                    {item.name.substring(0, 1).toUpperCase()}
                  </p>
                </div>
                <p
                  className={`leading-6 text-[20px] text-headingText font-inter`}
                >
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
export default NameListModal;
