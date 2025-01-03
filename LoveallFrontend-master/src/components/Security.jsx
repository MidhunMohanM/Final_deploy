import React from 'react'
import { ChevronRight } from 'lucide-react'

const SecurityOption = ({ title, children }) => (
  <div className="bg-[#ABABAB] rounded-lg p-4 mb-4 flex justify-between items-center shadow-md">
    <span className="text-sm sm:text-base font-medium">{title}</span>
    {children}
  </div>
)

const DeviceIcon = ({ type }) => (
  <svg className="w-28 h-28 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    {type === 'phone' ? (
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    ) : (
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    )}
  </svg>
)

const DeviceInfo = ({ type, name, time, isCurrentDevice }) => (
  <div className="flex flex-col items-center">
    <DeviceIcon type={type} />
    <div className="text-center">
      <p className={`text-xs sm:text-sm ${isCurrentDevice ? 'text-green-600' : 'text-orange-500'}`}>
        {isCurrentDevice ? 'Logged in now on' : 'Logged in on'}
      </p>
      <p className="text-sm sm:text-base font-medium">{name}</p>
      {!isCurrentDevice && <p className="text-xs text-gray-600">{time}</p>}
    </div>
  </div>
)

export default function Security() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Security</h2>
      <div className="space-y-4">
        <SecurityOption title="Change password">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </SecurityOption>
        
        <SecurityOption title="Two Factor Authentication">
          <div className="w-12 h-6 bg-gray-300 rounded-full p-1 duration-300 ease-in-out">
            <div className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"></div>
          </div>
        </SecurityOption>
        
        <div className="bg-[#ABABAB] rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-6">Connected devices</h3>
          <div className="flex justify-between px-8">
            <DeviceInfo 
              type="phone"
              name="Karthik's iPhone"
              time="06:09 PM, 3rd June, 2006"
              isCurrentDevice={false}
            />
            <DeviceInfo 
              type="laptop"
              name="KARTHIK'S PC"
              isCurrentDevice={true}
            />
          </div>
        </div>
        
        <div className="bg-[#ABABAB] rounded-lg p-4 shadow-md">
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#47001C] to-[#971132]">
            Log out
          </span>
        </div>
      </div>
    </div>
  )
}