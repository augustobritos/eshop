import { Box, Card, Container, Grid, Typography } from "@mui/material";

function Contact() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Card>
        <Grid container alignItems="center">
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center" m={2}>
              <img
                height="auto"
                width="auto"
                style={{ objectFit: "cover", padding: "5px" }}
                src="contacto.png"
                alt="Contact"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box p={2}>
              <Typography
                variant="subtitle1"
                color="primary"
                align="center"
                gutterBottom
              >
                Contactanos
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                gutterBottom
              >
                Puedes contactarte vía SMS, llamada o WhatsApp.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                gutterBottom
              >
                Nuestros horarios de atención son:
              </Typography>
              <Typography variant="body1" align="center">
                Lunes a Viernes de 9:00 a 12:00 y de 14:00 a 18:00.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Contact;
