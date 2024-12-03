import { formatWebsiteUrl } from "@/constant";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import Modal from "./Modal";

export default function AddLinkModal({
  isOpen,
  setOpen,
  onClose,
  ModalFor,
  LinksList,
  socialData,
  setSocialData,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  ModalFor: string;
  LinksList: {
    key: string;
    icon: string;
    text: string;
    profileUrl: (input: string) => string;
    validationRegex: RegExp;
    classNames: string | undefined;
  }[];
  socialData: any;
  setSocialData: Dispatch<SetStateAction<any>>;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for the input element
  const currentLink = LinksList.find((link) => link.text === ModalFor);

  const fullProfileUrl =
    ModalFor === "Website" && inputValue
      ? formatWebsiteUrl(inputValue)
      : currentLink?.profileUrl(inputValue) ?? "";

  useEffect(() => {
    // Focus the input when the modal opens
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]); // Re-run this effect when isOpen changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Temporary regex for all socials to allow empty string
    const temporaryRegex =
      ModalFor === "Telegram"
        ? /^[a-zA-Z0-9_]{0,32}$/ // Allow empty string and valid characters
        : ModalFor === "Facebook"
        ? /^[a-zA-Z0-9.]{0,50}$/
        : ModalFor === "Website"
        ? /^.*$/
        : new RegExp(`^$|${currentLink?.validationRegex.source}`); // Default to allow empty or valid input

    if (temporaryRegex.test(value)) {
      setInputValue(value);
    }
  };

  const handleSave = () => {
    if (!currentLink || !inputValue) {
      alert("Invalid Input");
      setInputValue("");
      return;
    }

    // Final validation for minimum character requirement
    if (
      currentLink.validationRegex &&
      !currentLink.validationRegex.test(inputValue)
    ) {
      alert("Invalid Input");
      setInputValue("");
      return;
    }

    // Construct and save the profile URL
    const profileUrl =
      ModalFor === "Website" ? inputValue : currentLink.profileUrl(inputValue);

    setSocialData((prevData: any) => ({
      ...prevData,
      [currentLink.key]: profileUrl,
    }));

    setInputValue("");
    onClose();
  };

  const handleCopy = () => {
    if (fullProfileUrl) navigator.clipboard.writeText(fullProfileUrl);
  };

  const handleClose = () => {
    setInputValue("");
    onClose();
  };

  return (
    <Modal
      openModal={isOpen}
      setOpenModal={setOpen}
      className="rounded-xl p-4"
      header={""}
      closeModal={handleClose}
    >
      <Image
        className="object-contain absolute h-8 w-8 top-5 right-5 cursor-pointer"
        alt="close"
        src={`/assets/images/icons/close.svg`}
        width={32}
        height={32}
        onClick={handleClose}
      />
      <div className="flex flex-col gap-6">
        <p className="text-primary text-[20px] font-bold w-full">
          Add {ModalFor === "Website" ? ModalFor : ModalFor + " Username"}
        </p>

        <div className="flex items-center gap-2">
          <div className={`rounded-[50%] p-2 ${currentLink?.classNames}`}>
            <Image
              width={26}
              height={26}
              className="my-auto"
              alt={ModalFor}
              src={currentLink?.icon ?? "/assets/images/icons/link-45deg.svg"}
            />
          </div>
          <input
            ref={inputRef} // Add ref to input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border border-[#6188F8] px-4 py-1 rounded-lg flex-grow"
          />
        </div>

        {fullProfileUrl && (
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700">
            <span>{fullProfileUrl}</span>
            <FaCopy
              size={16}
              className="cursor-pointer text-blue-500"
              onClick={handleCopy}
              title="Copy"
            />
          </div>
        )}

        <button
          type="button"
          className="w-full bg-[#396AF6] px-6 py-[12px] text-md text-center font-semibold leading-[100%] text-white transition hover:bg-warning-600 focus:bg-warning-600 flex items-center justify-center gap-2 rounded-full ease-in-out duration-300"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
