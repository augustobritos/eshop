import React from 'react'

function ErrorPayment() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-md overflow-hidden md:max-w-2xl py-10">
      <div className="md:flex my-10">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48 p-5"
            src="sorry.jpg"
            alt="Transaction"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-red-500 font-semibold my-5">
            Lamentamos que tu compra no pudo ser procesada.
          </div>
          <div>
          Por favor elige otro medio de pago o intenta nuevamente mas tarde.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPayment