import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStock } from "../../redux/middlewares/stockThunk";

import ProductsAdminCard from "./ui/ProductsAdminCard";
import { Container, Grid, Typography } from "@material-ui/core";
import { Empty } from "../ui/alerts/index.js";

function Products() {
  const { stock, loading, error } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch]);

  if (stock.length === 0) {
    return <Empty message="No hay productos cargados aún!" />;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        {stock &&
          stock.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
              <ProductsAdminCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Products;
