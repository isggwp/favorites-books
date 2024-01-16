"use client"


import React from "react";
import ShuffleHero from "@/components/common/ShuffleHero";
import { ProjectCard } from "@/components/common/ProjectCard";
import projectList from "@/staticData/projectlist";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full  overflow-hidden bg-white">
      <ShuffleHero />

      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-between py-10">
        {
          projectList.map((item, index) => {
            return <ProjectCard
              link={item.link}
              key={index}
              title={item.title}
              image={item.image}
              video={item.video}
              tags={item.tags}
            />
          })
        }
      
      </div>

      <Link href="/">
        <div className="fixed bottom-6 right-6 md:bottom-14 md:right-12">
          <button className="py-2 px-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-700 text-white tracking-widest text-xs">
            INI ABOUT
          </button>
        </div>
      </Link>


    </div>
  );
}
