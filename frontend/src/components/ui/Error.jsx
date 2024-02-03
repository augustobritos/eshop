import { Typography, Button, Card, Box, styled } from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const Error = () => {
  return (
    <Card
      sx={{
        maxWidth: "md",
        mx: "auto",
        boxShadow: "md",
        overflow: "hidden",
        py: 10,
        mt: 10,
        mb: 40,
      }}
    >
      <Box display="flex" m={1} p={1}>
        <Box flex="none">
          <Box
            component="img"
            src="sorry.jpg"
            alt="Transaction"
            sx={{
              maxWidth: "100%",
              maxHeight: "300px", // adjust this value as needed
              height: "auto",
              objectFit: "cover",
              padding: "5px",
            }}
          />
        </Box>
        <Box p={1} pt={15}>
          <Typography
            variant="subtitle1"
            color="error"
            sx={{
              textTransform: "uppercase",
              fontSize: "0.875rem",
              color: "#EF4444",
              fontWeight: "600",
              mb: 1,
            }}
            gutterBottom
          >
            El servicio no se encuentra disponible por el momento.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Por favor intenta nuevamente más tarde.
          </Typography>
          <Box>
            <CustomButton>
                Intentar nuevamente
            </CustomButton>
        </Box>
        </Box>
       
      </Box>
    </Card>
  );
};

export default Error;
