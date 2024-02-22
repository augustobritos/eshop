import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchStock } from "../../redux/middlewares/stockThunk";
import ProductsCard from "../ui/products/ProductsCard";

import { Button, Container, Grid, Hidden, Typography } from "@material-ui/core";
import { Empty, LoadingSpinner, ErrorScreen } from "../ui/alerts/index.js";

function ProductList() {
  const location = useLocation();
  const [matchingItems, setMatchingItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { stock, loading, error } = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
  }, [dispatch, location]);

  useEffect(() => {
    if (location.state && location.state.matchingItems) {
      setSelectedCategory(null);
      setMatchingItems(location.state.matchingItems);
    }
  }, [location.state]);

  useEffect(() => {
    if (stock && stock.length > 0) {
      const uniqueCategories = [...new Set(stock.map((item) => item.category))];
      setCategories(uniqueCategories);
    }
  }, [stock]);

  const handleCategorySelect = (category) => {
    setMatchingItems([]);
    setSelectedCategory(category);
  };

  const filteredStock = selectedCategory
    ? stock.filter((product) => product.category === selectedCategory)
    : stock;

  console.log(filteredStock);
  console.log(matchingItems.length);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorScreen errorMessage={error} />;
  }

  if (
    (matchingItems.length === 0 && !selectedCategory) ||
    (filteredStock.length === 0 && selectedCategory)
  ) {
    return <Empty message=" No hay coincidencias :(" />;
  }

  return (
    <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      <Grid container spacing={4}>
        {/* Categories */}
        <Hidden mdDown>
          <Grid item xs={2} style={{ mt: 10 }}>
            <Typography variant="body1" color="primary">
              CATEGORIAS
            </Typography>
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

        {/* Products from searchBar */}
        {matchingItems && !selectedCategory && (
          <Grid item xs={12} md={categories ? 10 : 12}>
            <Grid container spacing={2}>
              {matchingItems.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductsCard product={product} stock={stock} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* Products from category selected*/}
        {filteredStock && matchingItems.length === 0 && (
          <Grid item xs={12} md={categories ? 10 : 12}>
            <Grid container spacing={2}>
              {filteredStock.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductsCard product={product} stock={stock} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default ProductList;
