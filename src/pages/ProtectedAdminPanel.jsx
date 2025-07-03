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
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p className="text-center text-lg">Cargando...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-zinc-900 text-white min-h-screen">
        <div className="flex justify-end p-4">
          <button
            onClick={handleLogout}
            className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-600 hover:bg-zinc-700"
          >
            Cerrar sesión
          </button>
        </div>
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-center text-2xl font-bold text-[#ffff00]">
          Login - Panel de Administración
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-transparent border-b border-zinc-600 py-2 outline-none placeholder:text-gray-400"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-transparent border-b border-zinc-600 py-2 outline-none placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-[#ffff00] text-black font-semibold py-2 rounded hover:brightness-110 transition"
        >
          Entrar
        </button>

        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
}
