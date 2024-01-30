import { useState, useEffect } from "react";

const SuccessPayment = () => {

  const [paymentId, setPaymentId] = useState(null);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  useEffect(() => {
    const url = window.location.href;
    const params = new URLSearchParams(url);
    const paymentIdValue = params.get("payment_id");
    setPaymentId(paymentIdValue);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-md overflow-hidden md:max-w-2xl py-10">
      <div className="md:flex my-10">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48 p-5"
            src="success.jpg"
            alt="Transaction"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold my-5">
            Muchas Gracias por tu Compra!
          </div>
          <p className="mt-2 text-gray-500">Transaction ID: {paymentId}</p>
          <p className="mt-2 text-gray-500">Amount: ${paymentId}</p>
          <p className="mt-2 text-gray-500">{currentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
