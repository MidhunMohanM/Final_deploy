import React, { useState, useContext } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import PopUpContext from "../context/PopUpContext";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setShowLoginPopup } = useContext(PopUpContext);
  const { authState } = useAuth();
  const {authType} = authState;
  let isAuthenticated = authType === 'user';

  const handlePopUp = () => {
    console.log("Pop up showd in Header");
    setShowLoginPopup(true);
  };

  const handleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#71012D] text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold">
          L❤VE ALL
        </Link>
        <div className="hidden lg:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-[#FF6B98]">Home</Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-[#FF6B98]">Stores</Link>
              </li>
              <li>
                <Link to="/charity" className="hover:text-[#FF6B98]">Charity Media</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF6B98]">About us</Link>
              </li>
            </ul>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-1 px-3 pr-10 rounded-full text-black text-sm"
            />
            <FiSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {!isAuthenticated ? (
            <button
              type="button"
              onClick={handlePopUp}
              className="bg-[#FF6B98] text-white px-4 py-1 rounded-full text-sm hover:bg-[#FF8CAF] cursor-pointer"
            >
              Login/Sign Up
            </button>
          ) : (
            <Link
              to="/profile"
              className="bg-[#FF6B98] text-white px-4 py-1 rounded-full text-sm hover:bg-[#FF8CAF] cursor-pointer"
            >
              Profile
            </Link>
          )}
        </div>

        <button className="lg:hidden" onClick={handleMobileMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#71012D] p-4 z-30">
          <nav className="mb-4">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#FF6B98]">Home</Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-[#FF6B98]">Stores</Link>
              </li>
              <li>
                <Link to="/charity" className="hover:text-[#FF6B98]">Charity Media</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF6B98]">About us</Link>
              </li>
            </ul>
          </nav>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-1 px-3 pr-10 rounded-full text-black text-sm"
            />
            <FiSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {!isAuthenticated ? (
            <button
              type="button"
              onClick={handlePopUp}
              className="bg-[#FF6B98] text-white px-4 py-1 rounded-full text-sm w-full hover:bg-[#FF8CAF]"
            >
              Login/Sign Up
            </button>
          ) : (
            <Link
              to="/profile"
              className="bg-[#FF6B98] text-white px-4 py-1 rounded-full text-sm w-full hover:bg-[#FF8CAF]"
            >
              Profile
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
