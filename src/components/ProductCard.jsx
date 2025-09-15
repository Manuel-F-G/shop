export default function ProductCard({ nombre, descripcion, imagenURL, disponible, precio }) {
  return (
    <div className="w-72 h-[440px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl overflow-hidden flex flex-col hover:scale-105 transition-transform">
      
      {/* Imagen */}
      <div className="h-[250px] w-full">
        <img
          src={imagenURL}
          alt={nombre}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="px-4 pt-2 pb-1 h-[90px]">
        <h3 className="text-gray-500 font-semibold text-sm">{nombre}</h3>
        <p className="text-sm text-gray-700 leading-snug whitespace-pre-line">{descripcion}</p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 mt-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 flex items-center justify-between">
          <span className="text-xs text-gray-700">
            {disponible ? "Disponible" : "Próximamente"}
          </span>
          <button className="text-xs text-gray-700 bg-white/10 hover:bg-white/20 px-4 py-1 rounded-full transition border border-white/20">
            {disponible ? `$${precio?.toFixed(2)}` : "No hay we"}
          </button>
        </div>
      </div>
    </div>
  );
}
