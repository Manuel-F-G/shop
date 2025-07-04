export default function ProductCard({ nombre, descripcion, imagenURL, disponible, precio }) {
  return (
    <div className="w-72 min-h-[400px] bg-black/60 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 flex flex-col hover:scale-105 transition-transform">
      
      {/* Imagen */}
      <div className="h-[60%] w-full">
        <img
          src={imagenURL}
          alt={nombre}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="px-4 py-2 flex-1">
        <h3 className="text-white font-bold text-base">{nombre}</h3>
        <p className="text-sm text-gray-400 line-clamp-3">{descripcion}</p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3">
        <div className="bg-zinc-800/40 backdrop-blur-md rounded-lg p-2 flex items-center justify-between">
          <span className="text-xs text-gray-300">
            {disponible ? "Disponible" : "Próximamente"}
          </span>
          <button className="text-xs text-white bg-zinc-700/50 hover:bg-zinc-600/50 px-4 py-1 rounded-full transition">
            {disponible ? `$${precio?.toFixed(2)}` : "Notificarme"}
          </button>
        </div>
      </div>
    </div>
  );
}
