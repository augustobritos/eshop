const SuccessPayment = ({transaction = { id: 1, amount: 250}}) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-20">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src="/path/to/image.jpg" alt="Transaction"/>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Successful Payment</div>
                    <p className="mt-2 text-gray-500">Transaction ID: {transaction.id}</p>
                    <p className="mt-2 text-gray-500">Amount: ${transaction.amount}</p>
                    <p className="mt-2 text-gray-500">Date: 01/02/2024</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessPayment;
