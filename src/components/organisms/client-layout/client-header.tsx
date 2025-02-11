import { Menu } from "@/components/molecules/menu";
import { Header } from "@/components/atoms/header";
import { Icon } from "@/components/atoms/icon";
import { EIconName, EPath } from "@/constants";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Link from "next/link";
import { genPath } from "@/helpers/router";

const ITEMS = [
  { id: "1", label: "Home", url: "/" },
  { id: "2", label: "Blogs", url: "/blogs" },
  { id: "3", label: "Collections", url: "/collections" },
  { id: "4", label: "Products", url: "/products" },
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
      <Menu direction="vertical" items={ITEMS} activeId="1" />

      <div className="flex gap-2 items-center">
        {/* cart */}
        <Link href={genPath(EPath.cart)}>
          <Icon name={EIconName.cart} />
        </Link>
        {/* profile */}
        <LinkAsButton
          id="login-button"
          buttonProps={{ className: "!p-0" }}
          href={"/auth/login#login-button"}
        >
          Login
        </LinkAsButton>
        <span>/</span>
        <LinkAsButton
          id="register-button"
          buttonProps={{ className: "!p-0" }}
          href={"/auth/register#register-button"}
        >
          Register
        </LinkAsButton>
      </div>
    </div>
  );
};
