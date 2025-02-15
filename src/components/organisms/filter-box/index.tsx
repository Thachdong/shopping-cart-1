import { Header } from "@/components/atoms/header";
import { Tag } from "@/components/atoms/tag";
import React from "react";

const collections = ["Best seller", "Summer collection", "Autum collection"];

const priceRanges = [
  "> 50.000",
  "50.000 ~ 100.000",
  "100.000 ~ 200.000",
  "200.000 ~ 300.000",
  "300.000 ~ 400.000",
  "400.000 ~ 500.000",
  "< 500.000",
];

const colors = ["gray", "red", "green", "blue", "dark blue"];

const tags = ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5", "tag 6"];

export const FilterBox: React.FC = () => {
  return (
    <div className="border-r border-gray-300 px-2 max-w-[175px]">
      <Header level={5}>Collections:</Header>

      <div className="flex flex-col gap-2">
        {collections.map((coll, index) => (
          <label key={index}>
            <input className="mr-2" type="checkbox" />
            {coll}
          </label>
        ))}
      </div>

      <hr className="border-gray-300 my-2" />

      <Header level={5}>Prices:</Header>

      <div className="flex flex-col gap-2">
        {priceRanges.map((range, index) => (
          <label key={index}>
            <input className="mr-2" type="checkbox" />
            {range}
          </label>
        ))}
      </div>

      <hr className="border-gray-300 my-2" />

      <Header level={5}>Colors:</Header>

      <div className="flex flex-col gap-2">
        {colors.map((color, index) => (
          <label key={index}>
            <input className="mr-2" type="checkbox" />
            {color}
          </label>
        ))}
      </div>

      <hr className="border-gray-300 my-2" />

      <Header level={5}>Tags:</Header>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <Tag content={tag} key={index} />
        ))}
      </div>
    </div>
  );
};
