import {
    CircularProgress,
    Box,
  } from "@mui/material";

const LoadingSpinner = ({ props }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...props }} >
          <CircularProgress />
        </Box>
  )
}

export default LoadingSpinner;