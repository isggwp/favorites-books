"use client";

import { Fragment } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <div className="relative w-full h-20 border-b-2 border-red-300">
        <div className="absolute w-full h-full debug-green">
          <div className="flex w-full flex-col h-full items-center lg:items-start px-4 lg:px-14 justify-center">
            <h1 className="text-lg lg:text-3xl tex-gray-950 font-bold italic tracking-widest ">
              kwitangpedia
            </h1>
          </div>
        </div>
      </div>
      <div
        className={`font-sans bg-white max-w-[1400px] w-full px-4 md:px-14 ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </div>
    </Fragment>
  );
}
