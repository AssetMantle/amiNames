"use client";
import React, { useState } from "react";
import Modal from "@/ui_components/Modal";
import Image from "next/image";
import { icons } from "@/utils/images";

const SocialModal = ({ isOpen, setIsOpen, type }: any) => {
  const [AddLink, setAddLink] = useState(false);

  const handleAddition = () => {
    setAddLink(false);
  };
  const handleSave = () => {
    handleClose();
  };

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
          Manage Social Links
        </p>
        <div className="flex flex-col gap-5 pt-8 ps-0 md:ps-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                <Image
                  width={24}
                  height={24}
                  className="my-auto"
                  alt="Twitter"
                  src={icons.twitter}
                />{" "}
                Twitter:
              </div>
              <input
                type="text"
                className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                placeholder="URL"
              />
              <div className="flex items-center gap-2">
                <Image
                  width={16}
                  height={16}
                  alt="edit"
                  src={"/assets/images/pencil.svg"}
                />{" "}
                <Image
                  width={16}
                  height={16}
                  alt="edit"
                  src={"/assets/images/trash.svg"}
                />{" "}
                <button
                  className={`toggle-button bg-success border border-success w-6 rounded-[20px] flex`}
                >
                  <span
                    className={`toggler w-3 h-3 bg-white rounded-[50%] ms-auto`}
                  ></span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                <Image
                  width={24}
                  height={24}
                  className="my-auto"
                  alt="telegram"
                  src={icons.telegram}
                />{" "}
                Telegram:
              </div>
              <input
                type="text"
                className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                placeholder="URL"
              />
              <div className="flex items-center gap-2">
                <Image
                  width={16}
                  height={16}
                  alt="edit"
                  src={"/assets/images/pencil.svg"}
                />{" "}
                <Image
                  width={16}
                  height={16}
                  alt="edit"
                  src={"/assets/images/trash.svg"}
                />{" "}
                <button
                  className={`toggle-button bg-success border border-success w-6 rounded-[20px] flex`}
                >
                  <span
                    className={`toggler w-3 h-3 bg-white rounded-[50%] ms-auto`}
                  ></span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 w-full md:w-[min(120px,100%)]">
                <Image
                  width={24}
                  height={24}
                  className="my-auto"
                  alt="Instagram"
                  src={icons.instaShare}
                />{" "}
                Instagram:
              </div>
              <input
                type="text"
                className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
                placeholder="URL"
              />
              <div className="flex items-center gap-2">
                <Image
                  width={16}
                  height={16}
                  alt="edit"
                  src={"/assets/images/pencil.svg"}
                />{" "}
                <Image
                  width={16}
                  height={16}
                  alt="edit"
                  src={"/assets/images/trash.svg"}
                />{" "}
                <button
                  className={`toggle-button bg-success border border-success w-6 rounded-[20px] flex`}
                >
                  <span
                    className={`toggler w-3 h-3 bg-white rounded-[50%] ms-auto`}
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-b-[#000000]/50"></div>

          {(type === "add" || AddLink) && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <label htmlFor="website w-full md:w-auto">Enter URL:</label>
              <input
                type="text"
                name="website"
                className="border border-[#6188F8] px-4 py-1 rounded-lg w-[min(300px, 100%)]"
                placeholder="URL"
              />
              <button className="text-[#6188F8]" onClick={handleAddition}>
                Add Link
              </button>
            </div>
          )}
          {type === "edit" && !AddLink && (
            <button
              className="flex gap-3 mx-auto text-center text-[#6188F8]"
              onClick={() => setAddLink(true)}
            >
              Add Link{" "}
              <Image
                width={20}
                height={20}
                alt="plus circle"
                src={`/assets/images/plus-circle.svg`}
              />
            </button>
          )}
          <button
            className="w-[min(322px,100%)] bg-[#6188F8] text-[#ffffff] rounded-[36px] mx-auto px-6 py-3 text-xl"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default SocialModal;
