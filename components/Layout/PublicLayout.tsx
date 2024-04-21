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
      {/* <div className="relative w-full h-20  border-slate-50 border-b-[1.4px] shadow-sm">
        <div className="absolute w-full h-full">
          <div className="flex w-full flex-col h-full items-center lg:items-start px-4 lg:px-16 justify-center">
            <span className="flex flex-row items-center cursor-pointer group">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 14 14"
                id="svg2"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <defs id="defs6"></defs>{" "}
                  <rect
                    width="14"
                    height="14"
                    x="0"
                    y="0"
                    id="canvas"
                    style={{
                      fill: "none",
                      stroke: "none",
                      visibility: "hidden",
                    }}
                  ></rect>{" "}
                  <path
                    d="m 0,0 0,10 c 2,3 5.24979,2.039143 5.24979,4 L 6.25,14 6.25,4 C 6.25,1.0168774 2,3 0,0 z M 14,0 C 12,3 7.75,1.0449388 7.75,4 l 0,10 1,0 C 8.75,12.020266 12,13 14,10 z"
                    id="library"
                    style={{ fill: "#000000", fillOpacity: 1, stroke: "none" }}
                  ></path>{" "}
                </g>
              </svg>

              <h1 className="text-lg ml-3 lg:text-2xl tex-gray-750 font-light tracking-widest ">
                kwitangpedia
              </h1>
            </span>
          </div>
        </div>
      </div> */}
      <div
        className={`font-sans pt-28 lg:pt-32 px-4 bg-white relative flex flex-col w-full max-w-[1400px]  mx-auto justify-center items-center ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </div>
    </Fragment>
  );
}
