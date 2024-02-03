import { Button } from "@mui/material";

function ContinueButton({ onClick, disabled }) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={disabled}
      fullWidth
      style={{ marginTop: "1rem", borderRadius: "999px" }}
    >
      Continuar
    </Button>
  );
}

export default ContinueButton;
