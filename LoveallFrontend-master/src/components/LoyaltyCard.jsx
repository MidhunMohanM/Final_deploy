import React from 'react';

export default function Component() {
  return (
    <div className="rounded-xl p-4 sm:p-6 shadow-lg w-full max-w-sm aspect-[1.6/1] relative overflow-hidden" style={{
      background: 'linear-gradient(170deg, rgba(247,159,221,1) 0%, rgba(255,216,224,1) 51%, rgba(242,125,144,1) 94%)'
    }}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start pt-2">
          <p className="text-xs sm:text-sm font-semibold text-black uppercase">Social Loyalty Card</p>
          <p className="text-sm sm:text-lg font-bold text-black">
            L<span className="text-red-500">❤</span>VE<br />ALL
          </p>
        </div>
        <div className="flex justify-start items-center -mt-2 mb-6 space-x-3 sm:space-x-4 ml-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-0.5 sm:space-x-1">
              {[...Array(4)].map((_, j) => (
                <span key={j} className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></span>
              ))}
            </div>
          ))}
          <div className="flex space-x-0.5 sm:space-x-1">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-black text-[0.6rem] sm:text-sm font-bold flex items-center justify-center">X</span>
            ))}
          </div>
        </div>
        <p className="text-sm sm:text-base uppercase font-bold text-left" style={{ color: '#F85454' }}>
          Tap here to get the card
        </p>
      </div>
      {/* Card cuts */}
      <div className="absolute -left-2 top-1/2 w-4 h-8 bg-white rounded-r-full transform -translate-y-1/2"></div>
      <div className="absolute -right-2 top-1/2 w-4 h-8 bg-white rounded-r-full transform -translate-y-1/2"></div>
    </div>
  );
}