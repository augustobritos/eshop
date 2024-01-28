import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Container, Card, Button, Label } from "../ui/Index";

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
      .then((res) => {
        console.log(res);
        setIsEditing(false); // Exit edit mode after successful save
      })
      .catch((error) => console.error(error));
  };

  const handlePaymentToggle = (paymentMethod) => {
    if (window.confirm("Are you sure you want to modify the payment method?")) {
      const updatedPayments = {
        ...payments,
        [paymentMethod]: !payments[paymentMethod],
      };
      updateEnabledPayments(updatedPayments)
        .then((res) => {
          console.log(res);
          setPayments(updatedPayments); // Update the payments state after successful update
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
    <Container className="flex flex-col items-center justify-center min-h-screen">
      <Card className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden max-w-xl p-8 space-y-7">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
        <div className="space-y-4">
          <div>
            <Label>Name:</Label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.user.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-gray-700">{userData.user.name}</p>
            )}
          </div>
          <div>
            <Label>Email:</Label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.user.email}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ) : (
              <p className="text-gray-700">{userData.user.email}</p>
            )}
          </div>
          {isEditing && (
            <div>
              <Label>Password:</Label>
              <input
                type="password"
                name="password"
                value={userData.user.password}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <Button
              onClick={handleEditToggle}
              className="bg-yellow-500 text-white rounded hover:bg-yellow-700"
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                onClick={handleSave}
                className="bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Save
              </Button>
            )}
          </div>
          <div>
            <Label>Payment Options:</Label>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">MercadoPago:</span>
                <span
                  className={`text-${
                    payments?.mercadopago ? "green" : "red"
                  }-500`}
                >
                  {payments?.mercadopago ? "Enabled" : "Disabled"}
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">Stripe:</span>
                <span
                  className={`text-${payments?.stripe ? "green" : "red"}-500`}
                >
                  {payments?.stripe ? "Enabled" : "Disabled"}
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">PayPal:</span>
                <span
                  className={`text-${payments?.paypal ? "green" : "red"}-500`}
                >
                  {payments?.paypal ? "Enabled" : "Disabled"}
                </span>
              </li>
            </ul>

            <Card>
              <button
                onClick={() => handlePaymentToggle("paypal")}
                className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-700 w-full"
              >
                {payments?.paypal ? "Disable PayPal" : "Enable PayPal"}
              </button>
              <button
                onClick={() => handlePaymentToggle("stripe")}
                className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700 w-full"
              >
                {payments?.stripe ? "Disable Stripe" : "Enable Stripe"}
              </button>
              <button
                onClick={() => handlePaymentToggle("mercadopago")}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
              >
                {payments?.mercadopago
                  ? "Disable MercadoPago"
                  : "Enable MercadoPago"}
              </button>
            </Card>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;
