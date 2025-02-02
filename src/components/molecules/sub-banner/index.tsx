import { Header } from "@/components/atoms/header";
import { useBgImage } from "@/libs/hooks/useBgImage";
import { TBanner } from "@/types/banner";
import React from "react";

export const SubBanner: React.FC<Readonly<TBanner>> = ({
  url,
  header,
  height,
  width,
}) => {
  const bgImageStyle = useBgImage(url);

  const containerStyle: React.CSSProperties = {};

  if (height) {
    containerStyle.height = height;
  }

  if (width) {
    containerStyle.width = width;
  }

  return (
    <div
      style={{ ...bgImageStyle, ...containerStyle }}
      className="flex flex-col justify-end text-white p-4"
    >
      <Header level={2}>{header}</Header>
    </div>
  );
};
