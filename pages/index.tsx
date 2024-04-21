import React, { Fragment } from "react";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@hookform/error-message";
import dynamic from "next/dynamic";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const SelectComponent = dynamic(
  () => import("@/components/common/SelectComponent"),
  {
    ssr: false,
  }
);

const sortOptions: OptionType[] = [
  { value: "ASC", label: "Asc" },
  { value: "DESC", label: "Desc" },
];

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useRouter } from "next/router";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface IFormInput {
  weight: number;
  base_province: string;
  base_city: string;
  dest_province: string;
  dest_city: string;
}

export default function Home({ provinceList, cityList, result }: any) {
  const router = useRouter();

  console.log("hai ini provinsi", {
    provinceList,
    cityList,
    result,
  });

  const provOptions = provinceList?.rajaongkir?.results?.map((item: any) => {
    return {
      value: item.province_id,
      label: item.province,
    };
  });

  const cityOptions = cityList?.rajaongkir?.results?.map((item: any) => {
    return {
      value: item.city_id,
      label: item.city_name,
      province_id: item.province_id,
    };
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    router.push({
      pathname: "/",
      query: {
        origin: data.base_city.value,
        destination: data.dest_city.value,
        weight: data.weight,
      },
    });
  };

  const watchBaseProv: any = watch("base_province");
  const watchDestProv: any = watch("dest_province");

  const baseCityOptions = cityOptions?.filter(
    (item: any) => item.province_id === watchBaseProv?.value
  );

  const destCityOptions = cityOptions?.filter(
    (item: any) => item.province_id === watchDestProv?.value
  );

  const price: number = result
    ? parseInt(result.rajaongkir.results[0].costs[0].cost[0].value, 10)
    : 0;

  return (
    <Fragment>
      <Drawer direction="right">
        <header className="z-[110] fixed top-0 right-0 left-0 bg-white/85 w-full h-20 backdrop-blur-sm border-slate-50 border-b-[1.4px] shadow-sm">
          <div className="relative  w-full mx-auto h-20 z-100 ">
            <div className="absolute w-full  h-full">
              <div className="flex w-full flex-row max-w-[1400px]  mx-auto justify-between space-x-5 px-5 h-full items-center lg:items-between ">
                <section className="flex z-100 w-6/12 md:w-2/12 flex-row items-center cursor-pointer group">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                        style={{
                          fill: "#000000",
                          fillOpacity: 1,
                          stroke: "none",
                        }}
                      ></path>{" "}
                    </g>
                  </svg>

                  <h1 className="text-lg ml-3 lg:text-2xl text-gray-700 font-light tracking-widest ">
                    kwitangpedia
                  </h1>
                </section>

                <section className="mx-auto gap-3 hidden md:flex justify-center items-center w-8/12">
                  <input
                    type="text"
                    placeholder="Enter Interested Book here.."
                    className="w-10/12 lg:w-7/12 focus:w-full px-4 lg:px-6 py-2 rounded-full border-2 border-gray-300  transition-all duration-300 focus:outline-none focus:border-indigo-200"
                  />
                </section>

                <section className="w-1/12 h-20 justify-end  relative flex-row ">
                  <DrawerTrigger className="w-full relative h-full">
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
                  </DrawerTrigger>
                </section>
              </div>
            </div>
          </div>
        </header>

        <section className="w-full flex flex-row gap-0 lg:gap-10   justify-center mx-auto">
          <aside className="hidden sticky top-28 h-[77vh]  w-2/12 lg:flex flex-col">
            <p className="mb-4">Price</p>
            <Slider defaultValue={[33]} max={50000} step={1} />
            <span className="flex flex-rot mt-2 justify-between">
              <p className="mb-4 text-[0.6rem] font-light text-gray-900">0</p>
              <p className="mb-4 text-[0.6rem] font-light text-gray-700">
                50000
              </p>
            </span>

            <SelectComponent placeholder="Order by" options={sortOptions} />
          </aside>
          <section className="grid w-full px-1 grid-cols-2 md:grid-cols-4 gap-2  md:gap-10 mx-auto justify-between h-auto overflow-y-auto">
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className=" w-full flex flex-col ring-[1px] ring-slate-200 aspect-[100/190] cursor-pointer "
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <div className="absolute top-2 right-2 z-10">
                            <svg
                              className="hover:scale-110 transition-all duration-200"
                              width="32px"
                              height="32px"
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
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                  fill="#1C274C"
                                ></path>{" "}
                              </g>
                            </svg>
                            {/* <svg
                      className="hover:scale-110 transition-all duration-200"
                      width="35px"
                      height="35px"
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
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.54497 8.73005C2 9.79961 2 11.1997 2 14C2 16.8003 2 18.2004 2.54497 19.27C3.02433 20.2108 3.78924 20.9757 4.73005 21.455C5.79961 22 7.19974 22 10 22H14C16.8003 22 18.2004 22 19.27 21.455C20.2108 20.9757 20.9757 20.2108 21.455 19.27C22 18.2004 22 16.8003 22 14C22 11.1997 22 9.79961 21.455 8.73005C20.9757 7.78924 20.2108 7.02433 19.27 6.54497C18.2004 6 16.8003 6 14 6H10C7.19974 6 5.79961 6 4.73005 6.54497C3.78924 7.02433 3.02433 7.78924 2.54497 8.73005ZM15.0595 12.4995C15.3353 12.1905 15.3085 11.7164 14.9995 11.4406C14.6905 11.1647 14.2164 11.1915 13.9406 11.5005L10.9286 14.8739L10.0595 13.9005C9.78359 13.5915 9.30947 13.5647 9.0005 13.8406C8.69152 14.1164 8.66468 14.5905 8.94055 14.8995L10.3691 16.4995C10.5114 16.6589 10.7149 16.75 10.9286 16.75C11.1422 16.75 11.3457 16.6589 11.488 16.4995L15.0595 12.4995Z"
                          fill="#000"
                        ></path>{" "}
                        <path
                          d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                          fill="#000"
                        ></path>{" "}
                      </g>
                    </svg> */}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent align="end">
                        <p className="text-xs">Bookmark this book</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="aspect-[100/130] w-full ">
                    <Image
                      src="/common/bestcat.jpeg"
                      alt="image of cat"
                      width="100"
                      height="120"
                      className="w-full h-auto aspect-[100/130] bg-cover object-cover "
                    />
                  </div>
                  <div className="w-full  aspect-[100/60] p-3 space-y-3 items-start">
                    <p className="font-bold text-base line-clamp-2 text-gray-600">
                      Title of Book lore, insum klaksd klasdj aklsdj akjsdkas l
                    </p>
                    <p className="font-medium text-blue-900">Rp 12.000</p>
                    <p className="font-light text-sm line-clamp-2 text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vitae reiciendis architecto quo tenetur temporibus culpa
                      veritatis laboriosam deserunt magni eaque incidunt aliquid
                      cumque sed esse, facilis debitis quisquam ad molestiae.
                    </p>
                  </div>
                </div>
              ))}
          </section>
          {/* <section className="w-8/12   h-[77vh] sticky top-28 ">
          <div></div>
        </section> */}
        </section>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="" href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* FAB */}
        <div className="fixed bottom-16 right-10 z-[120] lg:hidden bg-white w-12 h-12 rounded-full">
          <svg
            className="relative cursor-pointer rotate-90 opacity-65 hover:opacity-90 hover:rotate-180 transition-all duration-300 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 "
            width="24px"
            height="24px"
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
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 10.5A3.502 3.502 0 0 0 18.355 8H21a1 1 0 1 0 0-2h-2.645a3.502 3.502 0 0 0-6.71 0H3a1 1 0 0 0 0 2h8.645A3.502 3.502 0 0 0 15 10.5zM3 16a1 1 0 1 0 0 2h2.145a3.502 3.502 0 0 0 6.71 0H21a1 1 0 1 0 0-2h-9.145a3.502 3.502 0 0 0-6.71 0H3z"
                fill="#000000"
              ></path>
            </g>
          </svg>
        </div>

        {/* Mobile Filter */}
        {/* <div className="w-full bg-transparent h-auto z-[120] fixed lg:h-0 bottom-0 left-4 -translate-x-4 right-4">
        <div className="flex space-y-4 flex-col justify-start px-4 pt-5 bg-white/90 ring-1 ring-slate-200 backdrop-blur-sm h-full py-4">
          <input
            type="text"
            placeholder="Search here.."
            className="w-6/12 h-9 focus:w-full text-sm px-2  py-2 rounded-full border-2 border-gray-300  transition-all duration-300 focus:outline-none focus:border-indigo-200"
          />
          <div className="animate-bounce absolute -top-4 right-4 bg-slate-600 rounded-full">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M8 10L12 14L16 10"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="text-xs py-0 border-none text-gray-400 italic font-medium">
                Advenced Search
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-7">
                <p className="mb-4 text-xs font-medium text-gray-500">Price</p>
                <Slider defaultValue={[33]} max={50000} step={1} />
                <span className="flex flex-rot mt-2 justify-between">
                  <p className="mb-4 text-[0.6rem] font-light text-gray-900">
                    0
                  </p>
                  <p className="mb-4 text-[0.6rem] font-light text-gray-700">
                    50000
                  </p>
                </span>

                <SelectComponent placeholder="Order by" options={sortOptions} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button className="h-8 text-xs rounded-full bg-gray-800">
            Search
          </Button>
        </div>
      </div> */}

        <DrawerContent className="w-full h-8/12 bg-white">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
