import { Header } from "@/components/atoms/header";
import { useBgImage } from "@/libs/hooks/useBgImage";
import { TBanner } from "@/types/banner";
import React from "react";

export const HeroBanner: React.FC<Readonly<TBanner>> = ({
  url,
  header,
  description,
  buttons,
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
      className="flex flex-col items-center justify-center text-white gap-4"
    >
      <Header level={1}>{header}</Header>

      {description && <p>{description}</p>}

      {buttons && buttons.length > 0 && (
        <div className="flex gap-2 items-center">
          {buttons.map((btn) => btn)}
        </div>
      )}
    </div>
  );
};
