import React from "react";
import FigureCard from "./components/common/FigureCard";
import Link from "next/link";
import SkillsCard from "./components/common/SkillsCard";
import Experience from "./components/common/Experience";
import ExpList from "./staticData/ExpList";
import { Metadata } from "next";


export const metadata: Metadata = {
title: 'Indra Susila Personal Site',
description: 'As a seasoned Frontend Engineer, I take pleasure in aiding companies to reach their maximum potential.'
}

export default function Home() {
  return (
      <div className="flex flex-col lg:flex-row items-start pt-0 lg:pt-10 pb-40 justify-center w-full  h-auto overflow-hidden bg-white">
        <div className="w-full lg:w-5/12 flex flex-col pt-0 pb-2">
          <FigureCard />

          <SkillsCard />
        </div>

        <div className="w-full lg:w-7/12 pt-32 lg:pt-10">
          <Experience data={ExpList} />
        </div>

        <Link href="/portofolio">
          <div className="fixed bottom-6 right-6 md:bottom-14 md:right-12">
            <button className="py-3 px-6 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-700 text-white tracking-widest text-xs">
              Portofolio
            </button>
          </div>
        </Link>
      </div>
  );
}
