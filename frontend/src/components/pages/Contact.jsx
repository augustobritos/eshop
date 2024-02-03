import { Card, Box, Typography } from "@mui/material";

function Contact() {
  return (
    <Card sx={{ maxHeight: "md", mx: "auto", py: 10, my: 10 }}>
      <Box display="flex" m={1} p={1} justifyContent="center">
        <Box flex="none">
          <img
            height="80px"
            width="100%"
            style={{ objectFit: "cover", padding: "5px" }}
            src="contacto.png"
            alt="Contact"
          />
        </Box>
        <Box p={1} marginTop={25}>
          <Typography
            variant="subtitle1"
            color="primary"
            align="center"
            gutterBottom
          >
            Contactanos
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Puedes contactarte vía SMS, llamada o WhatsApp.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Nuestros horarios de atención son:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lunes a Viernes de 9:00 a 12:00 y de 14:00 a 18:00.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default Contact;
