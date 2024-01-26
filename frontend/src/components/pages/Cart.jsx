import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createPreference } from "../../api/mercadopago.api";
import { MercadoPagoButton } from "../utils/MercadoPagoButton";
import { Container, Card } from "../ui/Index";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

function Cart() {
  const { cartItems, getCartTotal, removeFromCart, updateQuantity } = useCart();

  const mpFlag = true;

  const [preferenceId, setPreferenceId] = useState();

  const navigate = useNavigate();

  const onUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const onRemoveProduct = (product) => {
    removeFromCart(product);
  };

  const placeOrder = () => {
    const orderMessage = cartItems
      .map((item) => `${item.title}: x ${item.quantity} u`)
      .join("\n");
    const total = getCartTotal().toFixed(2);

    const whatsappMessage = `¡Nuevo pedido!\n\n${orderMessage}\n\nTotal a pagar: $${total}`;

    const phoneNumber = "+5493518656727";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappLink, "_blank");
  };

  const placeOrderWithMercadoPago = async () => {
    const res = await createPreference(cartItems);

    if (res) {
      const id = res.data;

      setPreferenceId(id);
    }
  };

  return (
    <Container className="bg-white rounded-lg p-6 my-20">
      <Card className="mx-2 py-20">
        {cartItems.length > 0 && (
          <h2 className="text-2xl font-bold mb-10 text-center">
            ¡Confirma Tu Compra Ahora y Transforma Tu Experiencia!
          </h2>
        )}

        {cartItems.length === 0 ? (
          <div>
            <p className="text-center text-gray-600 py-10">
              Tu carrito está vacío.
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="title-column" style={{ width: "200px" }}>
                <p className="text-gray-600 text-xl">{item.title}</p>
              </div>
              <div className="quantity-group" style={{ width: "100px" }}>
                <div className="quantity-group">
                  <button
                    className="quantity-button p-2 text-lg text-red-500 gap-2"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <FaMinusCircle />
                  </button>
                  <span className="quantity text-xl">{item.quantity}</span>
                  <button
                    className="quantity-button p-2 text-xl text-green-500"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
              </div>
              <img
                className="text-gray-600"
                src={item.image}
                height={100}
                width={100}
              />
              <p className="text-gray-800 text-xl" style={{ width: "150px" }}>
                $ {(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                className="text-red-500"
                onClick={() => onRemoveProduct(item)}
              >
                Quitar
              </button>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold">${getCartTotal()}</p>
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="flex justify-center items-center gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 mt-6 rounded-full"
              onClick={placeOrder}
            >
              Pago Efectivo
            </button>
            {mpFlag && (
              <button
                className="bg-green-500 text-white px-4 py-2 mt-6 rounded-full"
                onClick={placeOrderWithMercadoPago}
              >
                Mercado Pago
              </button>
            )}
          </div>
        ) : (
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
        )}

        {preferenceId && 
        <div className="my-10">
          <MercadoPagoButton preferenceId={preferenceId}/>
        </div>
        }
      </Card>
    </Container>
  );
}

export default Cart;