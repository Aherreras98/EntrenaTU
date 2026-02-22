import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
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
  const session = useAuthStore((state) => state.session);

  const isAuthenticated = !!session;

  return (
    <Router>
      <Routes>
        {/* RUTAS PÚBLICAS: Solo accesibles si el usuario NO ha iniciado sesión */}
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/forgot-password"
          element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        {/* RUTA RAÍZ: Redirige según el estado de autenticación */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />

        {/* RUTAS PRIVADAS: Solo accesibles si el usuario SÍ ha iniciado sesión */}
        {/* Todas las rutas dentro de este Route heredarán el Header, Sidebar y Footer */}
        <Route element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}>
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