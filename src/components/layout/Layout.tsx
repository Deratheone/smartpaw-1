
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <link rel="icon" href="/lovable-uploads/3e227a9f-4cb9-4f0d-abac-700e7fa34a0b.png" />
        <title>SmartPaw - Pet Care Services</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
