
// const Footer = () => {
//     return (
//         <>
//             <div className="h-20 border shadow flex justify-center gap-20 items-center">


//                 <div className="">
//                     <p>@ All rights reserver || Designed and Developed by Rakesh Kumar Parida</p>
//                 </div>

//                 {/* Social icons :  */}

//                 <div className="text-2xl flex gap-5">
//                     <div className="border rounded-full shadow px-2 py-1 hover:shadow-green-500">
//                         <i className="bi bi-linkedin"></i>
//                     </div>

//                     <div className="border rounded-full shadow px-2 py-1 hover:shadow-green-500">
//                         <i className="bi bi-github"></i>
//                     </div>

//                     <div className="border rounded-full shadow  px-2 py-1 hover:shadow-green-500">
//                         <i className="bi bi-twitter"></i>
//                     </div>

//                     <div className="border rounded-full shadow px-2 py-1 hover:shadow-green-500">
//                         <i className="bi bi-instagram"></i>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Footer


import React from "react";
import { Input } from "./ui/input";

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t mt-20 text-gray-700 py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Customer Service */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
                    <ul className="space-y-2">
                        <li>Contact Us</li>
                        <li>Sell With Us</li>
                        <li>Shipping</li>
                    </ul>
                </div>

                {/* Column 2: Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Links</h2>
                    <ul className="space-y-2">
                        <li>Contact Us</li>
                        <li>Sell With Us</li>
                        <li>Shipping</li>
                    </ul>
                </div>

                {/* Column 3: Newsletter */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
                    <p className="text-gray-400 mb-4">Sign Up for Our Newsletter</p>
                    <form className="flex flex-col space-y-4">
                        <Input
                            type="email"
                            placeholder="Please Enter Your Email"
                            className="p-2 rounded-md bg-white border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 text-center text-gray-500 text-sm">
                © 2024 MERN Store
            </div>
        </footer>
    );
};

export default Footer;
