"use client";
import React from "react";
import { Button } from "./ui/button";
import { FiSearch } from "react-icons/fi";
import { SelectOptionType } from "@/types";
import SelectField from "./base/select.field";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      country: "",
      type: "",
      product: "",
    },
    onSubmit: (values) => {
      if (!values.product) {
        router.push("/banks");
      } else {
        router.push("/" + values.product);
      }
    },
  });
  const products: SelectOptionType[] = [
    { label: "Account", value: "accounts" },
    { label: "Card", value: "cards" },
    { label: "ATMs", value: "atms" },
    { label: "Loan", value: "loans" },
  ];
  const type: SelectOptionType[] = [
    { label: "Banks", value: "bank" },
    { label: "Microfinance", value: "microfinance" },
  ];

  const country: SelectOptionType[] = [{ label: "Cameroon", value: "CM" }];

  return (
    <section className="bg-gray-100">
      <div className="container px-6 py-16 mx-auto text-center ">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-5xl">
            Where you go for bank
          </h1>

          <p className="mt-2 mb-5 text-gray-500 dark:text-gray-300 text-medium lg:text-large">
            Find the right bank and services based on
            <span className="text-primary">2,524+</span> real reviews.
          </p>
          <div className="flex gap-4">
            <SelectField
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              options={country}
              placeholder="Country"
            />
            <SelectField
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              options={type}
              placeholder="Institution"
            />
            <SelectField
              name="product"
              value={formik.values.product}
              onChange={formik.handleChange}
              options={products}
              placeholder="Bank products"
            />
            <Button onClick={formik.submitForm}>
              <FiSearch fontSize="18px" /> Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
