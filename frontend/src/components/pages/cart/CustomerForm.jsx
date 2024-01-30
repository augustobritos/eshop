import { useState } from "react";
import { Card, Input, Label } from "../../ui/Index";

function CustomerForm() {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  return (
    <Card className="mb-5 border border-solid border-gray-300 rounded-2xl p-4 shadow-md">
      {/*RIGHT SIDE */}
      {/* Customer data input fields */}
      <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Nombre
      </Label>
      <Input
        type="text"
        name="name"
        id="name"
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        value={customerData.name}
        onChange={onInputChange}
      />
      <Label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </Label>
      <Input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        value={customerData.email}
        onChange={onInputChange}
      />
      <Label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
      >
        Telefono
      </Label>
      <Input
        type="text"
        name="phone"
        id="phone"
        autoComplete="phone"
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        value={customerData.phone}
        onChange={onInputChange}
      />
      <Label
        htmlFor="address"
        className="block text-sm font-medium text-gray-700"
      >
        Direccion
      </Label>
      <textarea
        id="address"
        name="address"
        rows={3}
        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
        value={customerData.address}
        onChange={onInputChange}
      />
    </Card>
  );
}

export default CustomerForm;
