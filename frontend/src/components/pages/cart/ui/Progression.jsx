import { Step, Stepper, StepLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Progression({ activeStep, onBack }) {
  const steps = ["Revisa tu compra", "Completa tu informacion", "Paga y Disfruta"];

  const isStepOptional = (step) => {
    // Implement your logic for optional steps
    return false;
  };

  const isStepSkipped = (step) => {
    // Implement your logic for skipped steps
    return false;
  };

  return (
    <Box className="my-4">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <button onClick={onBack}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </button>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}

export default Progression;
