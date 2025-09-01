import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";

const MainLayout = () => {
  const location = useLocation();

  // Scroll to top on route change and page refresh with smooth animation
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-100px)] pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
