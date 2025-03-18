import { ClientFooter } from "@/components/organisms/client-layout/client-footer";
import { ClientHeader } from "@/components/organisms/client-layout/client-header";
import { CartProvider } from "@/libs/contexts/cart-context";

export default async function ClientLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <section className="max-w-[1366px] mx-auto min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      <CartProvider>
        <div className="sticky top-0 z-50 bg-white hover:shadow-xl">
          <ClientHeader />
        </div>

        {children}

        {modals}

        <ClientFooter />
      </CartProvider>
    </section>
  );
}
