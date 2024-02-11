import Typography from "@mui/material/Typography";

function Empty({ message }) {
  return (
    <Typography
      variant="h3"
      color="text.secondary"
      align="center"
      sx={{
        maxWidth: 1000,
        width: 1000,
        maxHeight: 1000,
        height: 1000,
        margin: "auto",
        marginTop: 20,
      }}
    >
      {message}
    </Typography>
  );
}

export default Empty;
