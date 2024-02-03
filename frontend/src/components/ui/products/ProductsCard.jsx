import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../redux/cartSlice";

import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductsCard({ product }) {
  const { id, title, image, price } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.1)";
  };

  const handleClick = () => {
    navigate("/product/" + id);
  };

  return (
    <Card
  onMouseOver={handleMouseOver}
  onMouseOut={handleMouseOut}
  onClick={handleClick}
  sx={{ maxWidth: 400, width: '100%', minHeight: 400 }} 
>
  <CardMedia
    component="img"
    alt="Product"
    image={image}
    title={title}
    sx={{ maxHeight: 200, objectFit: 'cover', minHeight: 300 }}
  />

  <CardContent>
    <Typography
      variant="h5"
      component="h2"
      sx={{
        fontSize: { xs: '1.5rem', md: '2rem' }, 
        fontWeight: "semibold",
        textAlign: "center",
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        py: 2,
        fontWeight: "semibold",
        textAlign: "center",
      }}
    >
      $ {price}
    </Typography>
  </CardContent>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Button
      sx={{ fontSize: '1rem', marginBottom: 2 }} 
      onClick={handleAddToCart}
      color="secondary"
    >
      Añadir a la cesta
      <AddShoppingCartIcon />
    </Button>
  </div>
</Card>

  );
}

export default ProductsCard;
