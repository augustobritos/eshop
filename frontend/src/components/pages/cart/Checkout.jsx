import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  createPreferenceRequest,
  getMercadoPagoKeyRequest,
} from "../../../api/mercadopago.api";

// Material UI components
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

  const payWithCash = () => {
    onClick();

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
      const preference = await createPreferenceRequest(items);
      const key = await getMercadoPagoKeyRequest();

      if (preference && key) {
        setPreferenceId(preference.data);
        setPublicKey(key.data);
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

  const sendEmail = (customerData) => {
    console.log("Sending email to:", customerData.email);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

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

      {preferenceId && publicKey && (
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
