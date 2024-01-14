import { Fragment } from "react";
import clsx from "clsx";

type DataExp = {
  no: number;
  year: string;
  company: string;
  position: string;
  desc: string;
};

const Experience = ({ data }: { data: DataExp[] }) => {
  return (
    <>
      {data.map((item: DataExp, index) => {

        const isLastItem = index === data.length - 1;

        return (
          <Fragment key={item.no}>
            <div className="w-full flex flex-row ">
              <div className={
                clsx([
                    "w-3/12 sm:w-2/12  flex justify-end items-start",
                    isLastItem ? "" : "border-r-2 border-solid border-indigo-400"
                ])
              }>
                <div className="px-5 md:px-6 -mt-2">
                  <section>
                    <p className="text-indigo-400 font-medium text-xs sm:text-base tracking-widest">
                      {item?.year}
                    </p>
                  </section>
                </div>
                <aside className="pt-0 -mr-[0.35rem]">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                </aside>
              </div>
              <div className="w-9/12  sm:w-10/12 px-5 md:px-10">
                <div className="w-full pl-5">
                  <section className="cursor-pointer group w-full -mt-10 border border-solid border-gray-100 hover:border-indigo-200 rounded-2xl shadow-md p-5 space-y-1">
                    <p className="font-medium text-sm sm:text-lg text-gray-700">
                      {item?.company}
                    </p>
                    <p className="font-light text-xs sm:text-base text-gray-500">
                      {item?.position}
                    </p>
                    <p className="text-[0.8rem] sm:text-sm text-gray-400 font-normal">
                      {item?.desc}
                    </p>
                  </section>
                </div>
              </div>
            </div>

            {isLastItem ? null : (
              <div className="w-full flex flex-row h-20">
                <div className="w-3/12 sm:w-2/12  flex justify-end border-r-2 border-solid border-indigo-400"></div>
                <div className="w-9/12 sm:w-10/12 p-5"></div>
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default Experience;
