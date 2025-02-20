"use client";
import React, { useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { TBaseEditor } from "@/types/form";
import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";

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

const DEFAULT_CONTENT_STYLE =
  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }";

const DEFAULT_INIT_CONFIG = {
  height: 500,
  menubar: false,
  plugins: DEFAULT_PLUGINS,
  toolbar: DEFAULT_TOOLBAR,
  content_style: DEFAULT_CONTENT_STYLE,
};

const DEFAULT_INITIAL_VALUE =
  "<p>This is the initial content of the editor</p>";

const DEFAULT_CLASSNAME = "flex flex-col gap-2";

export const BaseEditor: React.FC<TBaseEditor> = ({
  label,
  error,
  initialValue,
  init,
  ...editorProps
}) => {
  const editorRef = React.useRef<TinyMCEEditor | null>(null);

  const forcusEditor = useCallback(() => {
    console.log(editorRef.current);
    editorRef.current?.focus?.();
  }, []);

  return (
    <label className={joinClass(DEFAULT_CLASSNAME)} onClick={forcusEditor}>
      {label}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TinyMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue || DEFAULT_INITIAL_VALUE}
        init={{ ...DEFAULT_INIT_CONFIG, ...init }}
        {...editorProps}
      />
      {error && <ErrorMessage className="-mt-1" message={error} />}
    </label>
  );
};
