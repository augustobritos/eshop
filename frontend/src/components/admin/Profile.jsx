import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Container, Card, Button, TextField, Grid } from "@material-ui/core";

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
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={8} lg={6}>
          <Card variant="outlined" style={{ padding: '20px' }}>
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            <div className="space-y-4">
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
                <h3>Payment Options:</h3>
                <ul>
                  <li>
                    <span>MercadoPago:</span>{" "}
                    <span>{payments?.mercadopago ? "Activado" : "Desactivado"}</span>
                    <Button
                      onClick={() => handlePaymentToggle("mercadopago")}
                      variant="contained"
                      color={payments?.mercadopago ? "secondary" : "primary"}
                    >
                      {payments?.mercadopago
                        ? "Desactivar MercadoPago"
                        : "Activar MercadoPago"}
                    </Button>
                  </li>
                  <li>
                    <span>Paypal:</span>{" "}
                    <span>{payments?.paypal ? "Activado" : "Desactivado"}</span>
                    <Button
                      onClick={() => handlePaymentToggle("paypal")}
                      variant="contained"
                      color={payments?.paypal ? "secondary" : "primary"}
                    >
                      {payments?.mercadopago
                        ? "Desactivar Paypal"
                        : "Activar Paypal"}
                    </Button>
                  </li>
                  <li>
                    <span>Stripe:</span>{" "}
                    <span>{payments?.stripe ? "Activado" : "Desactivado"}</span>
                    <Button
                      onClick={() => handlePaymentToggle("stripe")}
                      variant="contained"
                      color={payments?.stripe ? "secondary" : "primary"}
                    >
                      {payments?.stripe
                        ? "Desactivar Stripe"
                        : "Activar Stripe"}
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
