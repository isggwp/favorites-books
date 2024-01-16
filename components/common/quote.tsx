"use client";

import { Fragment, ReactNode } from "react";

type QuoteBannerProps = {
  quote?: ReactNode;
  author?: String;
};

export default function QuoteBanner({ quote, author }: QuoteBannerProps) {
  return (
    <Fragment>
      <div className="flex flex-col justify-start items-start w-full h-[350px] bg-white mx-auto">
        <div className="text-black text-[2vw] w-10/12 mx-auto pb-5  h-auto max-h-[240px]  font-sans font-normal italic">
          <div className="font-bold text-[3vw] mb-3 flex justify-start -top-32 -left-5">
            ,,
          </div>
          {quote}
          <div className="font-bold text-[3vw] flex justify-end -mt-14">,,</div>
          <strong className="text-[1.5vw] mt-2 font-light">{author ? author : null}</strong>
        </div>
      </div>
    </Fragment>
  );
}
