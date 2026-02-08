import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/Applayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import History from "../pages/History";
import Routines from "../pages/Routines";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LogInPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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