"use client";
import React, { useCallback } from "react";
// import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { TBaseEditor } from "@/types/form";
import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";
import {
  getFetchUrlAction,
  getUploadUrlAction,
} from "@/server-actions/s3-actions";
import { ES3Folder } from "@/constants";
import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
import "./index.scss";
import dynamic from "next/dynamic";

const Editor = dynamic(
  //@ts-expect-error: ignore unknow error
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
  },
);

interface BlobInfo {
  id(): string;
  name(): string | undefined;
  filename(): string;
  blob(): Blob;
  base64(): string;
  blobUri(): string;
}

const DEFAULT_PLUGINS = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "code",
  "help",
  "wordcount",
];

const DEFAULT_TOOLBAR =
  "undo redo | blocks | " +
  "bold italic forecolor | alignleft aligncenter " +
  "alignright alignjustify | bullist numlist outdent indent | " +
  "removeformat | help";

const DEFAULT_CONTENT_STYLE = `
  body { font-family:Helvetica,Arial,sans-serif; font-size:14px };
`;

const DEFAULT_INIT_CONFIG: InitOptions = {
  height: 500,
  menubar: false,
  plugins: DEFAULT_PLUGINS,
  toolbar: DEFAULT_TOOLBAR,
  content_style: DEFAULT_CONTENT_STYLE,
};

const DEFAULT_CLASSNAME = "base-editor flex flex-col gap-2";

export const BaseEditor: React.FC<Readonly<TBaseEditor>> = ({
  label,
  error,
  initialValue,
  init,
  value,
  onChange,
  ...editorProps
}) => {
  const editorRef = React.useRef<TinyMCEEditor | null>(null);

  const uploadHandler = useCallback(async (blobInfo: BlobInfo) => {
    try {
      const file = blobInfo.blob();

      const filename = `${new Date().getTime()}-${blobInfo.name}`;

      const { success, data } = await getUploadUrlAction(filename);

      if (success) {
        await fetch(data as string, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        const { data: url } = await getFetchUrlAction(
          [ES3Folder.TMP, filename].join("/"),
        );

        return url as string;
      }

      throw new Error("something went wrong with upload file process!");
    } catch (error) {
      console.log(error);

      return "";
    }
  }, []);

  return (
    <label className={joinClass(DEFAULT_CLASSNAME)}>
      {label}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TinyMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        value={value}
        onEditorChange={(newValue) => {
          onChange?.(newValue);
        }}
        init={{
          images_upload_handler: uploadHandler,
          ...DEFAULT_INIT_CONFIG,
          ...init,
        }}
        {...editorProps}
      />
      {error && <ErrorMessage className="-mt-1" message={error} />}
    </label>
  );
};
