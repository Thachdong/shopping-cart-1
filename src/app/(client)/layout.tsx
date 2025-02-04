export default async function ClientLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <section>
      {children}
      {modals}
    </section>
  );
}
