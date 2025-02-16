import { ES3Folder } from "@/constants";
import { getUploadUrlAction } from "@/server-actions/s3-actions";
import { TUploadedFile, TUseRcUploadParams } from "@/types/form";
import { RcFile } from "rc-upload/lib/interface";
import { useCallback, useEffect, useState } from "react";

async function uploadFile(file: RcFile): Promise<string | void> {
  try {
    const filename = [new Date().getTime(), file.name].join("-");

    const { success, data } = await getUploadUrlAction(filename);

    if (success) {
      await fetch(data as unknown as string, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      return filename;
    }
  } catch {}
}

export const useRcUpload = <T = TUploadedFile,>(
  params?: Readonly<TUseRcUploadParams<T>>,
) => {
  const [queue, setQueue] = useState<RcFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<T>();

  const processQueue = useCallback(async () => {
    setIsProcessing(true);

    const filename = await uploadFile(queue[0]);

    if (filename) {
      setUploadedFile((prev) => {
        const newFile = { folder: ES3Folder.TMP, filename } as unknown as T;

        if (params?.isMulti && Array.isArray(prev)) {
          return [...prev, newFile] as unknown as T;
        } else {
          return newFile;
        }
      });
    }

    setQueue((prev) => prev.slice(1));

    setIsProcessing(false);
  }, [params?.isMulti, queue]);

  const action = useCallback((file: RcFile) => {
    setQueue((prev) => [...prev, file]);

    return "";
  }, []);

  useEffect(() => {
    if (queue.length > 0 && !isProcessing) {
      processQueue();
    }
  }, [queue, isProcessing, processQueue]);

  useEffect(() => {
    if (params?.defaultValue) {
      setUploadedFile(params?.defaultValue);
    }
  }, [params?.defaultValue]);

  return {
    isProcessing,
    uploadedFile,
    action,
  };
};
