import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    // Contenedor principal en vertical (flex-col)
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Header arriba del todo */}
      <Header />

      {/* 2. Cuerpo medio: Sidebar + Contenido (flex horizontal) */}
      <div className="flex flex-1">
        
        {/* Menú lateral vertical */}
        <Sidebar />

        {/* El contenido principal que cambia según la página */}
        <main className="flex-1 bg-neutral-900 text-white p-6">
          <Outlet />
        </main>
        
      </div>

      {/* 3. Footer abajo del todo */}
      <Footer />
      
    </div>
  );
}