import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../../../context/ProductsContext";
import { SuccessAlert } from "../../ui/alerts/index.js";

import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function ProductsAdminCard({ product }) {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [successMessages, setSuccessMesages] = useState("");

  const { id, title, images, price, quantity, description } = product;

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar el producto?")) {
      const res = await deleteProduct(id);
      if (res.status === 204) {
        setSuccessMesages("Producto eliminado!");
      }
    }
  };

  if (successMessages) {
    return <SuccessAlert message={successMessages} />;
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Card>
        <CardActionArea onClick={() => navigate("/product/" + id)}>
          <CardMedia
            component="img"
            alt={title}
            image={images[0]}
            title={title}
            sx={{ height: "140px", objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h5" component="div" textAlign="center">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Unidades: {quantity}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              $ {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/products/edit/${id}`)}
            startIcon={<EditIcon />}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductsAdminCard;
