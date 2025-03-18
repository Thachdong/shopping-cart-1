"use client";
import { getFetchUrlAction } from "@/server-actions/s3-actions";
import { TUploadedFile } from "@/types/form";
import { useCallback, useEffect, useState } from "react";

export const useFetchPresignedUrlFromAsset = (
  uploadedFiles: TUploadedFile[],
) => {
  const [urls, setUrls] = useState<string[]>([]);

  const fetchPresignedUrl = useCallback(async () => {
    const promises = await Promise.all(
      uploadedFiles.map((file) =>
        getFetchUrlAction([file.folder, file.filename].join("/")),
      ),
    );

    const presignUrls = promises
      .filter((result) => result.success)
      .map((result) => result.data)
      .filter((url): url is string => typeof url === "string");

    setUrls((prv) => [...prv, ...presignUrls]);
  }, [uploadedFiles]);

  useEffect(() => {
    fetchPresignedUrl();
  }, [fetchPresignedUrl]);

  return [...urls];
};
