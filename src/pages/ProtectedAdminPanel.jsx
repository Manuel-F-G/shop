import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import AdminPanel from "./AdminPanel";

export default function ProtectedAdminPanel() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Escuchar cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;
  }

  if (user) {
    return (
      <div>
        <div style={{
          display: "flex",
        }}>
          <button onClick={handleLogout}></button>
        </div>
        <AdminPanel />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 300, margin: "auto", padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Login - Panel de Administración</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Entrar
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}
