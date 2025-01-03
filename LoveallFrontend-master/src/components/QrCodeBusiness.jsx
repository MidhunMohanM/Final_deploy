import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { getToken } from '../utils/tokenManager';

const QrCodeBusiness = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQrCode();
  }, [offerId]);

  const fetchQrCode = async () => {
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/qr-code/${offerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch QR code data');
      }

      const data = await response.json();
      setQrData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching QR code:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteQrCode = async () => {
    if (window.confirm('Are you sure you want to delete this QR code?')) {
      try {
        const token = getToken('business_auth_token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/business/qr-code/${offerId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete QR code');
        }

        navigate('/business/offers');
      } catch (error) {
        console.error('Error deleting QR code:', error);
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">QR Code for Offer #{offerId}</h1>
        <div className="mb-4">
          {qrData && <QRCodeSVG value={qrData.data} size={256} />}
        </div>
        <p className="text-center text-gray-600 mb-4">
          Scan this QR code to view the offer details
        </p>
        <button
          onClick={handleDeleteQrCode}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Delete QR Code
        </button>
      </div>
    </div>
  );
};

export default QrCodeBusiness;

