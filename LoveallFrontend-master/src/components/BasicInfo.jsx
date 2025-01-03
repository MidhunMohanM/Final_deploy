import React from 'react'
import { Edit2 } from 'lucide-react'

const InfoField = ({ label, value }) => {
  return (
    <div className="bg-[#ABABAB] rounded-lg p-4 flex justify-between items-center shadow-md">
      <div className="flex-grow">
        <p className="text-xs sm:text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-sm sm:text-base font-medium text-gray-800">{value}</p>
      </div>
      <button className="text-gray-600 hover:text-gray-800 ml-4" aria-label={`Edit ${label.toLowerCase()}`}>
        <Edit2 className="w-5 h-5" />
      </button>
    </div>
  )
}

const BasicInfo = () => {
  return (
    <div className="w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">My Love All Card</h2>
        <div className="space-y-4 sm:space-y-6">
          <InfoField label="Name" value="Karthik Krishnamoorthi" />
          <InfoField label="Email" value="itskartik@atria.com" />
          <InfoField label="Phone number" value="9999-888-888" />
        </div>
      </div>
    </div>
  )
}

export default BasicInfo