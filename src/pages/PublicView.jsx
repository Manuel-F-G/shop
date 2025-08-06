import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Escuchar productos ordenados por fecha
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

  useEffect(() => {
    // Guardar IP del usuario en Firestore usando API externa
    async function logIP() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();

        await addDoc(collection(db, "ips"), {
          ip: data.ip,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
        });

        console.log("IP guardada:", data.ip);
      } catch (error) {
        console.error("Error guardando IP:", error);
      }
    }

    logIP();
  }, []);

  const productosFiltrados = productos
    .filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Orden alfabético por nombre

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.postimg.cc/NMzHXb87/Eggshop.png"
              alt="EggsShop logo"
              className="h-16 w-auto"
            />
            <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#fff638] via-[#82adff] to-white bg-[200%_auto] bg-clip-text text-3xl text-transparent font-semibold tracking-wide">
              EggsShop
            </span>
          </Link>
          <div className="flex justify-center md:justify-end">
            <div className="flex items-center bg-gray-900/50 rounded-full px-4 py-2 border border-gray-800 w-full md:w-auto">
              <Search className="h-4 w-4 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full md:w-48"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="w-full overflow-x-hidden px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight animate-text-gradient bg-gradient-to-r from-yellow-300 via-pink-400 to-rose-300 bg-[200%_auto] bg-clip-text text-transparent">
            Productos
          </h1>
          <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent font-light tracking-wide">
            Bienvenido a la mejor chop del peru
          </span>
        </div>

        {productosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos disponibles.</p>
        ) : (
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.id}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                imagenURL={producto.imagenURL}
                disponible={producto.disponible}
                precio={producto.precio}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-light">EggsShop</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Bienvenido a la mejor chop de Perú
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300">Enlaces</h4>
            <div className="space-y-2 mt-2">
              <a
                href="https://discord.gg/D5D5DfRf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-400 hover:text-white transition"
              >
                Discord
              </a>
              <a
                href="https://publiegg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-400 hover:text-white transition"
              >
                Panel
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400 mt-2">
              <p>Solo ticket, no dm</p>
              <p>9999999999</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 Store. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Botón flotante Discord */}
      <a
        href="https://discord.gg/D5D5DfRf"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 px-5 py-2 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium backdrop-blur-md shadow-lg hover:bg-white/20 transition"
      >
        Únete a Discord
      </a>
    </div>
  );
}
