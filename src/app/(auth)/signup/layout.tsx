"use client"

import Ornament from "./components/Ornament";
import SignUpForm from "./components/SignUpForm";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen grid lg:grid-cols-2 relative overflow-y-hidden">
      <SignUpForm />
      {children}
      <div className="absolute bottom-0">
        <Ornament />
      </div>
    </section>
  );
}
