export default function ProductCard({ nombre, descripcion, imagenURL, disponible }) {
  return (
    <div className="relative w-72 bg-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform border border-zinc-800">
      {/* Imagen principal */}
      <img
        src={imagenURL}
        alt={nombre}
        className="w-full h-72 object-cover"
      />

      {/* Glassmorphism floating box */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-[90%] px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-between shadow-md">
        <span className="text-white text-sm truncate">{nombre}</span>
        <button
          className="bg-black/30 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-black/40 transition"
        >
          {disponible ? "Comprar" : "Notificarme"}
        </button>
      </div>

      {/* Descripción flotante abajo */}
      <div className="bg-white/10 backdrop-blur-sm p-3">
        <p className="text-sm text-gray-200 line-clamp-2">{descripcion}</p>
      </div>
    </div>
  );
}
