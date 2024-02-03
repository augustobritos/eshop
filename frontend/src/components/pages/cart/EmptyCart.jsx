import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500, maxHeight: 500, margin: "auto", marginTop: 30, padding:10 }}>
      <CardContent>
        <Typography variant="body1" color="text.secondary" align="center" py={10}>
          Tu carrito está vacío.
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingY: 7 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/products");
            }}
          >
            Explorar productos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EmptyCart;
