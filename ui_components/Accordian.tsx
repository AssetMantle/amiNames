import { icons } from "@/utils/images";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export interface IAccordionProps {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  accordionHeader?: React.ReactNode;
  accordionBody?: React.ReactNode;
  id?: number;
  headerExpandedClassName?: string;
  accordionFooter?: React.ReactNode;
  handleOpen: () => void;
  open: boolean;
}

const Accordion = ({
  className,
  headerClassName,
  bodyClassName,
  accordionHeader,
  accordionBody,
  headerExpandedClassName,
  id,
  accordionFooter,
  handleOpen,
  open,
}: IAccordionProps) => {
  const variants = {
    collapsed: {
      zIndex: 1,
      transitionEnd: { zIndex: 0 },
    },
  };
  const handleChildClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <motion.div
      className={`w-full rounded-large relative py-8 px-5 ${className ?? ""}`}
      onClick={() => {
        handleOpen();
      }}
    >
      <div
        role={"presentation"}
        className={`w-full flex items-center justify-between relative cursor-pointer
                ${headerClassName ?? ""} ${
          open ? headerExpandedClassName ?? "" : ""
        }`}
        onClick={handleOpen}
      >
        {accordionHeader}
        <div className="">
          <Image
            className={`${
              open
                ? "rotate-180 transition-all ease-in-out duration-300"
                : "rotate-0 transition-all ease-in-out duration-300"
            }`}
            src={icons.downArrowRounded}
            alt="sakfj"
          />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={"accordion" + id}
            initial="collapsed"
            animate="details"
            exit="collapsed"
            variants={{
              details: { height: "auto" },
              collapsed: { height: 0 },
            }}
            onClick={handleChildClick}
            className={`overflow-hidden ${bodyClassName ?? ""}`}
          >
            {accordionBody}
          </motion.div>
        )}
      </AnimatePresence>
      {accordionFooter && (
        <div role={"presentation"} onClick={handleOpen}>
          {accordionFooter}
        </div>
      )}
    </motion.div>
  );
};

export default Accordion;
