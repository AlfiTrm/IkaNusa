
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen overflow-y-hidden">
      {children}
    </section>
  );
}
