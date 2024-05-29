import React, { Fragment, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Header from "@/components/common/Header";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  MaterialEye,
  MaterialSymbolsDelete,
  MaterialSymbolsEdit,
} from "@/components/common/icon";

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

      <main className="w-full py-2 lg:py-10 lg:w-7/12 max-w-[900px]">
        <Table>
          <TableHeader className="sticky">
            <TableRow>
              <TableHead className="w-[70px]">Id</TableHead>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[150px]">Username</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="mx-auto flex justify-center items-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-muted cursor-pointer">
              <TableCell className="font-medium w-[70px]">01</TableCell>
              <TableCell className="font-medium w-[80px] justify-center mx-auto items-center">
                <Image
                  className="rounded-full mx-auto items-center justify-center flex"
                  src="https://picsum.photos/50/50"
                  alt="avatar"
                  width={30}
                  height={30}
                />
              </TableCell>

              <TableCell className="min-w-[200px] w-[200px] truncate">
                Pandi Bakaro sadja
              </TableCell>
              <TableCell className="min-w-[150px] w-[150px]">
                Sudarmaji182
              </TableCell>
              <TableCell className="min-w-[200px] w-[200px]">
                Sudarmajihutomo@gmail.com
              </TableCell>
              <TableCell className="w-auto">
                <section className="w-full flex justify-center items-center space-x-2 h-full">
                  <MaterialEye />
                  <MaterialSymbolsEdit />
                  <MaterialSymbolsDelete className="text-red-500" />
                </section>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="py-20"></div>
      </main>
    </Fragment>
  );
}
