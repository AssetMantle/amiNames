"use client";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

interface IModalProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  children: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  headerClassName?: string;
  closeModal: () => void;
}
const Modal: FC<IModalProps> = ({
  openModal,
  setOpenModal,
  children,
  header,
  className,
  headerClassName,
  closeModal,
}) => {
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-[6px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-[min(550px,100%)] transform overflow-hidden bg-white p-6 text-left align-middle transition-all rounded-2xl ${
                  className ?? ""
                }`}
              >
                <div className={`${headerClassName ?? ""}`}>{header}</div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
