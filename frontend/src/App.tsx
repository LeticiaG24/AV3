import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Aeronave from "./pages/Aeronave";
import Login from "./pages/Login";
import Home from "./pages/Home";

function RotaProtegida({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" replace />;
}

function HomeWrapper() {
  const { nome, nivel } = useAuth();
  return <Home nome={nome ?? ""} nivel={nivel ?? ""} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/aeronave/:id" element={<RotaProtegida><Aeronave /></RotaProtegida>} />
      <Route path="/home" element={<RotaProtegida><HomeWrapper /></RotaProtegida>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;