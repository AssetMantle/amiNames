import { FC, MouseEvent } from "react";

export interface IIconWrapperPropsType {
  className?: string;
  iconClassName?: string;
  onClick?: (e?: MouseEvent<HTMLDivElement>) => void;
  iconSize?: string;
}

export const IconWrapper: FC<IIconWrapperPropsType> = ({
  className,
  iconClassName,
  onClick,
  iconSize,
}: IIconWrapperPropsType) => {
  return (
    <div
      role={"presentation"}
      className={`flex justify-center items-center ${className ?? ""}`}
      onClick={onClick}
    >
      <span className={`material-symbols-outlined ${iconSize}`}>
        {iconClassName}
      </span>
    </div>
  );
};
