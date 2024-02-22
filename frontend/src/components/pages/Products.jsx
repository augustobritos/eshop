import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStock } from "../../redux/middlewares/stockThunk";

import { Empty, LoadingSpinner, ErrorScreen } from "../ui/alerts/index.js";
import ProductsCard from "../ui/products/ProductsCard";
import { makeStyles } from '@mui/styles';
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align left by default
  },
  '@media (max-width: 600px)': {
    gridContainer: {
      justifyContent: 'center', // Center align for mobile devices
    },
  },
}));

function Products() {
  const classes = useStyles();
  const { stock, loading, error } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorScreen errorMessage={error} />;
  }

  if (stock.length === 0) {
    return <Empty message="No hay productos cargados aun!" />;
  }


  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} className={classes.gridContainer}>
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
