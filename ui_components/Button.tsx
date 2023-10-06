import { FC, MouseEvent } from "react";

export interface IButtonProps {
  label?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = ({
  label,
  disabled,
  children,
  className,
  type,
  onClick,
  ...props
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`${
        className
          ? className
          : "flex items-center justify-center gap-2 relative rounded-lg ease-in-out duration-300"
      }`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {label ?? children ?? null}
    </button>
  );
};

export default Button;
