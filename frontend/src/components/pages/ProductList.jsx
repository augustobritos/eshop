import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStock } from "../../redux/middlewares/stockThunk";

import ProductsCard from "../ui/products/ProductsCard";
import { Container, Typography, Grid } from "@material-ui/core";
import { CircularProgress, Box } from "@mui/material";

import Error from "../ui/Error";

function ProductList() {
  const location = useLocation();
  const matchingItems = location.state ? location.state.matchingItems : [];
  const { stock, loading, error } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(location.state); // it works
    dispatch(fetchStock());
  }, [dispatch, location]);

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
    return <Error errorMessage={error} />;
  }

  if (matchingItems.length === 0) {
    return (
      <Box sx={{ padding: 'auto', margin: 'auto', mt:50 }} >
        <Typography variant="h4" color="secondary" align="center">
          No hay coincidencias :(
        </Typography>
      </Box>
    );
  }

  return (
    <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Grid container spacing={4}>
        {matchingItems &&
          matchingItems.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductsCard product={product} stock={stock} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ProductList;
