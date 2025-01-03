import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2 } from 'lucide-react';
import { getToken } from '../utils/tokenManager';

const BusinessEditOffer = ({ isOpen, onClose, offer, onUpdate }) => {
  const [offerData, setOfferData] = useState({
    offer_id: '',
    store_id: '',
    store_name: '',
    store_address: '',
    offer_type: '',
    description: '',
    end_date: '',
    manager_name: '',
    manager_contact: '',
  });

  useEffect(() => {
    if (offer) {
      setOfferData({
        offer_id: offer.offer_id,
        store_id: offer.store_id,
        store_name: offer.store_name,
        store_address: offer.store_address,
        offer_type: offer.offer_type,
        description: offer.description,
        end_date: offer.end_date?.split('T')[0] || '',
        manager_name: offer.manager_name,
        manager_contact: offer.manager_contact,
      });
    }
  }, [offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/edit-offer`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerData)
      });

      if (!response.ok) {
        throw new Error('Failed to update offer');
      }

      const data = await response.json();
      onUpdate(data);
      onClose();
    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/delete-offer/${offerData.offer_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete offer');
      }

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl">Edit offer details</h2>
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 bg-pink-500 text-white rounded-md flex items-center gap-2"
              onClick={handleSubmit}
            >
              <Edit className="w-4 h-4" />
              Update Offer
            </button>
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Store</h3>
              <p className="text-sm text-gray-600 mb-2">Enter your store name, and we'll fill in the rest.</p>
              <input
                type="text"
                value={offerData.store_name}
                onChange={(e) => setOfferData({ ...offerData, store_name: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Offer type</h3>
              <select
                value={offerData.offer_type}
                onChange={(e) => setOfferData({ ...offerData, offer_type: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="Percentage Discount">Percentage Discount</option>
                <option value="Buy One Get One">Buy One Get One</option>
                <option value="Flat Discount">Flat Discount</option>
              </select>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <textarea
                value={offerData.description}
                onChange={(e) => setOfferData({ ...offerData, description: e.target.value })}
                className="w-full p-2 border rounded-md"
                rows="3"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Valid till</h3>
              <input
                type="date"
                value={offerData.end_date}
                onChange={(e) => setOfferData({ ...offerData, end_date: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
              >
                Update Offer
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-gray-300 py-3 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <img
              src="/store-illustration.png"
              alt="Store illustration"
              className="w-full max-w-[300px] mx-auto mb-6"
            />

            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <textarea
                value={offerData.store_address}
                onChange={(e) => setOfferData({ ...offerData, store_address: e.target.value })}
                className="w-full p-2 border rounded-md"
                rows="3"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Manager / Incharge</h3>
              <input
                type="text"
                value={offerData.manager_name}
                onChange={(e) => setOfferData({ ...offerData, manager_name: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact number</h3>
              <input
                type="text"
                value={offerData.manager_contact}
                onChange={(e) => setOfferData({ ...offerData, manager_contact: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessEditOffer;

