import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStock } from "../../redux/middlewares/stockThunk";

import ProductsCard from "../ui/products/ProductsCard";
import { Container, Typography, Grid } from "@material-ui/core";

import Error from "../ui/Error";
import Loading from "../ui/Loading";

function Products() {
  const { stock, loading, error } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  if (stock.length === 0) {
    return (
      <Container style={{ marginTop: "2rem" }}>
        <Typography variant="h4" color="textSecondary" align="center">
          No hay productos cargados aun!
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Grid container spacing={4}>
        {stock &&
          stock.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductsCard product={product} stock={stock} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Products;
