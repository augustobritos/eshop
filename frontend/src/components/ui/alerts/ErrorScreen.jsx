import {
  Typography,
  Button,
  Card,
  Container,
  Box,
  styled,
} from "@mui/material";
import Warning from "./WarningAlert";

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const ErrorScreen = ({ error }) => {
  return (
    <>
      {error && <Warning message={error} />}
      <Container maxWidth="md">
        <Card
          sx={{
            maxWidth: "md",
            mx: "auto",
            boxShadow: "md",
            overflow: "hidden",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src="sorry.jpg"
                alt="Transaction"
                sx={{
                  maxWidth: "300px%",
                  width: "auto",
                  maxHeight: "400px", 
                  height: "auto",
                  objectFit: "cover",
                  padding: "5px",
                  margin: "10px"
                }}
              />
            </Box>
            <Box p={2}>
              <Typography
                variant="subtitle1"
                color="error"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  color: "#EF4444",
                  fontWeight: "600",
                  mb: 1,
                  textAlign: "center"
                }}
                gutterBottom
              >
                El servicio no se encuentra disponible por el momento.
              </Typography>
              <Typography variant="body1" gutterBottom textAlign="center">
                Por favor intenta nuevamente más tarde.
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <CustomButton>Intentar nuevamente</CustomButton>
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default ErrorScreen;
