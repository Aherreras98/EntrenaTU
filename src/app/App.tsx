import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/Applayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import History from "../pages/History";
import Routines from "../pages/Routines";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LogInPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import LandingPage from "../pages/LandingPage";

function App() {
/* Constante utilizada para simular el estado de usuario, false para ver pantallas de login, registro y recuperar contraseña 
true para ver el resto de páginas internas de la app que serían privadas y solo accesibles por los usuarios*/
const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />


        {/* Todas las rutas dentro de este Route heredarán el Header, Sidebar y Footer */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/routines" element={<Routines />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;