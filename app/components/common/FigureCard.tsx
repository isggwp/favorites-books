import Image from "next/image";
import { Icon } from "@iconify-icon/react";
const FigureCard = () => {
  return (
    <figure className="cursor-pointer flex flex-col justify-center items-start sticky bg-gradient-to-r from-gray-700 to-indigo-600 pt-8 pb-8 px-10 rounded-3xl w-full sm:w-[400px]">
      <div className="flex flex-row ">
        <div className="relative w-16 h-16">
          <Image
            alt="profile pic"
            width="64"
            height="64"
            src="/common/isggwp-photo.png"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="px-3 py-1">
          <p className="font-normal text-gray-50 text-xl">Indra Susila</p>
          <p className="font-light text-gray-200 text-sm sm:text-base">
            Frontend Engineer
          </p>
        </div>
      </div>

      <div className="flex flex-row mt-5 gap-3 items-center justify-start">
        <a href="https://twitter.com/isggwp" target="_blank">
          <Image
            src="/common/twitter-logoz.svg"
            alt="twitter logo"
            width="30"
            height="30"
            className="text-gray-200 w-[0.75rem] h-auto hover:scale-125 transition-transform duration-300 hover:text-white"
          />
        </a>
        <a href="https://www.linkedin.com/in/indra-susila/" target="_blank">
          <Image
            src="/common/linked-logoz.svg"
            alt="linkedin"
            width="27"
            height="27"
            className="text-gray-200 w-[0.75rem] h-auto hover:scale-125 transition-transform duration-300 hover:text-white"
          />
        </a>

        <a href="https://gitlab.com/indra46" target="_blank">
          <Image
            src="/common/gitlab-logoz.svg"
            alt="gitlab logo"
            width="30"
            height="30"
            className="text-gray-200 w-4 h-auto hover:scale-125 transition-transform duration-300 hover:text-white"
          />

          <Icon
            icon="mdi:gitlab"
            className="text-gray-200 w-7 h-7 hover:scale-125 transition-transform duration-300 hover:text-white"
          />
        </a>
      </div>
    </figure>
  );
};

export default FigureCard;
