function Contact() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-10">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src="/path-to-your-image.jpg" alt="Contact"/>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Contactanos</div>
          <p className="mt-2 text-gray-500">Puedes contactarte via sms, llamada o Whatsapp.</p>
          <p className="mt-2 text-gray-500">Nuestros horarios de atencion son de 9:00 a 20:00.</p>
        </div>
      </div>
    </div>
  )
}

export default Contact