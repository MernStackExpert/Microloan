import { Outlet } from "react-router";
import Footer from "../components/Footer";
import AppNavbar from "../Components/AppNavbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <AppNavbar/>

      {/* Dynamic Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
