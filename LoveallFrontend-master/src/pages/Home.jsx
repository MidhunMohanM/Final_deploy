import React, { useEffect, useContext, useState } from "react";
import LoyaltyCard from "../components/LoyaltyCard";
import CategoryIcon from "../components/CategoryIcon";
import LoveAllRecommendedBrands from "../components/LoveAllRecommendedBrands";
import PopularNow from "../components/PopularNow";
import TrendingOffers from "../components/TrendingOffers";
import Enquiry from "../components/Enquiry";
import {
  FiStar,
  FiShoppingBag,
  FiShoppingCart,
  FiCoffee,
  FiFilm,
  FiMap,
  FiMoreHorizontal,
} from "react-icons/fi";
import Login from "../components/Login";
import PopUpContext from "../context/PopUpContext";
import { useAuth } from "../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getToken } from "../utils/tokenManager.js";

export default function Home() {
  const { authState } = useAuth();
  const {isAuthenticated} = authState;
  const { showLoginPopup, setShowLoginPopup } = useContext(PopUpContext);
  const [brandData, setBrandData] = useState({});
  const [featuredData, setFeaturedData] = useState({});
  const [offerData, setOfferData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const redirectBasedOnToken = async () => {
      if (getToken("user_auth_token")) {
      }
      else if (getToken("business_auth_token")) {
        navigate("/business", { replace: true });
      } else if (getToken("admin_auth_token")) {
        navigate("/admin",  {replace: true});
      }
    };

    redirectBasedOnToken();
  }, [navigate]);

  const homeApi = `${process.env.REACT_APP_API_URL}/user/home`;

  const fetchHomeData = async () => {
    try {
      const response = await fetch(homeApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setOfferData(result.data.offers);
        setFeaturedData(result.data.featureOffers);
        setBrandData(result.data.brand);
        setError(result.error);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Set a timer to update `showLoginPopUp` after 10 seconds
    const timer = setTimeout(() => {
      setShowLoginPopup(true);
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, []);
  

  // Conditional rendering: show loading spinner until data is fetched
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {showLoginPopup && !isAuthenticated && (
        <div className="w-screen h-screen flex justify-center items-center fixed top-[60px] z-[20]">
          <Login className="bg-white" />
        </div>
      )}
      <div className="min-h-screen flex flex-col font-poppins">
        <div className="bg-gradient-to-b from-[#71012D] to-[#971132] relative overflow-hidden">
          <main className="container mx-auto px-4 py-8 relative z-10">
            <section className="mb-12 flex flex-wrap items-center justify-between">
              <div className="w-full lg:w-1/2 text-white mb-8 lg:mb-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 font-poppins">
                  WHAT IS A SOCIAL LOYALTY CARD?
                </h1>
                <p className="mb-4 text-sm sm:text-base">
                  The Atria LoveAll Social Loyalty Card is designed to reward
                  your loyalty and spread the love!
                  <br />
                  Redeem your points for exclusive rewards, discounts, and
                  special experiences, our way of thanking you for being part of
                  the Atria community.
                </p>
                <div className="flex space-x-4">
                  <button
                    className="bg-[#20B2AA] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base hover:bg-[#3CCBC5] transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate("/volunteer")}
                  >
                    Volunteer
                  </button>
                  <button
                    className="bg-[#20B2AA] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base hover:bg-[#3CCBC5] transition-colors duration-300"
                    onClick={() => navigate("/donation")}
                  >
                    Donate
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                {/* Make LoyaltyCard clickable */}
                <div onClick={() => navigate("/loyalty-card-profile")} className="cursor-pointer">
                  <LoyaltyCard />
                </div>
              </div>
            </section>
          </main>
        </div>
        <div className="bg-white flex-grow">
          <div className="container mx-auto px-4 py-2">
            <div className="category-section mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">

                <Link to='/stores' state='1'><CategoryIcon Icon={FiStar} label="New" /></Link>
                <Link to='/stores' state='2'><CategoryIcon Icon={FiCoffee} label="Food" /></Link>
                <Link to='/stores' state='3'><CategoryIcon Icon={FiShoppingBag} label="Shopping" /></Link>
                <Link to='/stores' state='4'><CategoryIcon Icon={FiShoppingBag} label="Fashion" /></Link>
                <Link to='/stores' state='5'><CategoryIcon Icon={FiShoppingCart} label="Restaurants" /></Link>
                <Link to='/stores' state='6'><CategoryIcon Icon={FiFilm} label="Entertainment" /></Link>
                <Link to='/stores' state='1'><CategoryIcon Icon={FiMap} label="Travel" /></Link>
                <Link to='/stores' state='2'><CategoryIcon Icon={FiMoreHorizontal} label="More" /></Link>
              </div>
            </div>

            <LoveAllRecommendedBrands data={brandData} error={error} />
            <PopularNow data={offerData} error={error} />
            <TrendingOffers data={featuredData} error={error} />
            <Enquiry />
          </div>
        </div>
      </div>
    </>
  );
}
