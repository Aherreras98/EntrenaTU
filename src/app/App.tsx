// src/app/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../components/Footer'; 


export default function App() {
  return (
    <Router>

      {/* min-h-screen: ocupa el 100% de la pantalla */}
      <div className="flex flex-col min-h-screen bg-[#121212] text-[#FFFCFC]">
        
        {/* MAIN */}
        <main className="flex-grow w-full max-w-md mx-auto p-4 flex flex-col justify-center">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-[#FF8904] text-4xl font-black">EntrenaTU</h1>
                <p className="text-gray-500 mt-2 italic">Prueba</p>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer  */}
        <Footer />
        
      </div>
    </Router>
  );
}