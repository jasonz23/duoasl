import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    classNameArg = "rounded-full px-4 py-2 font-bold text-white hover:bg-[#48cad9] bg-[#48cad9]",
  style = {},
  disabled = false,
}: ButtonProps) => {
  const className = `${classNameArg} ${
    disabled && "hover:cursor-not-allowed bg-slate-200 hover:bg-slate-200"
  }`;
  return (
    <button
      className={className}
      // eslint-disable-next-line react/button-has-type
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
