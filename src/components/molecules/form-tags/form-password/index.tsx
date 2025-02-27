import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { TFormPassword } from "@/types/form";

export const FormPassword: React.FC<Readonly<TFormPassword>> = ({
  inputTag,
  type,
  setType,
}) => {
  return (
    <div className="relative">
      {inputTag}

      <Icon
        onClick={setType}
        iconClassName="absolute bottom-[18px] right-2 top-[2.5rem]"
        name={EIconName[type === "text" ? "eyes" : "eyes-slash"]}
      />
    </div>
  );
};
