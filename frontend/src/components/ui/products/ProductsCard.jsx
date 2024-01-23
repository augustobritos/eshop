import { useNavigate } from "react-router-dom";
import { Card, Button } from "../Index";

let cart = [];
function ProductsCard({ product }) {

  const navigate = useNavigate();

  const onAddToCart = () => {
    function addToCart(product) {
      // Check if the product already exists in the cart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        // Increment the quantity of the existing product
        cart[existingProductIndex].quantity++;
      } else {
        // If the product does not exist, add it to the cart with a quantity of 1
        cart.push({ ...product, quantity: 1 });
      }

      console.log(`Product ${product.title} added to cart.`);
    }

    function viewCart() {
      console.log("Items in cart:");
      cart.forEach((item) => {
        console.log(
          `Title: ${item.title}, Price: ${item.price}, Quantity: ${item.quantity}`
        );
      });
    }

    const selectedProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
    };

    addToCart(selectedProduct);
    viewCart();
  };

  

  return (
    
      <Card
        key={product.id}
        className="py-10 px-7 flex flex-col items-center justify-center border rounded-xl bg-white shadow-md"
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
