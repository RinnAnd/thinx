import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  small?: boolean;
  gray?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  small = false,
  gray = false,
  className = "",
  ...props
}) => {
    const sizeClasses = small ? 'px-2 py-1' : 'px-4 py-2 font-bold'
    const colorClasses = gray ? 'bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300' : 'bg-blue-400 hover:bg-blue-500 focus-visible:bg-blue-400 text-white'

  return <button className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`} {...props}></button>;
};

export default Button;
