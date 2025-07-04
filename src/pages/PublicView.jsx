import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  <span className="text-xl font-light tracking-wide">EggsShop</span>
</Link>


    <div className="flex justify-center md:justify-end">
      <div className="flex items-center bg-gray-900/50 rounded-full px-4 py-2 border border-gray-800 w-full md:w-auto">
        <Search className="h-4 w-4 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Search"
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
          <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight">Productos</h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            Bienvenido a la mejor chop del peru
          </p>
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
              <Link to="/productos" className="block text-sm text-gray-400 hover:text-white transition">Productos</Link>
              <Link to="/soporte" className="block text-sm text-gray-400 hover:text-white transition">Soporte</Link>
              <Link to="/contacto" className="block text-sm text-gray-400 hover:text-white transition">Contacto</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-400 mt-2">
              <p>soporte@store.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 px-6">
          <p>© 2024 Store. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacidad" className="hover:text-gray-300 transition-colors">Privacidad</Link>
            <Link to="/terminos" className="hover:text-gray-300 transition-colors">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
