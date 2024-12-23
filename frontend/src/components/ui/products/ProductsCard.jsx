import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { id, title, images, price, quantity } = product;
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleClick = () => {
    navigate("/product/" + id);
  };

  const checkStock = () => {
    if (quantity < 1) {
      return true;
    }
    if (!cart && quantity > 0) {
      console.log("true");
      return false;
    }

    const productInCart = cart.find((item) => item.id === id);

    if (productInCart && quantity <= productInCart.quantity) {
      return true;
    }
    return false;
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Product"
          image={images[0]}
          title={title}
          sx={{ height: "200px", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center">
            {title}
          </Typography>
          <Typography variant="body1" textAlign="center" p={2}>
            $ {price}
          </Typography>
          {quantity < 1 && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
              }}
            >
              No disponible
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          sx={{ fontSize: "1rem", marginBottom: 2 }}
          onClick={handleAddToCart}
          color="secondary"
          disabled={checkStock()}
        >
          Añadir al carro
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductsCard;
