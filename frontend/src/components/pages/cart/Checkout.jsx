import { useState, useEffect } from "react";

import { useAuth } from "../../../context/AuthContext";
import {
  createPreferenceRequest,
  getMercadoPagoKeyRequest,
} from "../../../api/mercadopago.api";
import { saveOrderRequest } from "../../../api/orders.api";

import {
  Container,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";

import { MercadoPagoButton } from "../../utils/MercadoPagoButton";
import { PaypalButton } from "../../utils/PaypalButton";
import {
  LoadingSpinner,
  SuccessAlert,
  WarningAlert,
  ErrorScreen,
} from "../../ui/alerts/index.js";

function Checkout({ items, total, customerData, onClick }) {
  const { getEnabledPayments } = useAuth();
  const [payments, setPayments] = useState(null);
  const [preferenceId, setPreferenceId] = useState();
  const [publicKey, setPublicKey] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getEnabledPayments();
        setPayments(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError("Error fetching payments");
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const payWithCash = async () => {
    onClick();

    try {
      const orderId = await saveOrder("Efectivo");
      console.log("orderId: ", orderId);
    } catch (error) {
      console.error(error);
    }

    const { name, email, phone, address } = customerData;

    const orderMessage = items
      .map(
        (item) =>
          `${item.title}: x ${item.quantity} unidades $${
            item.price * item.quantity
          }`
      )
      .join(".\n");

    const whatsappMessage = `
    Hola ${name},
    ¡Gracias por tu compra en nuestra tienda en línea! 
    El total de tu compra es de: $${total} y contiene los siguientes items:\n\n${orderMessage}\n
    Por favor indicanos si es para ser enviado a la direccion: ${address}.
    Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en contactarnos.
    Estamos aquí para ayudarte en todo lo que necesites.
    ¡Gracias nuevamente por elegirnos!
    Atentamente,
    [Nombre del Negocio]`;

    const phoneNumber = "+5493518656727";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappLink, "_blank");
  };

  const payWithMercadoPago = async () => {
    setLoading(true);
    onClick();
    try {
      const { email } = customerData;
      const orderId = await saveOrder("Mercadopago");
      const data = { items, orderId, email };
      const preference = await createPreferenceRequest(data);
      const key = await getMercadoPagoKeyRequest();

      if (preference && key) {
        setPreferenceId(preference);
        setPublicKey(key);
      }
    } catch (error) {
      console.error("Error processing MercadoPago payment:", error);
      setError("Error processing MercadoPago payment");
    } finally {
      setLoading(false);
    }
  };

  const payWithPaypal = async () => {
    onClick();
    console.log("placeOrderWithPaypal");
    return <PaypalButton />;
  };

  const handlePaymentSuccess = (customerData) => {
    // Send email containing order details to the customer
    sendEmail(customerData);
  };

  const saveOrder = async (paymentMethod) => {
    const order = {
      customer: customerData,
      cart: items,
      total: total,
      status: "Pendiente",
      paymentMethod: paymentMethod,
    };

    try {
      const res = await saveOrderRequest(order);
      if (!res) {
        setError(res);
      }
      return res;
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const sendEmail = (customerData) => {
    console.log("Sending email to:", customerData.email);
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container
      sx={{
        position: "relative",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      {loading && <LoadingSpinner props={{ mt: 10 }} />}
      {!preferenceId && (
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "120px",
            marginTop: "120px",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Elige tu método de pago
            </Typography>

            <Typography paragraph align="center">
              Aceptamos varios métodos de pago para mejorar tu experiencia.
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              padding: "20px",
              borderRadius: "9999px",
              width: "100%",
              marginTop: "7px",
            }}
          >
            <Button variant="contained" color="secondary" onClick={payWithCash}>
              Efectivo
            </Button>
            {payments?.mercadopago === true && (
              <Button
                variant="contained"
                color="secondary"
                onClick={payWithMercadoPago}
              >
                Mercado Pago
              </Button>
            )}
            {payments?.paypal === true && (
              <Button
                variant="contained"
                color="secondary"
                onClick={payWithPaypal}
              >
                Paypal
              </Button>
            )}
          </Box>
        </Card>
      )}

      {preferenceId && (
        <Box
          sx={{
            padding: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MercadoPagoButton
            preferenceId={preferenceId}
            publicKey={publicKey}
          />
        </Box>
      )}
    </Container>
  );
}

export default Checkout;
