import { FC, ReactNode } from "react";

interface IconHoverEffectProps {
  children: ReactNode;
  red?: boolean;
}

const IconHoverEffect: FC<IconHoverEffectProps> = ({
  children,
  red = false,
}) => {
  const colorClasses = red
    ? "outline-red-400 hover:bg-red-200 group-hover-bf-red-200 group-focus-visible:bg-red-200 focus-visible:bg-red-200"
    : "outline-gray-400 hover:bg-gray-200 group-hover-bf-gray-200 group-focus-visible:bg-gray-200 focus-visible:bg-gray-200";
  return (
    <div
      className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}
    >
      {children}
    </div>
  );
};

export default IconHoverEffect;
