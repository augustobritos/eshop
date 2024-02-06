import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../../redux/cartSlice";
import { fetchProduct } from "../../../redux/middlewares/stockThunk.js";

import {
  Container,
  Box,
  Card,
  CardMedia,
  IconButton,
  Button,
  Typography,
  CircularProgress,
  ImageList,
  ImageListItem,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function ProductView() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleAddToCart = async () => {
    dispatch(addToCart(product));
  };

  // Handlers for changing images
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (params.id) {
          const product = await fetchProduct(params.id);
          setProduct(product);
          if (product) {
            setImages(product.images);
          }
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
      <Card sx={{ mx: "auto", py: 4, boxShadow: 8 }}>
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
                py: 1,
                overflow: "hidden",
                fontWeight: "bold",
              }}
            >
              <IconButton
                onClick={handlePreviousImage}
                disabled={images.length === 0}
                aria-label="previous image"
              >
                <ArrowLeftIcon />
              </IconButton>
              <CardMedia
                component="img"
                src={images[currentImageIndex]}
                alt={product ? product.title : ""}
                sx={{
                  height:  650,
                  maxHeight: '650px',
                  width: 500,
                  maxWidth: '500px',
                  objectFit: 'cover',
                }}
              />
              <IconButton
                onClick={handleNextImage}
                disabled={images.length === 0}
                aria-label="next image"
              >
                <ArrowRightIcon />
              </IconButton>
            </Box>
            <Box sx={{ mt: 1, mx: 10 }}>
              <ImageList cols={12} gap={16}>
                {images.map((imgUrl, index) => (
                  <ImageListItem key={imgUrl} sx={{ border: index === currentImageIndex ? '2px solid #f00' : 'none' }}>
                    <CardMedia
                      component="img"
                      src={imgUrl}
                      alt={`Product ${index}`}
                      width={100}
                      height={100}
                      onClick={() => handleImageClick(index)}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
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
