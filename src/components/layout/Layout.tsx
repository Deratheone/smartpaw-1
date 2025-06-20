import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/auth";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Helmet>
        <link rel="icon" href="/lovable-uploads/3e227a9f-4cb9-4f0d-abac-700e7fa34a0b.png" />
        <title>SmartPaw - Pet Care Services</title>
      </Helmet>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Layout;
