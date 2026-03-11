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
import { Toaster } from "react-hot-toast";
import LandingPage from "../pages/LandingPage";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <LandingPage /> : <Navigate to="/home" />} 
        />
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

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />

        <Route element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;