import { Link } from "react-router-dom";
import { Card } from "../ui/Card";

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center flex-col">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">404</h1>
        <h3 className="text-xl text-center">Pagina no encontrada</h3>
        <p className="text-green-500 text-center">
          <Link to="/" >
            Volver al Inicio
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default NotFound;
