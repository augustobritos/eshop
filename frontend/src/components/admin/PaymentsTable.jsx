import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const PaymentsTable = ({ payments, onClick }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ marginTop: 5, textAlign: "center" }}
        >
          Medios de Pago
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <TableContainer component={Box} sx={{ maxWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Medio de Pago</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { payments && Object.entries(payments).map(([paymentMethod, isActive]) => (
                <TableRow key={paymentMethod}>
                  <TableCell>{paymentMethod}</TableCell>
                  <TableCell>{isActive ? "Activado" : "Desactivado"}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onClick(paymentMethod)}
                      variant="contained"
                      color={isActive ? "secondary" : "primary"}
                    >
                      {isActive ? "Desactivar" : "Activar"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default PaymentsTable;
