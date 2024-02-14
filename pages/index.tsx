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

  return (
    <>
      <h1 className="text-lg lg:text-xl mt-10 text-purple-950 font-bold italic">
        Cari tau ongkos kirim mu
      </h1>

      <section className="w-full flex flex-col lg:flex-row mt-10 gap-6">
        <form
          className="flex flex-col gap-3 w-full lg:w-7/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="w-full flex flex-col space-x-0 lg:space-x-4 lg:flex-row cursor-pointer">
            <div className="w-full lg:w-6/12 space-y-4 bg-gradient-to-t from-blue-50 to-gray-50 p-5">
              <h2 className="text-sm font-bold tracking-wider text-gray-800">
                Tempat Asal <strong className="text-red-500 text-xs">*</strong>
              </h2>

              <Controller
                control={control}
                name="base_province"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    isClearable
                    options={provOptions as OptionType[] | any}
                    placeholder="Provinsi Asal"
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="text-sm font-light"
                    value={value}
                  />
                )}
                rules={{
                  required: "Provinsi asal wajib diisi",
                }}
              />
              <ErrorMessage
                errors={errors}
                name="base_province"
                render={({ message }) => (
                  <p className="text-red-500 italic text-xs">{message}</p>
                )}
              />

              <Controller
                control={control}
                name="base_city"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    isClearable
                    options={baseCityOptions as OptionType[] | any}
                    className="text-sm font-light"
                    placeholder="Kota Asal"
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                rules={{
                  required: "kotal asal wajib diisi",
                }}
              />
              <ErrorMessage
                errors={errors}
                name="base_city"
                render={({ message }) => (
                  <p className="text-red-500 italic text-xs">{message}</p>
                )}
              />
            </div>

            <div className="w-full lg:w-6/12 space-y-4 bg-gradient-to-t from-indigo-50 to-blue-50 p-5 cursor-pointer">
              <h2 className="text-sm font-bold tracking-wider text-gray-800">
                Tujuan <strong className="text-red-500 text-xs">*</strong>
              </h2>

              <Controller
                control={control}
                name="dest_province"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    isClearable
                    className="text-sm font-light"
                    options={provOptions as OptionType[] | any}
                    placeholder="Provinsi Asal"
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                rules={{ required: "Provinsi tujuan wajib diisi" }}
              />

              <ErrorMessage
                errors={errors}
                name="base_province"
                render={({ message }) => (
                  <p className="text-red-500 italic text-xs">{message}</p>
                )}
              />

              <Controller
                control={control}
                name="dest_city"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    isClearable
                    options={destCityOptions as OptionType[] | any}
                    placeholder="Kota Asal"
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="text-sm font-light"
                    value={value}
                  />
                )}
                rules={{ required: "Kota tujuan wajib diisi" }}
              />

              <ErrorMessage
                errors={errors}
                name="dest_city"
                render={({ message }) => (
                  <p className="text-red-500 italic text-xs">{message}</p>
                )}
              />
            </div>
          </section>

          {/* SECTION WEIGHT */}
          <section className="w-full ">
            <div className="w-full lg:w-6/12 space-y-4 bg-gradient-to-r from-gray-100 to-transparent p-5 cursor-pointer">
              <Controller
                control={control}
                name="weight"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    className="rounded-s-none text-sm p-2 text-gray-400 rounded-tr-full rounded-br-full"
                    type="number"
                    placeholder="Berat dalam gram"
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                rules={{
                  required: "Berat wajib diisi",
                }}
              />

              <ErrorMessage
                errors={errors}
                name="weight"
                render={({ message }) => (
                  <p className="text-red-500 italic text-xs">{message}</p>
                )}
              />
            </div>
          </section>

          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1 hover:bg-gradient-to-tr hover:from-indigo-700 hover:to-purple-700 rounded-br-full rounded-tr-full"
            type="submit"
          >
            Hitung
          </Button>
        </form>
        <div className="w-full lg:w-5/12 bg-indigo-50 py-8 lg:py-0 flex items-center justify-center flex-col cursor-pointer hover:bg-blue-50/80">
          <p className="font-medium text-gray-500 text-base py-2">
            Ongkos kirim nya adalah
          </p>
          <p className="text-4xl tracking-wider font-bold text-indigo-900">
            Rp {price.toLocaleString()}
          </p>
        </div>
      </section>
    </>
  );
}

const HEADERS = {
  key: "76043817efae4057a5eaf0232cdd8d2b",
};

const BASE_URL = "https://api.rajaongkir.com/starter";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { destination, weight } = query;

  const origin = query.origin;

  console.log("origin -->", origin);
  // GET PROVINCE
  const rawProvinceList = await fetch(`${BASE_URL}/province`, {
    method: "GET",
    headers: HEADERS,
  });
  const provinceList = await rawProvinceList.json();

  // GET CITY
  const rawCityList = await fetch(`${BASE_URL}/city`, {
    method: "GET",
    headers: HEADERS,
  });
  const cityList = await rawCityList.json();

  // RESULT
  const rawResult: any =
    origin && destination && weight
      ? await fetch(`${BASE_URL}/cost`, {
          method: "POST",
          headers: {
            key: HEADERS.key,
            "content-type": "application/x-www-form-urlencoded",
          },
          // @ts-ignoresE
          body: new URLSearchParams({
            origin: origin ? origin : "501",
            destination: destination ? destination : "114",
            weight: weight ? weight : "900",
            courier: "jne",
          }).toString(),
        })
      : null;

  const result = rawResult ? await rawResult.json() : null;

  return { props: { provinceList, cityList, result } };
};
