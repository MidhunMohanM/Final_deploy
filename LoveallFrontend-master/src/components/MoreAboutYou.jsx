import React from 'react'
import { Edit2 } from 'lucide-react'

const InfoField = ({ label, value }) => {
  return (
    <div className="bg-[#ABABAB] rounded-lg p-4 flex justify-between items-center shadow-md">
      <div>
        <p className="text-xs sm:text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-sm sm:text-base font-medium text-gray-800">{value}</p>
      </div>
      <button className="text-gray-600 hover:text-gray-800" aria-label={`Edit ${label.toLowerCase()}`}>
        <Edit2 className="w-5 h-5" />
      </button>
    </div>
  )
}

const MoreAboutYou = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">More about you</h2>
      <div className="space-y-4">
        <InfoField label="Date of birth" value="15 JUNE 1980" />
        <InfoField label="Gender" value="Male" />
        <InfoField label="Location" value="AU Building , Anand Nagar , Banglore 560024" />
        <InfoField label="Profession" value="Student" />
      </div>
    </div>
  )
}

export default MoreAboutYou