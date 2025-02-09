import { Button } from "@/components/atoms/button";
import { BaseInput } from "@/components/molecules/form-tags/base-input";
import { BaseSelect } from "@/components/molecules/form-tags/base-select";
import { EButtonType } from "@/constants";
import React from "react";

const SORT_DIRECTION_OPTIONS = [
  {
    value: "asc",
    label: "Ascending",
  },
  {
    value: "desc",
    label: "Descending",
  },
];

const PRODUCT_ORDER_BY = [
  { value: "title", label: "Title" },
  { value: "description", label: "Product Description" },
  { value: "publishDate", label: "Publish Date" },
];

export default function SearchBox() {
  return (
    <div className="flex gap-4 items-center px-2 py-4">
      <div className="flex gap-2 w-1/3">
        <BaseInput
          className="w-full"
          placeholder="Search post label, description ..."
        />
        <Button variant={EButtonType.primary}>Search</Button>
      </div>

      <div className="w-2/3 flex gap-2">
        <div className="flex gap-2 items-center w-1/2">
          <span className="whitespace-nowrap">Order by:</span>
          <BaseSelect className="w-full" options={PRODUCT_ORDER_BY} label="" />
        </div>

        <div className="flex gap-2 items-center w-1/2">
          <span className="whitespace-nowrap">Order value:</span>
          <BaseSelect
            className="w-full"
            options={SORT_DIRECTION_OPTIONS}
            label=""
          />
        </div>
      </div>
    </div>
  );
}
