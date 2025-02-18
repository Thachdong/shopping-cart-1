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

  /**
   * @param
   * @returns UploadedFile || void
   * @body:
   * Toggle processing flag
   * Processing queue
   */
  const processQueue = useCallback(async () => {
    setIsProcessing(true);

    const filename = await uploadFile(queue[0]);

    if (filename) {
      setUploadedFile((prev) => {
        const newFile = {
          folder: ES3Folder.TMP,
          filename,
          id: new Date().getTime(),
        } as unknown as T;

        if (params?.isMulti) {
          const files = Array.isArray(prev) ? [...prev] : [];
          return [...files, newFile] as unknown as T;
        } else {
          return newFile;
        }
      });
    }

    setQueue((prev) => prev.slice(1));

    setIsProcessing(false);
  }, [params?.isMulti, queue]);

  /**
   * Adds a file to the upload queue.
   *
   * @param {RcFile} file - The file to be added to the queue.
   * @returns {string} An empty string.
   */
  const action = useCallback((file: RcFile) => {
    setQueue((prev) => [...prev, file]);

    return "";
  }, []);

  /**
   * Removes the currently uploaded file by setting the uploaded file state to undefined.
   * This function is memoized using `useCallback` to ensure that it does not get recreated
   * on every render, which can help with performance optimizations.
   *
   * @function
   * @name removeSingleFile
   */
  const removeSingleFile = useCallback(() => {
    setUploadedFile(undefined);
  }, []);

  /**
   * Removes a file from the uploaded files list by its ID.
   *
   * @param {number} id - The ID of the file to be removed.
   * @returns {void}
   */
  const removeFileById = useCallback((id: number) => {
    setUploadedFile((prev) => {
      if (Array.isArray(prev)) {
        return prev.filter((file) => file.id !== id) as T;
      } else {
        return prev;
      }
    });
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
    removeFileById,
    removeSingleFile,
  };
};
