import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";

const DEFAULT_ADDABLE_BOX_CLASSNAME = "flex flex-col gap-2";

export const AddableBox: React.FC<Readonly<TAddableBox>> = ({
  contentList,
  onAdd,
  onRemove,
  className,
}) => {
  const contentLength = contentList.length;

  return (
    <div className={joinClass(DEFAULT_ADDABLE_BOX_CLASSNAME, className)}>
      {contentList.map((content, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div>{content}</div>

          <Icon
            onClick={() => onRemove(index)}
            name={EIconName["close-circle"]}
            className="fill-primary-100 hover:fill-secondary-100"
          />

          {index === contentLength - 1 && (
            <Icon
              className="fill-primary-100 hover:fill-secondary-100"
              onClick={onAdd}
              width={24}
              height={24}
              name={EIconName["add-circle"]}
            />
          )}
        </div>
      ))}
    </div>
  );
};
