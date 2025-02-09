import { ClientFooter } from "@/components/organisms/client-layout/client-footer";
import { ClientHeader } from "@/components/organisms/client-layout/client-header";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[1366px] mx-auto min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      <ClientHeader />

      {children}

      <ClientFooter />
    </section>
  );
}
