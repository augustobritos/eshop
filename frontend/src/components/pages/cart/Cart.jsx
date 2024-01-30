import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../../redux/cartSlice";

import CustomerForm from "./CustomerForm";
import CartSummary from "./CartSummary";
import Checkout from "./Checkout";
import EmptyCart from "./EmptyCart";
import ContinueButton from "./ContinueButton";

//ui
import { Container } from "../../ui/Index";
import Progression from "./ui/Progression";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.items;
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [formDataFilled, setFormDataFilled] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    console.log("handleBack");
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  

  const onUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const onRemoveProduct = (product) => {
    dispatch(removeFromCart(product));
  };

  const onContinue = () => {
    handleNext();
  };

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => {
        return total + Number(item.price) * Number(item.quantity);
      }, 0)
      .toFixed(2);
  };

  const onFormDataChange = (data) => {
    const filled = Object.values(data).every((value) => value.trim() !== "");
    setFormDataFilled(filled);
    setCustomerData(data);
  };

  return (
    <Container className="bg-white rounded-lg p-18 my-24">
      {/* Summary section */}

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Progression activeStep={activeStep} onBack={() => handleBack()} />
      )}

      {cartItems.length > 0 && activeStep === 0 && (
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
          <ContinueButton onClick={onContinue} disabled={formDataFilled} />
        </>
      )}

      {/* Form section */}
      {activeStep === 1 && (
        <>
          <CustomerForm onFormDataChange={onFormDataChange} />
          <ContinueButton
            onClick={onContinue}
            formDataFilled={formDataFilled}
          />
        </>
      )}

      {/* Checkout section */}
      {activeStep === 2 && (
        <>
          <Checkout items={cartItems} total={getTotal()} customerData={customerData} />
        </>
      )}
    </Container>
  );
}

export default Cart;
