import { TUploadedFile } from "./form";
import { ImageProps } from "next/image";

type TS3ImageProps = Omit<ImageProps, "src"> & {
  image: TUploadedFile;
};
