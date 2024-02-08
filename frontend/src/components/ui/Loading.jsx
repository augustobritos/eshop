import {
    CircularProgress,
    Box,
  } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ padding: 'auto', margin: 'auto', mt: 50 }} >
          <CircularProgress />
        </Box>
  )
}

export default Loading