import {Card} from "../ui/Index";

function Contact() {
  return (
    <Card className="max-w-md mx-auto bg-white rounded-3xl shadow-md overflow-hidden md:max-w-3xl py-10">
      <div className="md:flex my-10">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48 p-5" src="contacto.png" alt="Contact"/>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-green-500 font-semibold mb-4 flex justify-center items-center">Contactanos</div>
          <p className="mt-2 text-gray-500 mb-4">Puedes contactarte via sms, llamada o Whatsapp.</p>
          <p className="mt-2 text-gray-500 mb-4">Nuestros horarios de atencion son</p>
          <p>Lunes a Viernes de 9:00 a 12:00 y de 14:00 a 18:00.</p>
        </div>
      </div>
    </Card>
  )
}

export default Contact