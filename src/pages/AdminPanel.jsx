import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function AdminPanel() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [colorTexto, setColorTexto] = useState("#39ff14");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "productos"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const prods = [];
      querySnapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() });
      });
      setProductos(prods);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || !imagen || !precio) {
      setMensaje("Completa todos los campos.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "unsigned_preset");
      formData.append("folder", "productos");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/davyruvih/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error("Error al subir imagen");

      const imagenURL = data.secure_url;

      await addDoc(collection(db, "productos"), {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        colorTexto,
        disponible: true,
        imagenURL,
        fecha: Timestamp.now(),
      });

      setMensaje("✅ Producto subido");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setColorTexto("#39ff14");
      setImagen(null);
    } catch (error) {
      console.error("Error al subir producto:", error);
      setMensaje("❌ Error al subir producto");
    }
  };

  const eliminarProducto = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await deleteDoc(doc(db, "productos", id));
      setMensaje("✅ Producto eliminado");
    } catch (error) {
      setMensaje("❌ Error al eliminar");
    }
  };

  const toggleDisponible = async (id, nuevoEstado) => {
    try {
      const docRef = doc(db, "productos", id);
      await updateDoc(docRef, { disponible: nuevoEstado });
      setMensaje("✅ Disponibilidad actualizada");
    } catch (error) {
      setMensaje("❌ Error al actualizar disponibilidad");
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#ffff00] text-center w-full">Panel de Administración</h1>
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 text-sm text-white border border-zinc-600 px-4 py-1 rounded hover:bg-zinc-700"
        >
          Cerrar sesión
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl grid gap-6 mb-10"
      >
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="bg-transparent border-b border-zinc-600 focus:outline-none focus:border-lime-400 p-2"
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          step="0.01"
          min="0"
          className="bg-transparent border-b border-zinc-600 focus:outline-none focus:border-lime-400 p-2"
        />

        <div className="flex items-center gap-4">
          <input
            type="color"
            value={colorTexto}
            onChange={(e) => setColorTexto(e.target.value)}
            className="w-10 h-10 rounded border-none"
          />
          <span className="text-sm text-gray-300">Color del texto</span>
        </div>

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="bg-transparent border-b border-zinc-600 focus:outline-none focus:border-lime-400 p-2"
        />

        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          accept="image/*"
          className="file:bg-zinc-700 file:text-white file:rounded file:px-4 file:py-1"
        />

        <button
          type="submit"
          className="bg-[#ffff00] text-black font-bold py-2 rounded hover:brightness-110 transition-colors"
        >
          Subir producto
        </button>
      </form>

      {mensaje && (
        <p className={`text-sm mb-6 ${mensaje.includes("✅") ? "text-green-400" : "text-red-400"}`}>
          {mensaje}
        </p>
      )}

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Productos existentes</h2>
        {productos.length === 0 ? (
          <p className="text-gray-400">No hay productos aún.</p>
        ) : (
          <div className="grid gap-4">
            {productos.map(({ id, nombre, descripcion, precio, disponible, imagenURL, colorTexto }) => (
              <div
                key={id}
                className="bg-zinc-800 p-4 rounded flex items-center gap-4"
              >
                <img
                  src={imagenURL}
                  alt={nombre}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold" style={{ color: colorTexto }}>
                    {nombre}
                  </h3>
                  <p className="text-gray-300">{descripcion}</p>
                  <p className="text-lime-300 font-semibold">${precio?.toFixed(2)}</p>
                  <label className="flex items-center gap-2 mt-1 text-sm">
                    <input
                      type="checkbox"
                      checked={disponible}
                      onChange={(e) => toggleDisponible(id, e.target.checked)}
                    />
                    {disponible ? "Disponible" : "No disponible"}
                  </label>
                </div>
                <button
                  onClick={() => eliminarProducto(id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
