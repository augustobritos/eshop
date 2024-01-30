import { useState, useEffect } from "react";

import { useAuth } from "../../../context/AuthContext";
import { createPreference } from "../../../api/mercadopago.api";

// UI
import { MercadoPagoButton } from "../../utils/MercadoPagoButton";
import { PaypalButton } from "../../utils/PaypalButton";
import { Container, Card } from "../../ui/Index";

function Checkout({ items, total }) {
  const { getEnabledPayments } = useAuth();
  const [payments, setPayments] = useState(null);
  const [preferenceId, setPreferenceId] = useState();

  const payWithCash = () => {
    const orderMessage = items
      .map((item) => `${item.title}: x ${item.quantity} u`)
      .join("\n");

    const whatsappMessage = `¡Nuevo pedido!\n\n${orderMessage}\n\nTotal a pagar: $${total}`;

    const phoneNumber = "+5493518656727";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappLink, "_blank");
  };

  const payWithMercadoPago = async () => {
    const res = await createPreference(items);

    if (res) {
      const id = res.data;

      setPreferenceId(id);
    }
  };

  const payWithPaypal = async () => {
    console.log("placeOrderWithPaypal");
    return <PaypalButton />;
  };

  const handlePaymentSuccess = (customerData) => {
    // Send email containing order details to the customer
    sendEmail(customerData);
  };

  const sendEmail = (customerData) => {
    console.log("Sending email to:", customerData.email);
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getEnabledPayments();
        setPayments(response);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <Container className="relative h-[80vh] justify-center items-center mb-10">
      {!preferenceId && (
        <Card className="flex flex-col justify-center items-center px-4 my-52">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-center">
              Elige tu metodo de pago
            </h2>
            <p className="mb-6">
              Aceptamos varios metodos de pago para mejorar tu experiencia.
            </p>
          </div>
          <div className="flex justify-center items-center gap-3 p-4 rounded-full w-full my-7">
            <button
              className="bg-green-500 text-white px-4 py-4 rounded-full "
              onClick={payWithCash}
            >
              Efectivo
            </button>
            {payments?.mercadopago === true && (
              <button
                className="bg-blue-500 text-white px-4 py-4 rounded-full"
                onClick={payWithMercadoPago}
              >
                Mercado Pago
              </button>
            )}
            {payments?.paypal === true && (
              <button
                className="bg-amber-500 text-white px-4 py-4 rounded-full"
                onClick={payWithPaypal}
              >
                Paypal
              </button>
            )}
          </div>
        </Card>
      )}
      {preferenceId && (
        <div className="p-72">
          {/* Assuming MercadoPagoButton is a component to handle Mercado Pago payments */}
          <MercadoPagoButton preferenceId={preferenceId} />
        </div>
      )}
    </Container>
  );
}

export default Checkout;
