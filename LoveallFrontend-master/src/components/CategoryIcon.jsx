import React from 'react';

const CategoryIcon = ({ Icon, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="text-white text-lg md:text-2xl" />
        </div>
        <div className="bg-[#FF6B98] rounded-full p-4 md:p-6"></div>
      </div>
      <span className="text-xs md:text-sm mt-2">{label}</span>
    </div>
  );
};

export default CategoryIcon;