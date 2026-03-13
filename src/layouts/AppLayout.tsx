import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

export default function AppLayout() {
  return (

    <div className="flex flex-col min-h-screen">

      <div className="flex flex-col md:flex-row flex-1">

        <Sidebar />

        <main className="flex-1 w-full min-w-0 bg-surface text-text-main p-4 md:p-8 overflow-x-hidden transition-colors duration-300">
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
      
    </div>
  );
}