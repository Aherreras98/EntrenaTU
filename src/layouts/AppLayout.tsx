import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1 bg-neutral-900 text-white p-6">
          <Outlet />
        </main>
        
      </div>

      <Footer />
      
    </div>
  );
}