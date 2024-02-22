import Typography from "@mui/material/Typography";

function Empty({ message }) {
  return (
    <Typography
      variant="h4"
      color="text.secondary"
      align="center"
      sx={{
        maxWidth: 1000,
        width: 1000,
        maxHeight: 1000,
        height: 1000,
        margin: "auto",
        mt: 20,
      }}
    >
      {message}
    </Typography>
  );
}

export default Empty;
