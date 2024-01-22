function Cart() {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Finalizar compra</h2>
          {/* Add your luxury items here */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">Luxury Item 1</p>
            <p className="text-gray-800">$999.99</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">Luxury Item 2</p>
            <p className="text-gray-800">$1499.99</p>
          </div>
          {/* Total price */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold">$2499.98</p>
          </div>
          {/* Checkout button */}
          <div className="flex justify-center items-center">
          <button className="bg-green-500 text-white px-4 py-2 mt-6 rounded-full">
            Comprar
          </button>
          </div>
        </div>
      );
}

export default Cart