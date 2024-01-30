function ContinueButton({ onClick, step }) {
  const onCheckout = () => {
    onClick(step);
    console.log("oncontinue");
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-3 mt-4 rounded-full w-full"
      onClick={onCheckout}
    >
      Continuar
    </button>
  );
}

export default ContinueButton;
