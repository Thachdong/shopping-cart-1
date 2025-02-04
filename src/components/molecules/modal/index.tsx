"use client";

import { joinClass } from "@/helpers/style";

const DEFAULT_CLASSNAME = {
  backdrop:
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
  modal:
    "bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg h-[500px]",
  closeButton: "absolute top-2 right-2 text-gray-500 hover:text-gray-700",
};

export const Modal: React.FC<TModal> = ({
  children,
  open,
  header,
  footer,
  backdropClassName,
  modalClassName,
}) => {
  if (open)
    return (
      <div className={joinClass(DEFAULT_CLASSNAME.backdrop, backdropClassName)}>
        <div className={joinClass(DEFAULT_CLASSNAME.modal, modalClassName)}>
          {header}
          {children}
          {footer}
        </div>
      </div>
    );

  return null;
};
