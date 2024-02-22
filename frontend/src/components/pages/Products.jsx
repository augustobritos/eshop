import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStock } from "../../redux/middlewares/stockThunk";

import { Empty, LoadingSpinner, ErrorScreen } from "../ui/alerts/index.js";
import ProductsCard from "../ui/products/ProductsCard";
import { Button, Container, Grid, Hidden, Typography } from "@material-ui/core";

function Products() {
  const { stock, loading, error } = useSelector((state) => state.stock);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch]);

  useEffect(() => {
    if (stock && stock.length > 0) {
      const uniqueCategories = [...new Set(stock.map((item) => item.category))];
      setCategories(uniqueCategories);
    }
  }, [stock]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Update selected category
    // perform filtering products by category
  };

  const filteredStock = selectedCategory
    ? stock.filter((product) => product.category === selectedCategory)
    : stock;

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
      <Grid container spacing={2}>
        {/* Categories */}
        <Hidden mdDown>
          <Grid item xs={2} style={{ mt: 10 }}>
            <Typography variant="body1" color="primary">CATEGORIAS</Typography>
            {categories &&
              categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  color={
                    selectedCategory === category ? "secondary" : "inherit"
                  }
                  sx={{ display: "block", my: 1 }} 
                >
                  {category}
                </Button>
              ))}
          </Grid>
        </Hidden>

        {/* Products */}
        <Grid item xs={12} md={categories ? 10 : 12}>
          <Grid container spacing={2}>
            {" "}
            {/* Container for products */}
            {stock &&
              filteredStock.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductsCard product={product} stock={stock} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Products;
