import { useState, useEffect } from "react";
import { Card, Box, Typography } from "@mui/material";

const SuccessPayment = () => {
  const [paymentId, setPaymentId] = useState(null);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  useEffect(() => {
    const url = window.location.href;
    const params = new URLSearchParams(url);
    const paymentIdValue = params.get("payment_id");
    setPaymentId(paymentIdValue);
  }, []);

  return (
    <Card
      sx={{
        maxWidth: "md",
        mx: "auto",
        boxShadow: "md",
        overflow: "hidden",
        my: 10,
      }}
    >
      <Box display="flex" m={1} p={1}>
        <Box flex="none">
          <img
            height="80px"
            width="100%"
            style={{ objectFit: "cover", padding: "5px" }}
            src="success.jpg"
            alt="Transaction"
          />
        </Box>
        <Box p={1} mt={1}>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{
              textTransform: "uppercase",
              fontSize: "0.875rem",
              color: "#34D399",
              fontWeight: "600",
              mb: 1,
            }}
            gutterBottom
          >
            Muchas Gracias por tu Compra!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Transaction ID: {paymentId}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Amount: ${paymentId}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {currentDate}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default SuccessPayment;
