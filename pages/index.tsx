import React, { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Header from "@/components/common/Header";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IFormInput {
  url: string;
}

export default function Home() {
  const router = useRouter();

  const [inputHeight, setInputHeight] = useState("h-[50vh]");

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      setInputHeight("h-20");
    }
  };

  return (
    <Fragment>
      <Header />

      <main>
        {/* Main input Section */}
        <section
          className={cn([
            inputHeight,
            "transition-all duration-300 ease-in-out w-full flex flex-row items-center justify-center mx-auto",
          ])}
        >
          <input
            type="text"
            // onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter for your website here"
            className="w-10/12 h-12 lg:w-4/12 focus:w-7/12 px-4 lg:px-6 py-2 rounded-full border-2 border-gray-300  transition-all duration-300 focus:outline-none focus:border-indigo-200"
          />
        </section>

        {/* Inspection Result */}
        <section className="w-full flex flex-col">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="font-normal text-sm"> Is it accessible?</p>
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </Fragment>
  );
}
