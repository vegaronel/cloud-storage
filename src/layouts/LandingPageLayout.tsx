import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "@/components/ui/sonner";

function LandingPageLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{<Outlet />}</div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default LandingPageLayout;
