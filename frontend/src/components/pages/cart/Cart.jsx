import { useState, } from "react";
import { useSelector } from "react-redux";

import CustomerForm from "./CustomerForm";
import CartSummary from "./CartSummary";
import Checkout from "./Checkout";
import EmptyCart from "./EmptyCart";
import ContinueButton from "./ContinueButton";

import { Container, Typography, Grid } from "@material-ui/core";
import Progression from "./ui/Progression";

function Cart({ theme }) {
  const cartItems = useSelector((state) => state.cart.items);
  const [activeStep, setActiveStep] = useState(0);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [formDataFilled, setFormDataFilled] = useState(false);

  const handleContinue = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
      }, 0)
      .toFixed(2);
  };

  const handleFormDataChange = (data) => {
    const filled = Object.values(data).every((value) => value.trim() !== "");
    setFormDataFilled(filled);
    setCustomerData(data);
  };

  return (
    <Container>
      {cartItems.length === 0 && <EmptyCart />}
      {cartItems.length > 0 && (
        <>
          <Progression activeStep={activeStep} onBack={handleBack} />
          {/* Summary Section */}
          {activeStep === 0 && (
            <>
              {cartItems.map((item) => (
                <CartSummary
                  key={item.id}
                  item={item}
                />
              ))}
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h6">Total:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" >$ {getTotal()}</Typography>
                </Grid>
              </Grid>
              <ContinueButton onClick={handleContinue} disabled={false}/>
            </>
          )}
        </>
      )}
      {/* Form section */}
      {activeStep === 1 && (
        <>
          <CustomerForm handleFormDataChange={handleFormDataChange} theme={theme}/>
          <ContinueButton onClick={handleContinue} disabled={!formDataFilled} />
        </>
      )}
      {/* Checkout section */}
      {(activeStep === 2 || activeStep === 3 ) && (
        <Checkout
          items={cartItems}
          total={getTotal()}
          customerData={customerData}
          onClick={handleContinue}
        />
      )}
    </Container>
  );
}

export default Cart;
