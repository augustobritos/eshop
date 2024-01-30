import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../../redux/cartSlice";

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
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.items;
  const dispatch = useDispatch();
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
    const url = window.location.href;
    const params = new URLSearchParams(url);
    const paymentIdValue = params.get("payment_id");
    setPaymentId(paymentIdValue);
  }, []);

  const onUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    } 
  };

  const onRemoveProduct = (product) => {
    dispatch(removeFromCart(product));
  };

  const onContinue = (step) => {
    setSteps(step);
    handleNext();
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
      }, 0)
      .toFixed(2);
  };

  return (
    <Container className="bg-white rounded-lg p-18 my-24">
      {/* Summary section */}

      {cartItems.length === 0 && !paymentId ? (
        <EmptyCart />
      ) : (
        <Progression activeStep={activeStep} />
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
            <p className="text-xl font-bold mx-2">$ {getTotal()}</p>
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
          <Checkout items={cartItems} total={getTotal()}/>
          
        </>
      )}

      {/* Result section */}
      {paymentId && <SuccessPayment paymentId={paymentId} />}
    </Container>
  );
}

export default Cart;
