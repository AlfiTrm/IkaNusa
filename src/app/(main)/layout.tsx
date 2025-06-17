import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import { ToastContainer } from "react-toastify";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
