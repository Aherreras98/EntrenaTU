import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/Applayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import History from "../pages/History";
import Routines from "../pages/Routines";
import LoginPage from "../pages/LogInPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import SignUpPage from "../pages/SignUpPage";
import { useAuthStore } from "../store/useAuthStore";
import ResetPasswordPage from "../pages/ResetPasswordPage";

function App() {
/* Constante utilizada para simular el estado de usuario, false para ver pantallas de login, registro y recuperar contraseña 
true para ver el resto de páginas internas de la app que serían privadas y solo accesibles por los usuarios*/

const isAuthenticated = true;        
const session = useAuthStore((state) => state.session);

// Definimos isAuthenticated en base a si existe la sesión (!! la convierte a true/false)
// const isAuthenticated = !!session;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
        />

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