"use client";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface IPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  target: Element | null;
  leftPad: number;
  className?: string;
}

// @ts-ignore
const Popover: React.FC<IPopoverProps> = ({
  isOpen,
  onClose,
  content,
  target,
  className,
  leftPad,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        target &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !target.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose, target]);

  if (!isOpen || !target) return null;

  const targetRect = target.getBoundingClientRect();
  const scale = isOpen ? 1 : 0.8;
  const transform = `scale(${scale})`;
  const popoverStyle: React.CSSProperties = {
    position: "absolute",
    left: targetRect.left + window.scrollX + leftPad,
    top: targetRect.bottom + window.scrollY + 8,
    opacity: isOpen ? 1 : 0,
    transform,
    transition: "opacity 0.3s, transform 0.3s",
    zIndex: 100,
  };

  return ReactDOM.createPortal(
    <div style={popoverStyle}>
      <div
        ref={popoverRef}
        className={`bg-white p-2 rounded-lg shadow-2xl ${className ?? ""}`}
      >
        {content}
      </div>
    </div>,
    document.body
  );
};

export default Popover;
