import { Link } from "react-router-dom";
import { Card, Typography, Container } from "@mui/material";

function NotFound() {
  return (
    <Container sx={{ height: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h1" sx={{ fontSize: "4xl", fontWeight: "bold", mb: 2 }}>
          404
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "xl", mb: 2 }}>
          Página no encontrada
        </Typography>
        <Typography variant="body1" sx={{ color: "success.main" }}>
          <Link to="/">Volver al Inicio</Link>
        </Typography>
      </Card>
    </Container>
  );
}

export default NotFound;
