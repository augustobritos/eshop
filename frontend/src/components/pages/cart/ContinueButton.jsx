function ContinueButton({ onClick, formDataFilled = true }) {
  return (
    <button
    className={`bg-green-500 text-white px-4 py-3 mt-4 rounded-full w-full ${formDataFilled ? '' : 'opacity-50 cursor-not-allowed'}`}
      onClick={onClick}
      disabled={!formDataFilled} 
    >
      Continuar
    </button>
  );
}

export default ContinueButton;
