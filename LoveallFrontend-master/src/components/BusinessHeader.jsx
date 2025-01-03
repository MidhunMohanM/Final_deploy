import React from "react"
import { FaBell, FaTh, FaUserCircle, FaQrcode } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function BusinessHeader() {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate("/business/profile/stores") // Updated to new route
  }

  const handleQrScannerClick = () => {
    navigate("/business/qr-scanner")
  }

  return (
    <header className="flex items-center justify-between p-4 bg-[#971132] text-white shadow-md h-[6rem]">
      <h1 className="text-lg font-bold">BUSINESS DASHBOARD</h1>
      <div className="flex items-center space-x-6">
        <FaBell className="text-2xl cursor-pointer hover:opacity-80" title="Notifications" />
        <FaTh className="text-2xl cursor-pointer hover:opacity-80" title="More Options" />
        <FaQrcode
          className="text-2xl cursor-pointer hover:opacity-80"
          title="QR Scanner"
          onClick={handleQrScannerClick}
        />
        <FaUserCircle
          className="text-2xl cursor-pointer hover:opacity-80"
          title="Profile"
          onClick={handleProfileClick}
        />
      </div>
    </header>
  )
}
