import { Menu } from "@/components/molecules/menu";
import { Header } from "@/components/atoms/header";
import { getServerSession } from "@/libs/auth";
import { UserBox } from "./user-box";
import { UnAuthenButtons } from "./unauthen-buttons";
import { CartButton } from "./cart-button";

const ITEMS = [
  { id: "1", label: "Home", url: "/" },
  { id: "2", label: "Blogs", url: "/blogs" },
  { id: "3", label: "Collections", url: "/collections" },
  { id: "4", label: "Products", url: "/products" },
];

const CLASS_NAMES = {
  menu: "border-b border-gray-300 grid grid-cols-[auto_1fr_auto] items-center",
};

export const ClientHeader: React.FC = async () => {
  const session = await getServerSession();
  return (
    <div className={CLASS_NAMES.menu}>
      {/* logo */}
      <Header
        className="uppercase tracking-widest !text-2xl select-none mr-4 !mb-0"
        level={1}
      >
        moni.sh
      </Header>

      {/* menu */}
      <Menu direction="vertical" items={ITEMS} />

      <div className="flex gap-2 items-center">
        {/* cart */}
        <CartButton />

        {/* profile */}
        {session?.user ? (
          <UserBox username={session?.user?.username} />
        ) : (
          <UnAuthenButtons />
        )}
      </div>
    </div>
  );
};
