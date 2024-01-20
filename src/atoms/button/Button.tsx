import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  innerRef?: any | undefined;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  innerRef,
  className:
    classNameArg = "rounded-full px-4 py-2 font-bold text-white hover:bg-[#eb98e0] bg-[#f179e1]",
  style = {},
  disabled = false,
}: ButtonProps) => {
  const className = `${classNameArg} ${
    disabled && "hover:cursor-not-allowed bg-slate-200 hover:bg-slate-200"
  }`;
  return (
    <button
      className={className}
      onClick={onClick}
      ref={innerRef}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
