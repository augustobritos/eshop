import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchStock } from "../../redux/middlewares/stockThunk";
import ProductsCard from "../ui/products/ProductsCard";

import { Box, Container, Typography, Grid } from "@material-ui/core";
import { Empty, LoadingSpinner, ErrorScreen } from "../ui/alerts/index.js";

function ProductList() {
  const location = useLocation();
  const matchingItems = location.state ? location.state.matchingItems : [];
  const { stock, loading, error } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch, location]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorScreen errorMessage={error} />;
  }

  if (matchingItems.length === 0) {
    return <Empty message=" No hay coincidencias :(" />;
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
