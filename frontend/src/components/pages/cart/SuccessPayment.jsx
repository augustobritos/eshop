const SuccessPayment = ({ paymentId }) => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-20">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src="/path/to/image.jpg"
            alt="Transaction"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
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
