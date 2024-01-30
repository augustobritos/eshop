import { useState, useEffect } from "react";

import { useCart } from "../../../context/CartContext";
import CustomerForm from "./CustomerForm";
import CartSummary from "./CartSummary";
import Checkout from "./Checkout";
import EmptyCart from "./EmptyCart";
import ContinueButton from "./ContinueButton";
import SuccessPayment from "./SuccessPayment";

//ui
import { Container } from "../../ui/Index";
import Progression from "./ui/Progression";

function Cart() {
  const { cartItems, getCartTotal, removeFromCart, updateQuantity } = useCart();
  const [activeStep, setActiveStep] = useState(0);

  const [steps, setSteps] = useState(1);

  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    // Get the URL string from window.location
    const url = window.location.href;

    // Use URLSearchParams to parse the URL
    const params = new URLSearchParams(url);

    // Get the value of the payment_id parameter
    const paymentIdValue = params.get("payment_id");

    console.log(paymentIdValue);

    // Update the state with the payment ID value
    setPaymentId(paymentIdValue);
  }, []);

  const onUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const onRemoveProduct = (product) => {
    removeFromCart(product);
  };

  const onContinue = (step) => {
    // handle logic for continue button
    console.log("continue");
    setSteps(step);
    handleNext();
  };

  return (
    <Container className="bg-white rounded-lg p-18 my-24">
      {/* Summary section */}

      {cartItems.length === 0 && !paymentId ? (
        <EmptyCart />
      ) : (
        <Progression activeStep={activeStep}/>
      )}

      {cartItems.length > 0 && steps === 1 && (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              {
                <CartSummary
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveProduct={onRemoveProduct}
                />
              }
            </div>
          ))}
          <div className="flex items-center justify-center p-7 mb-2">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold mx-2">$ {getCartTotal()}</p>
          </div>
          <ContinueButton onClick={onContinue} step={2} />
        </>
      )}

      {/* Form section */}
      {steps === 2 && (
        <>
          <CustomerForm />
          <ContinueButton onClick={onContinue} step={3} />
        </>
      )}

      {/* Checkout section */}
      {steps === 3 && (
        <>
          <Checkout />
          <ContinueButton onClick={onContinue} step={4} />
        </>
      )}

      {/* Result section */}
      {paymentId && <SuccessPayment paymentId={paymentId} />}
    </Container>
  );
}

export default Cart;
