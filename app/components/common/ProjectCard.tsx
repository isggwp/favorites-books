"use client";

import { Fragment } from "react";
import { Icon } from "@iconify-icon/react";
import Tags from "./Tags";
import Image from "next/image";

type CardProps = {
  key: string | number;
  image: string;
  video: string;
  title: string;
  link: string;
  tags: string[];
};
export function ProjectCard({ key, image, video, title, tags, link }: CardProps) {
  return (
    <Fragment key={key}>
      <a href={link} target="_blank">
        <div className="relative group cursor-pointer hover: p-0 bg-white border border-solid border-gray-300 hover:border-indigo-300 flex flex-col rounded-2xl">
          <div className="top-0 bottom-0 right-0 left-0 group-hover:hidden absolute bg-gradient-to-t  from-indigo-500/20 to-transparent z-40 w-full h-full rounded-2xl"></div>
          <div className="w-full aspect-[100/45]">
            <div className="aspect-[100/45] relative animate-fade w-full h-full hidden md:flex md:group-hover:hidden">
              <Image
                width="200"
                height="90"
                className="rounded-tl-2xl rounded-tr-2xl w-full h-auto"
                src={image}
                alt={title}
              />
            </div>

            <div className="relative  flex md:hidden animate-fade md:group-hover:flex w-full h-full">
              <video
                autoPlay
                loop
                muted
                className="aspect-[100/45] rounded-tl-2xl h-full rounded-tr-2xl"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="w-full py-4 px-3 justify-start items-start flex gap-2 pb-4 flex-col">
            <p className="font-bold text-gray-600 text-xs truncate">{title}</p>

            <Tags tags={tags} />
          </div>
          <Icon
            className=" text-lg absolute bottom-5 right-3 cursor-pointer text-gray-500 hover:text-indigo-500"
            icon="mdi:eye"
          />
        </div>
      </a>
    </Fragment>
  );
}
