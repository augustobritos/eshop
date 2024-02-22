import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner = ({ sx, props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        width: "100%", 
        ...sx,
      }}
      {...props}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
