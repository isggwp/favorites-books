"use client";

import { Fragment } from "react";
import { Drawer } from "vaul";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
   
      <div
        className={`font-sans pt-28 lg:pt-24 px-4 bg-white relative flex flex-col w-full max-w-[1400px]  mx-auto justify-center items-center ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </div>
    </Fragment>
  );
}
