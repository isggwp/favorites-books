import React, { Fragment, useState, useEffect } from "react";
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IFormInput {
  url: string;
}

export default function Home() {
  const router = useRouter();

  const [inputHeight, setInputHeight] = useState("h-[50vh]");
  const [HtmlValue, setHtmlValue] = useState("");

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

  useEffect(() => {
    async function getData() {
      const raw = await fetch(
        "http://localhost:3000/api/scan?url=https://otospector.co.id/"
      );
      const datanya = await raw.json();
      console.log("datanya", datanya);

      setHtmlValue(datanya?.data?.html);
    }
    try {
      getData();
    } catch (error) {}
  }, []);

  return (
    <Fragment>
      <Header />

      <main className="w-full lg:w-7/12 max-w-[900px]">
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
            className="w-10/12 h-12 lg:w-7/12 focus:w-full px-4 lg:px-6 py-2 rounded-full border-2 border-gray-300  transition-all duration-300 focus:outline-none focus:border-indigo-200"
          />
        </section>

        <div className="w-full debug-red h-[500px]">
          <textarea
            maxLength={10000}
            className="w-full max-h-[500px] h-full overflow-y-auto"
            value={HtmlValue}
            disabled
          />
        </div>

        {/* Inspection Result */}
        <section className="w-full flex flex-col justify-center mx-auto">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mx-auto flex justify-center">
              <TabsTrigger
                className="data-[state=active]:border-b-[1px] data-[state=active]:border-b-slate-500"
                value="seo"
              >
                SEO
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[1px] data-[state=active]:border-b-slate-500"
                value="security"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-[1px] data-[state=active]:border-b-slate-500"
                value="stack"
              >
                Tech Stack
              </TabsTrigger>
            </TabsList>
            <TabsContent value="seo">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row space-x-3 items-center">
                      <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                      <p className="font-normal text-sm">
                        Title of the Accordion
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-50 px-6 py-3">
                    <div className="flex flex-col w-full">
                      <p className="font-normal text-gray-800 text-sm">
                        Details Description
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="security">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row space-x-3 items-center">
                      <span className="w-3 h-3 bg-yellow-600 rounded-full"></span>
                      <p className="font-normal text-sm">
                        Title of the Security Task
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-indigo-50 px-6 py-3">
                    <div className="flex flex-col w-full">
                      <p className="font-normal text-gray-800 text-sm">
                        Details Security Description
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="stack">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex flex-row space-x-3 items-center">
                      <span className="w-3 h-3 bg-yellow-600 rounded-full"></span>
                      <p className="font-normal text-sm">
                        Title of the Tech Task
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-indigo-50 px-6 py-3">
                    <div className="flex flex-col w-full">
                      <p className="font-normal text-gray-800 text-sm">
                        Details Tech Stack Description
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </section>

        <div className="py-20"></div>
      </main>
    </Fragment>
  );
}
