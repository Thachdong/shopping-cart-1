"use client";

import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";

const DEFAULT_CLASSNAME = {
  backdrop:
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
  modal: "bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg p-2",
  header: "flex justify-between items-center pb-2 px-2 mb-2 -mx-2 border-b",
  closeIcon: "ml-auto",
};

export const Modal: React.FC<TModal> = ({
  children,
  open,
  header,
  footer,
  backdropClassName,
  modalClassName,
  onClose,
}) => {
  if (open)
    return (
      <div className={joinClass(DEFAULT_CLASSNAME.backdrop, backdropClassName)}>
        <div className={joinClass(DEFAULT_CLASSNAME.modal, modalClassName)}>
          <div className={DEFAULT_CLASSNAME.header}>
            {header}
            <Icon
              iconClassName={DEFAULT_CLASSNAME.closeIcon}
              onClick={onClose}
              name={EIconName.close}
            />
          </div>

          {children}

          {footer}
        </div>
      </div>
    );

  return null;
};
