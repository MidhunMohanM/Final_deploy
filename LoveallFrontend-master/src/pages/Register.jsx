import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import RegisterUser from "./RegisterUser.jsx"
import RegisterBusiness from "./Business/Register.jsx"

const Register = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(1);

  return (
    <>
      {showPage === 1 && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="max-w-2xl w-full mt-8 bg-white p-8 rounded-lg shadow-xl border-2 border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-center">
              How would you like to contribute?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-1/2 flex flex-col items-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-MSEBDI7eU43JuDozwXCK3ond9qsWEk.png"
                  alt="Customer"
                  className="w-48 h-48 mb-4 object-contain"
                />
                <button
                  onClick={() => setShowPage(2)}
                  className="w-full py-2 px-4 bg-gradient-to-b from-[#5F0013] via-[#C71B2F] to-[#E34234] text-white font-bold rounded-full hover:opacity-90 transition duration-300"
                >
                  As a Customer
                </button>
              </div>
              <div className="w-full sm:w-1/2 flex flex-col items-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-Pc1cHDoYm6jSEoInWC6EvUJdZD7hJ1.png"
                  alt="Merchant"
                  className="w-48 h-48 mb-4 object-contain"
                />
                <button
                  onClick={() => setShowPage(3)}
                  className="w-full py-2 px-4 bg-gradient-to-b from-[#5F0013] via-[#C71B2F] to-[#E34234] text-white font-bold rounded-full hover:opacity-90 transition duration-300"
                >
                  As a Merchant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPage === 2 && 
        <RegisterUser setShowPage={setShowPage} />
      }
      {showPage === 3 && 
        <RegisterBusiness setShowPage={setShowPage} />
      }
    </>
  );
};

export default Register;
