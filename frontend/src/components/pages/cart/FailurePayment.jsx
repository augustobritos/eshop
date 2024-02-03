import { Card, Box, Typography } from "@mui/material";

function FailurePayment() {
  return (
    <Card
      sx={{
        maxWidth: "md",
        mx: "auto",
        boxShadow: "md",
        overflow: "hidden",
        py: 10,
        mt: 10,
        mb: 40,
      }}
    >
      <Box display="flex" m={1} p={1}>
        <Box flex="none">
          <Box
            component="img"
            src="success.jpg"
            alt="Transaction"
            sx={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "cover",
              padding: "5px",
            }}
          />
        </Box>
        <Box p={1} pt={1}>
          <Typography
            variant="subtitle1"
            color="error"
            sx={{
              textTransform: "uppercase",
              fontSize: "0.875rem",
              color: "#EF4444",
              fontWeight: "600",
              mb: 1,
            }}
            gutterBottom
          >
            Lamentamos que tu compra no pudo ser procesada.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Por favor elige otro medio de pago o intenta nuevamente más tarde.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default FailurePayment;
