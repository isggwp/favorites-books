import Image from "next/image";
export default function Header() {
  return (
    <header className="z-[110] fixed top-0 right-0 left-0 bg-white/85 w-full h-auto backdrop-blur-sm border-slate-50 border-b-[1.4px] shadow-sm">
      <div className="relative  w-full mx-auto h-20 z-100 ">
        <div className="absolute w-full  h-full">
          <div className="flex w-full flex-row max-w-[1400px]  mx-auto justify-between space-x-5 px-5 h-full items-center lg:items-between ">
            <section className="flex z-100 w-6/12 md:w-2/12 flex-row items-center cursor-pointer group">
              <Image
                alt="fallbacker official logo"
                src="/fallbacker-logo.svg"
                width={20}
                height={5}
              />
              <h1 className="text-2xl font-medium font-sans pl-3">
                Fallbacker
              </h1>
            </section>

            <section className="mx-auto gap-3 hidden md:flex justify-center items-center w-8/12"></section>

            <section className="w-1/12 h-20 justify-end  relative flex-row ">
              <div className="absolute h-full group w-auto top-0 right-0">
                <svg
                  className="absolute right-0  h-full group-hover:rotate-90 group-hover:opacity-0  cursor-pointer transition-all duration-300"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Menu / Menu_Duo_LG">
                      {" "}
                      <path
                        id="Vector"
                        d="M3 15H21M3 9H21"
                        stroke="#000000"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <svg
                  className="absolute right-0 h-full opacity-0 -rotate-90 group-hover:rotate-180 group-hover:opacity-100 cursor-pointer transition-all duration-300"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M20 12H4M4 12L10 6M4 12L10 18"
                      stroke="#1C274C"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            </section>
          </div>
        </div>
      </div>
    </header>
  );
}
