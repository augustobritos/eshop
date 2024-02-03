import { useState, useEffect } from "react";
import { Grid, Card, TextField, ThemeProvider } from "@material-ui/core";

function CustomerForm({ handleFormDataChange, theme }) {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Update the customer data and notify parent component of changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...customerData, [name]: value };
    setCustomerData(updatedData);
    handleFormDataChange(updatedData);
  };

  // Notify parent component of initial form data
  useEffect(() => {
    handleFormDataChange(customerData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Card style={{ marginTop: '100px', marginBottom: '50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              variant="outlined"
              className="mt-1 mb-2"
              value={customerData.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              className="mt-1 mb-2"
              value={customerData.email}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phone"
              name="phone"
              label="Telefono"
              variant="outlined"
              className="mt-1 mb-2"
              value={customerData.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="address"
              name="address"
              label="Direccion"
              multiline
              minRows={3}
              variant="outlined"
              className="mt-1"
              value={customerData.address}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
}

export default CustomerForm;
