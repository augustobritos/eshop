import { Button, Grid, Hidden, Typography } from "@material-ui/core";

const Categories = ({ categories, handleCategorySelect, selectedCategory }) => {
  return (
    <Hidden mdDown>
      <Grid item xs={2} style={{ mt: 10 }}>
        <Typography variant="body1" color="primary">
          CATEGORIAS
        </Typography>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategorySelect(category)}
            color={selectedCategory === category ? "secondary" : "inherit"}
            sx={{ display: "block", my: 1 }}
          >
            {category}
          </Button>
        ))}
      </Grid>
    </Hidden>
  );
};

export default Categories;
