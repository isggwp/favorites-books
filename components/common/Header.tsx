import Image from "next/image";
import { MaterialSymbolsMenu } from "./icon";
export default function Header() {
  return (
    <header className="z-[110] fixed top-0 right-0 left-0 bg-white/85 w-full h-auto backdrop-blur-sm border-slate-50 border-b-[1.4px] shadow-sm">
      <div className="relative  w-full mx-auto h-20 z-100 ">
        <div className="absolute w-full  h-full">
          <div className="flex w-full flex-row max-w-[1400px]  mx-auto justify-between space-x-5 px-5 h-full items-center lg:items-between ">
            <section className="flex z-100 w-6/12 md:w-2/12 flex-row items-center cursor-pointer group">
              <h1 className="text-base font-bold italic font-sans pl-3">
                Crud
              </h1>
            </section>

            <section className="mx-auto gap-3 hidden md:flex justify-center items-center w-8/12"></section>

            <section className="w-auto h-20 flex justify-center items-center relative flex-row ">
              <div className="justify-end items-center">
                {/* IMAGE */}
                <MaterialSymbolsMenu className="w-6 h-6" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </header>
  );
}
