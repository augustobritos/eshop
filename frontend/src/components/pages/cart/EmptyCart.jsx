import { Card } from "../../ui/Card";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Card>
      <div>
        <p className="text-center text-gray-600 py-10">
          Tu carrito está vacío.
        </p>
      </div>
      <div className="flex justify-center items-center py-7">
        <button
          className="bg-green-500 text-white px-4 py-2 mt-6 rounded-full"
          onClick={() => {
            navigate("/products");
          }}
        >
          Explorar productos
        </button>
      </div>
    </Card>
  );
}

export default EmptyCart;
