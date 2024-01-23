import { useState } from "react";

function Cart({ product }) {
  const [cart, setCart] = useState([]);

  const addToCart = () => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    console.log(`Product ${product.title} added to cart.`);
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Finalizar compra</h2>

      {/* Display products in the cart */}
      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-2">
          <p className="text-gray-600">{item.title}</p>
          <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      
      {/* Total price */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">Total:</p>
        <p className="text-xl font-bold">${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
      </div>

      {/* Checkout button */}
      <div className="flex justify-center items-center">
        <button className="bg-green-500 text-white px-4 py-2 mt-6 rounded-full">
          Comprar
        </button>
      </div>
    </div>
  );
}

export default Cart;
