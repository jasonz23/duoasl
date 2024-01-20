import localFont from "@next/font/local";
import React from "react";

const nunito = localFont({
  src: [
    {
      path: "./fff-forward/FFFFORWA.ttf",
    },
  ],
  variable: "--font-nunito",
});

const FontWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={nunito.variable}>
      <div className="font-nunito">{children}</div>
    </div>
  );
};

export default FontWrapper;
