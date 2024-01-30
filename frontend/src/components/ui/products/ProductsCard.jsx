import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { Card, Button } from "../Index";

function ProductsCard({ product }) {

  const navigate = useNavigate();

  const { addItemToCart } = useCart();

  const onAddToCart = async () => {
    const res = await addItemToCart(product);
  };

  return (
    
      <Card
        key={product.id}
        className="py-16 px-7 flex flex-col items-center justify-center border rounded-xl bg-white shadow-md"
        style={{ transition: "box-shadow 0.5s" }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.1)";
        }}
      >
        <button onClick={() => {
            navigate("/product/" + product.id);
          }}>
        <div className="mx-auto">
          <h1 className="flex justify-center items-center text-2xl font-semibold">
            {product.title}
          </h1>

          <img
            src={product.image}
            className="object-contain w-64 h-64 mx-auto"
            alt="Product"
          />

          <p className="flex justify-center items-center py-4 overflow-hidden font-semibold">
            $ {product.price}
          </p>
        </div>
        </button>

        <div className="flex justify-center items-center">
          <Button className="text-sm" onClick={onAddToCart}>
            Añadir a la cesta
          </Button>
        </div>
      </Card>
  );
}

export default ProductsCard;
