import { Menu } from "@/components/molecules/menu";
import { Header } from "@/components/atoms/header";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { LinkAsButton } from "@/components/molecules/link-as-button";

const ITEMS = [
  { id: "1", label: "Home", url: "" },
  { id: "2", label: "About", url: "" },
  { id: "3", label: "Blogs", url: "" },
  { id: "4", label: "Collections", url: "" },
];

const CLASS_NAMES = {
  menu: "border-b border-gray-300 grid grid-cols-[auto_1fr_auto] items-center",
};

export const ClientHeader: React.FC = () => {
  return (
    <div className={CLASS_NAMES.menu}>
      {/* logo */}
      <Header
        className="uppercase tracking-widest !text-2xl select-none mr-4"
        level={1}
      >
        moni.sh
      </Header>
      {/* menu */}
      <Menu direction="vertical" items={ITEMS} />

      <div className="flex gap-2 items-center">
        {/* cart */}
        <div>
          <Icon name={EIconName.cart} />
        </div>
        {/* profile */}
        <LinkAsButton buttonProps={{ className: "!p-0" }} href={"/login"}>
          Login
        </LinkAsButton>
        <span>/</span>
        <LinkAsButton buttonProps={{ className: "!p-0" }} href={"/register"}>
          Register
        </LinkAsButton>
      </div>
    </div>
  );
};
