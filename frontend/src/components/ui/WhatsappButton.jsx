import { FaWhatsapp } from "react-icons/fa";

function WhatsappButton() {
  const openWhatsApp = () => {
    // Replace '123456789' with the recipient's phone number
    const phoneNumber = "+5493518656727";
    const message = "YOU ARE AWESOME !";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button className="text-green-500 text-5xl font-bold py-2 px-4 rounded fixed bottom-32 right-36" onClick={openWhatsApp}>
      <FaWhatsapp />
    </button>
  );
}

export default WhatsappButton;
