import Ornament from "../login/components/Ornament";
import SignInForm from "./components/SignInForm";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen grid lg:grid-cols-2 overflow-y-hidden">
      {children}
      <SignInForm />
      <div className="absolute right-0">
        <Ornament />
      </div>
    </section>
  );
}
