import { AdminHeader } from "@/components/organisms/admin-layout/admin-header";
import { AdminSidebar } from "@/components/organisms/admin-layout/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen grid grid-cols-1 grid-cols-[auto_1fr_auto]">
      <AdminSidebar />

      <div>
        <AdminHeader />

        {children}
      </div>
    </section>
  );
}
