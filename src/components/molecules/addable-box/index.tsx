import { Button } from "@/components/atoms/button";
import { Icon } from "@/components/atoms/icon";
import { EButtonType, EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";

const DEFAULT_ADDABLE_BOX_CLASSNAME = "flex flex-col gap-2";

export const AddableBox: React.FC<Readonly<TAddableBox>> = ({
  contentList,
  onAdd,
  onRemove,
  className,
}) => {
  return (
    <div className={joinClass(DEFAULT_ADDABLE_BOX_CLASSNAME, className)}>
      {contentList.map((content, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div>{content}</div>
          <Button type={EButtonType.secondary} onClick={() => onRemove(index)}>
            <Icon name={EIconName["close-circle"]} />
          </Button>
        </div>
      ))}
      <Button onClick={onAdd}>
        <Icon name={EIconName["add-circle"]} />
      </Button>
    </div>
  );
};
