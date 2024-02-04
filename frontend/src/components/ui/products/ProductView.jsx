import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import {
  Container,
  Box,
  Card,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { fetchProduct } from "../../../redux/middlewares/stockThunk.js";

function ProductView() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const handleAddToCart = async () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (params.id) {
          const product = await fetchProduct(params.id);
          setProduct(product);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [params.id]);

  return (
    <Container maxWidth="md">
      <Card sx={{ mx: "auto", my: 4, py: 4, boxShadow: 8 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              {product ? product.title : ""}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 4,
                overflow: "hidden",
                fontWeight: "bold",
              }}
            >
              <img
                src={product ? product.image : ""}
                height={500}
                width={500}
                alt={product ? product.title : ""}
              />
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              $ {product ? product.price : ""}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
              sx={{ padding: 2 }}
            >
              {product ? product.description : ""}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 4,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon /> Añadir a la cesta
              </Button>
            </Box>
          </>
        )}
      </Card>
    </Container>
  );
}

export default ProductView;
