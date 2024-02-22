import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Empty({ message }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        mx: "auto",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h3" color="secondary">
        {message}
      </Typography>
    </Box>
  );
}

export default Empty;
