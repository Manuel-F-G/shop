import { Routes, Route } from "react-router-dom";
import PublicView from "./pages/PublicView";
import ProtectedAdminPanel from "./pages/ProtectedAdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicView />} />
      <Route path="/admin" element={<ProtectedAdminPanel />} />
    </Routes>
  );
}

export default App;
