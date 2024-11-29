import React, { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import Image from "next/image";

export default function AddLinkModal({
  isOpen,
  setOpen,
  onClose,
  ModalFor,
  LinksList,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  ModalFor: string;
  LinksList: { icon: string; text: String }[];
}) {
  const handleSave = () => {};
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
        <p className="text-primary text-[20px] font-bold w-full">
          {ModalFor === "Add Link" ? ModalFor : "Add " + ModalFor}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Image
              width={34}
              height={34}
              className="my-auto"
              alt="Twitter"
              src={
                LinksList.find((el) => el.text === ModalFor)?.icon ??
                "/assets/images/icons/link-45deg.svg"
              }
            />
          </div>
          <input
            type="text"
            className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
          />
        </div>

        <button
          type="button"
          className={`w-full bg-[#396AF6] px-6 py-[12px] text-md text-center font-semibold leading-[100%] text-white transition hover:bg-warning-600  focus:bg-warning-600 flex items-center justify-center gap-2 relative rounded-full ease-in-out duration-300`}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
