import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../redux/cartSlice";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductsCard({ product }) {
  const { id, title, images, price } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleClick = () => {
    navigate("/product/" + id);
  };

  return (
    <Card sx={{ maxWidth: 400, width: "100%", minHeight: 400 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Product"
          image={images[0]}
          title={title}
          sx={{ height: '250px', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
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
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          sx={{ fontSize: "1rem", marginBottom: 2 }}
          onClick={handleAddToCart}
          color="secondary"
        >
          Añadir al carro
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductsCard;
