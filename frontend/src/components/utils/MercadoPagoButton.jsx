import { useEffect, useState } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

function MercadoPagoButton({ preferenceId, publicKey }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!preferenceId || !publicKey) {
      setLoading(false);
      setError("Este metodo de pago no se encuentra disponible, por favor intenta luego.");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (publicKey) {
      initMercadoPago(publicKey);
    }
  }, [publicKey]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div id="wallet_container">
      <Wallet
        initialization={{ preferenceId }}
        customization={{
          texts: { valueProp: "smart_option" },
          visual: {
            buttonBackground: "black",
            valuePropColor: "grey",
            borderRadius: "25px",
          },
        }}
      />
    </div>
  );
}

export { MercadoPagoButton };
