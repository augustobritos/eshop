import { Card, Button } from "../../ui/Index";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../context/ProductsContext";
import { PiTrashBold } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";

function ProductsAdminCard({ product }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  return (
    <Card key={product.id} className="py-4 px-7 justify-center flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <img src="../../public/default-product-image.png"/>
        <p className="py-4 overflow-hidden">{product.description}</p>
        <p className="py-4 overflow-hidden">$ {product.price}</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            navigate("/products/edit/" + product.id);
          }}
        >
          <FaEdit /> Edit
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={async () => {
            if (window.confirm("Estas seguro que deseas eliminar el producto?")) {
              await deleteProduct(product.id);
            }
          }}
        >
          <PiTrashBold /> Delete
        </Button>
      </div>
    </Card>
  );
}

export default ProductsAdminCard;
