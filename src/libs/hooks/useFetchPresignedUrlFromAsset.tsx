import { getFetchUrlAction } from "@/server-actions/s3-actions";
import { TUploadedFile } from "@/types/form";
import { useCallback, useEffect, useState } from "react";

export const useFetchPresignedUrlFromAsset = (uploadedFile?: TUploadedFile) => {
  const [url, setUrl] = useState("");

  const fetchPresignedUrl = useCallback(async () => {
    if (uploadedFile) {
      const { success, data } = await getFetchUrlAction(
        [uploadedFile.folder, uploadedFile.filename].join("/"),
      );

      if (success) {
        setUrl(data as string);
      }
    } else {
      setUrl("");
    }
  }, [uploadedFile]);

  useEffect(() => {
    fetchPresignedUrl();
  }, [fetchPresignedUrl]);

  return url;
};
