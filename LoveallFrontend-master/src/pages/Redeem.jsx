import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import { getToken } from '../utils/tokenManager';

const Redeem = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const offerDetail = location.state || {};
  console.log(offerDetail);
  const token = getToken('user_auth_token');
  const whoami = `${process.env.REACT_APP_API_URL}/auth/whoami`;

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Please login to redeem the offer.');
        return;
      }

      try {
        const response = await fetch(whoami, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details. Please try again.');
        }

        const data = await response.json();
        setUser(data.id);
      } catch (err) {
        setError(err.message || 'An error occurred. Please try again.');
      }
    };

    fetchData();
  }, [token, whoami]);

  if (!offerDetail || !offerDetail.offer_id) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center text-red-500 font-semibold">
          Invalid offer details. Please go back and try again.
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  const qrCodeData = JSON.stringify({
    offer_id: offerDetail.offer_id,
    offer_type: offerDetail.offer_type,
    description: offerDetail.description,
    user_id: user,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 md:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Your Redemption QR Code
        </h1>
        <div className="mb-4 flex justify-center">
          <QRCodeSVG value={qrCodeData} size={256} />
        </div>
        <p className="text-center text-gray-600 mb-4">
          Show this QR code to the store to redeem your offer.
        </p>
        <div className="text-sm text-gray-500">
          <p>
            <strong>Offer ID:</strong> {offerDetail.offer_id || 'N/A'}
          </p>
          <p>
            <strong>Offer Type:</strong> {offerDetail.offer_type || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong> {offerDetail.description || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Redeem;
