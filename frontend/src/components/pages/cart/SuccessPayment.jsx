import { Box, Card, Container, Grid, Typography } from "@mui/material";

const SuccessPayment = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Card sx={{ mx: "auto", boxShadow: "md" }}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              justifyContent="center"
              m={1}
              component="img"
              src="success.jpg"
              style={{ objectFit: "cover", padding: "5px" }}
              height="auto"
              width="auto"
            ></Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box p={1} mt={{ xs: 2, md: 0 }}>
              <Typography
                variant="subtitle1"
                color="primary"
                gutterBottom
                textAlign="center"
              >
                Muchas Gracias por elegirnos!
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                gutterBottom
              >
                Pronto recibiras mas informacion de tu compra
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default SuccessPayment;
