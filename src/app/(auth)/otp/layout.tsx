"use client"


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen grid  relative overflow-y-hidden">
      {children}
      <div className="absolute bottom-0">
      </div>
    </section>
  );
}
