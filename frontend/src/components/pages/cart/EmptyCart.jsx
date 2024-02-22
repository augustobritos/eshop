import { useNavigate } from "react-router-dom";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500, maxHeight: 500, margin: "auto", p: 10 }}>
      <CardContent>
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          py={10}
        >
          Tu carrito está vacío.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Explorar productos
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EmptyCart;
