import { Link } from "react-router-dom";

export default function PublicView() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f3f4f6" }}>
        <Link to="/tienda" style={{ marginRight: "1rem" }}>Tienda</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <h1 style={{ padding: "1rem" }}>Productos</h1>
      {/* Aquí renderizas la lista de productos como ya lo hacías */}
    </div>
  );
}
