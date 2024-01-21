import { Card, Button } from "../Index";
import { useNavigate } from "react-router-dom";

function ProductsCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card key={product.id} className="py-4 px-7 justify-center flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <img src="/default-product-image.png"/>
        <p className="py-4 overflow-hidden">{product.description}</p>
        <p className="py-4 overflow-hidden">{product.price}</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            console.log("cart");
          }}
        >
          Agregar al carro
        </Button>
      </div>
    </Card>
  );
}

export default ProductsCard;
