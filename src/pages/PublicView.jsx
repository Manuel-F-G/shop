// src/pages/PublicView.jsx
import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ProductCard from "../components/ProductCard";

export default function PublicView() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "productos"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(items);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-[#39ff14] mb-10">Productos</h1>

      {productos.length === 0 ? (
        <p className="text-center text-gray-400">No hay productos aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {productos.map((producto) => (
            <ProductCard key={producto.id} {...producto} />
          ))}
        </div>
      )}
    </div>
  );
}
