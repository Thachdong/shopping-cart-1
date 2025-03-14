type TModal = {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  header?: string | React.ReactNode;
  footer?: React.ReactNode;
  backdropClassName?: string;
  modalClassName?: string;
};

type TModalHook = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};
