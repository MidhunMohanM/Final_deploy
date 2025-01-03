import React from "react";
import BusinessHeader from "../components/BusinessHeader";
import storeImage from '../assets/images/Midhun.jpeg';

const BusinessProfileHeader = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Include the existing BusinessHeader component */}
      <BusinessHeader />
      
      {/* Profile section with solid background color */}
      <div 
        className="py-12 px-4 sm:px-6 lg:px-8" 
        style={{
          backgroundColor: '#971132'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <div className="relative mb-4 sm:mb-0 sm:mr-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white overflow-hidden border-4 border-white">
                <img
                  alt="Store profile"
                  src={storeImage}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-white text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Store 2 Emporium</h2>
              <p className="text-lg sm:text-xl opacity-90">Anand nagar, Hebbal</p>
              <p className="text-lg sm:text-xl opacity-90">Bengaluru 560022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileHeader;