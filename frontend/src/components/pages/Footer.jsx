const Footer = () => {
    return (
        <footer className="flex flex-wrap items-center justify-center bg-gray-100 p-12 mt-auto">
            <div className="w-full md:w-1/2 lg:w-1/4">
                <h2 className="font-bold text-xl mb-4">About Us</h2>
                <p className="text-gray-700">We offer the finest selection of luxury homes in the city. Experience the ultimate in luxury living with our stunning interiors, cutting-edge technology, and unmatched comfort.</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mt-6 md:mt-0 md:ml-6">
                <h2 className="font-bold text-xl mb-4">Quick Links</h2>
                <ul className="list-none text-gray-700">
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">Properties</a></li>
                    <li><a href="#" className="hover:underline">About Us</a></li>
                    <li><a href="#" className="hover:underline">Contact Us</a></li>
                </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mt-6 md:mt-0 md:ml-6">
                <h2 className="font-bold text-xl mb-4">Connect With Us</h2>
                <ul className="list-none text-gray-700">
                    <li><a href="#" className="hover:underline">Facebook</a></li>
                    <li><a href="#" className="hover:underline">Twitter</a></li>
                    <li><a href="#" className="hover:underline">Instagram</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
