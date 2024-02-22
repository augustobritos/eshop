import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  LoadingSpinner,
  SuccessAlert,
  WarningAlert,
} from "../ui/alerts/index.js";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PaymentsTable from "./PaymentsTable.jsx";
import ProfileDetails from "./ProfileDetails.jsx";

const Profile = () => {
  const { user, updateProfile, getEnabledPayments, updateEnabledPayments } =
    useAuth();

  const [userData, setUserData] = useState({
    user: user,
  });

  const [payments, setPayments] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [warningMessages, setWarningMessages] = useState([]);

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

  const handleSave = async () => {
    const res = updateProfile(userData.user);

    if (res) {
      setIsEditing(false);
    }
  };

  const handlePaymentToggle = async (paymentMethod) => {
    if (
      window.confirm(
        `¿Estás seguro de modificar el método de pago: ${paymentMethod} ?`
      )
    ) {
      const updatedPayments = {
        ...payments,
        [paymentMethod]: !payments[paymentMethod],
      };

      const res = await updateEnabledPayments(updatedPayments);

      if (res) {
        console.log(res);
        setPayments(updatedPayments);
        setSuccessMessages((prevMessages) => [...prevMessages, res.message]);
      }

      /*updateEnabledPayments(updatedPayments)
        .then(() => {
          setPayments(updatedPayments);
        })
        .catch((error) => console.error(error));*/
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
            <Box>
              {successMessages &&
                successMessages.length > 0 &&
                successMessages.map((msg, index) => (
                  <SuccessAlert key={index} message={msg} />
                ))}
              {warningMessages && warningMessages.length > 0 && (
                <WarningAlert message={warningMessages} />
              )}
            </Box>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ marginTop: 5, textAlign: "center" }}
            >
              {userData.user.name}
            </Typography>
            <Box sx={{ display: "grid", gap: "1rem" }}>
              <ProfileDetails
                userData={userData}
                isEditing={isEditing}
                onInputChange={handleInputChange}
                onEditToggle={handleEditToggle}
                onSave={handleSave}
              />

              <PaymentsTable
                payments={payments}
                onClick={handlePaymentToggle}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
