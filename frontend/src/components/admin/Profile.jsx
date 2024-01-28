import { useAuth } from "../../context/AuthContext";
import { useState } from 'react';

const Profile = () => {

 const { user } = useAuth();

 const [userData, setUserData] = useState({
    user
 });

 const handlePaymentToggle = (paymentProvider) => {

  if(window.confirm('Estas seguro de modificar el metodo de pago?'))

    setUserData(prevData => ({
      ...prevData,
      user: {
        ...prevData.user,
        payment: {
          ...prevData.user.payment,
          [paymentProvider]: !prevData.user.payment[paymentProvider]
        }
      }
    }));
 };

 return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden max-w-xl p-8 space-y-8">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <div>
          <p className="text-gray-700">Name: {userData.user.name}</p>
          <p className="text-gray-700">Email: {userData.user.email}</p>
          <p className="text-gray-700">Payment Options:</p>
          <ul className="list-disc list-inside text-gray-700">
            <li>MercadoPago: {userData.user.payment.mp ? 'Enabled' : 'Disabled'}</li>
            <li>Stripe: {userData.user.payment.stripe ? 'Enabled' : 'Disabled'}</li>
            <li>PayPal: {userData.user.payment.paypal ? 'Enabled' : 'Disabled'}</li>
          </ul>
          <button onClick={() => handlePaymentToggle('paypal')} className="mt-4 px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-700 w-full">
            {userData.user.payment.paypal ? 'Disable PayPal' : 'Enable PayPal'}
          </button>
          <button onClick={() => handlePaymentToggle('stripe')} className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-700 w-full">
            {userData.user.payment.stripe ? 'Disable Stripe' : 'Enable Stripe'}
          </button>
          <button onClick={() => handlePaymentToggle('mp')} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 w-full">
            {userData.user.payment.mp ? 'Disable MercadoPago' : 'Enable MercadoPago'}
          </button>
          
        </div>
      </div>
    </div>
 );
};

export default Profile;
