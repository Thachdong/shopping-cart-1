import { Header } from "@/components/atoms/header";
import { joinClass } from "@/helpers/style";
import { THeaderWithButton } from "@/types/header-with-button";

const DEFAULT_STYLE = "flex justify-between items-center";

export const HeaderWithButton: React.FC<Readonly<THeaderWithButton>> = ({
  button,
  className,
  ...headerProps
}) => {
  return (
    <div className={joinClass(DEFAULT_STYLE, className)}>
      <Header {...headerProps} />
      {button}
    </div>
  );
};
