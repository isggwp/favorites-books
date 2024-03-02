import React from "react";
import Select from "react-select";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@hookform/error-message";

import { useRouter } from "next/router";

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

  return <></>;
}

const HEADERS = {
  key: "76043817efae4057a5eaf0232cdd8d2b",
};

const BASE_URL = "https://api.rajaongkir.com/starter";
