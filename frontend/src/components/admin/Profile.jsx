import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Container, Grid, Card, TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Profile = () => {
  const { user, updateProfile, getEnabledPayments, updateEnabledPayments } =
    useAuth();

  const [userData, setUserData] = useState({
    user: user,
  });

  const [payments, setPayments] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleSave = () => {
    updateProfile(userData.user)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => console.error(error));
  };

  const handlePaymentToggle = (paymentMethod) => {
    if (
      window.confirm(
        `¿Estás seguro de modificar el método de pago: ${paymentMethod} ?`
      )
    ) {
      const updatedPayments = {
        ...payments,
        [paymentMethod]: !payments[paymentMethod],
      };
      updateEnabledPayments(updatedPayments)
        .then((res) => {
          console.error(res);
          setPayments(updatedPayments);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getEnabledPayments();
        setPayments(response);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} md={12} lg={12}>
          <Card variant="outlined" sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ marginTop:5, textAlign: 'center' }}>{userData.user.name}</Typography>
            <Box sx={{ display: 'grid', gap: '1rem' }}>
              <TextField
                label="Name"
                name="name"
                value={userData.user.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
              />
              <TextField
                label="Email"
                name="email"
                value={userData.user.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                disabled={!isEditing}
              />
              {isEditing && (
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  value={userData.user.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              )}
              <div>
                <Button
                  onClick={handleEditToggle}
                  variant="contained"
                  color="primary"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
                {isEditing && (
                  <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                  </Button>
                )}
              </div>
              <div>
                <Typography variant="h5" gutterBottom sx={{ marginTop:5, textAlign: 'center' }}>Medios de Pago</Typography>
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
                      <TableRow>
                        <TableCell>MercadoPago</TableCell>
                        <TableCell>{payments?.mercadopago ? "Activado" : "Desactivado"}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handlePaymentToggle("mercadopago")}
                            variant="contained"
                            color={payments?.mercadopago ? "secondary" : "primary"}
                          >
                            {payments?.mercadopago ? "Desactivar" : "Activar"} 
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Paypal</TableCell>
                        <TableCell>{payments?.paypal ? "Activado" : "Desactivado"}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handlePaymentToggle("paypal")}
                            variant="contained"
                            color={payments?.paypal ? "secondary" : "primary"}
                          >
                            {payments?.paypal ? "Desactivar" : "Activar"}
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Stripe</TableCell>
                        <TableCell>{payments?.stripe ? "Activado" : "Desactivado"}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handlePaymentToggle("stripe")}
                            variant="contained"
                            color={payments?.stripe ? "secondary" : "primary"}
                          >
                            {payments?.stripe ? "Desactivar" : "Activar"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
