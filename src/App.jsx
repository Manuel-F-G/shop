import { Routes, Route, Navigate } from "react-router-dom";
import PublicView from "./pages/PublicView";
import ProtectedAdminPanel from "./pages/ProtectedAdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tienda" />} />
      <Route path="/tienda" element={<PublicView />} />
      <Route path="/admin" element={<ProtectedAdminPanel />} />
      <Route path="*" element={<p>404: Página no encontrada</p>} />
    </Routes>
  );
}

export default App;
