import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchStock } from "../../../redux/middlewares/stockThunk";
import {
  addToCart,
  removeUnitFromCart,
  removeFromCart,
} from "../../../redux/cartSlice";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function CartSummary({ item }) {
  const dispatch = useDispatch();
  const { id, title, quantity, image, price } = item;

  const { stock, loading, error } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch]);

  const handleRemoveUnity = () => {
    dispatch(removeUnitFromCart(item));
  };

  const handleAddToCart = () => {
    const productIndex = stock.findIndex((item) => item.id === id);
    const productStock = stock[productIndex].quantity;
    const product = { id, quantity: productStock };
    dispatch(addToCart(product));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item));
  };

  const checkStock = () => {
    const productIndex = stock.findIndex((item) => item.id === id);
    const productStock = stock[productIndex].quantity;

    if (quantity < productStock) {
      return false;
    } else {
      return true;
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Card
      key={id}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 3,
        padding: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          minWidth: { xs: 70, md: 70 },
          minHeight: { xs: 70, md: 70 },
          width: { xs: 70, md: 70 },
          height: { xs: 70, md: 70 },
          objectFit: "contain",
        }}
        image={image}
        alt={title}
      />

      <CardContent
        sx={{
          flex: "1 1 auto",
          minWidth: { xs: "auto", md: 100 },
          marginRight: { xs: 0, md: 4 },
        }}
      >
        <Typography variant="h5" color="textSecondary">
          {title}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          flex: "0 0 auto",
          minWidth: 100,
          padding: 1,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" color="textPrimary" sx={{ fontSize: 20 }}>
          $ {(Number(price) * Number(quantity)).toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          flex: "0 0 auto",
          minWidth: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton color="error" onClick={handleRemoveUnity}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1">{quantity}</Typography>
        <IconButton
          color="success"
          onClick={handleAddToCart}
          disabled={checkStock()}
        >
          <AddIcon />
        </IconButton>
      </CardActions>

      <IconButton color="error" onClick={handleRemove}>
        <RemoveShoppingCartIcon />
      </IconButton>
    </Card>
  );
}

export default CartSummary;
