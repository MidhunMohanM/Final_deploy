import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PopUpContext from "../context/PopUpContext";
import Login from "../components/Login";
import { getToken } from "../utils/tokenManager"; // Import the getToken function

export default function LoveAllCard() {
  const { authState } = useAuth();
  const {isAuthenticated} = authState;
  const { showLoginPopup } = useContext(PopUpContext);
  const cardApi = `${process.env.REACT_APP_API_URL}/user/card`;
  const [cardData, setCardData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCardData = async () => {
    try {
      const token = getToken(); // Use getToken to retrieve the token

      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      const response = await fetch(cardApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.ok) {
        const result = await response.json();
        setCardData(result);
        setError(null);
      } else {
        const result = await response.json();
        setError(result.message || "Failed to fetch card data");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching card data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const { first_name, last_name, card_number, purchase_date, expiry_date } = cardData;

  return (
    <>
      {showLoginPopup && !isAuthenticated && (
        <div className="w-screen h-screen flex justify-center items-center fixed top-[60px] z-[20]">
          <Login className="bg-white" />
        </div>
      )}
      <div className="min-h-screen flex flex-col font-poppins">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Your Love All card</h1>
          <div className="mb-6">
            <div className="bg-gradient-to-br from-pink-300 via-pink-200 to-pink-300 rounded-xl p-4 shadow-lg w-full max-w-sm aspect-[1.6/1] relative overflow-hidden">
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-start pt-2">
                  <p className="text-xs font-semibold uppercase text-black">Social Loyalty Card</p>
                  <p className="text-lg font-bold text-black leading-tight">
                    L<span className="text-red-500">❤</span>VE<br />ALL
                  </p>
                </div>
                <div className="flex justify-start items-center -mt-2 mb-6 ml-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex mr-4">
                      {[...Array(4)].map((_, j) => (
                        <span key={j} className="w-2 h-2 bg-black rounded-full mr-1"></span>
                      ))}
                    </div>
                  ))}
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="w-2 h-2 text-black text-xs font-bold flex items-center justify-center mr-1">X</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-bold text-left text-red-500">
                  {first_name} {last_name}
                </p>
              </div>
              <div className="absolute top-1/2 -left-2 w-4 h-8 bg-white rounded-r-full transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-8 bg-white rounded-l-full transform -translate-y-1/2"></div>
            </div>
            <p className="text-sm text-green-600 mt-2">Active</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Love All card details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Card owner</p>
                <p className="font-medium">{first_name} {last_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Card number</p>
                <p className="font-medium">{card_number ? card_number : "N/A"}</p> {/* Display full card number */}
              </div>
              <div>
                <p className="text-sm text-gray-600">Purchase date</p>
                <p className="font-medium">{purchase_date ? new Date(purchase_date).toLocaleDateString() : "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiry date</p>
                <p className="font-medium">{expiry_date ? new Date(expiry_date).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
