import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/Applayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import History from "../pages/History";
import Routines from "../pages/Routines";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- RUTAS SIN NADA (Públicas) --- */}
        {/* Aquí la Navbar no aparece, o podrías poner una distinta */}
        {/* <Route path="/signin" element={<SignInPage />} /> */}

        {/* --- RUTAS CON EL DISEÑO DE LA FOTO (Privadas) --- */}
        {/* Todas las rutas dentro de este Route heredarán el Header, Sidebar y Footer */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/routines" element={<Routines />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;