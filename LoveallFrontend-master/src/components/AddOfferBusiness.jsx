import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getToken } from '../utils/tokenManager';

const AddOfferBusiness = ({ isOpen, onClose, onUpdate }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [offerData, setOfferData] = useState({
    store_id: '',
    offer_type: '',
    end_date: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchStores();
    }
  }, [isOpen]);

  const fetchStores = async () => {
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/check-stores`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stores');
      }

      const data = await response.json();
      setStores(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setLoading(false);
    }
  };

  const handleStoreSelect = (e) => {
    const storeId = e.target.value;
    const selected = stores.find(store => store.store_id.toString() === storeId);
    setSelectedStore(selected);
    setOfferData(prev => ({
      ...prev,
      store_id: storeId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/add-offer`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offerData)
      });

      if (!response.ok) {
        throw new Error('Failed to create offer');
      }

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl">Craft exclusive discounts for your customers</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Store</h3>
              <p className="text-sm text-gray-600 mb-2">Select your store, and we'll fill in the rest.</p>
              <select
                value={offerData.store_id}
                onChange={handleStoreSelect}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a store</option>
                {stores.map(store => (
                  <option key={store.store_id} value={store.store_id}>
                    {store.store_name}
                  </option>
                ))}
              </select>
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
              <h3 className="text-lg font-semibold mb-2">Valid till</h3>
              <input
                type="date"
                value={offerData.end_date}
                onChange={(e) => setOfferData({ ...offerData, end_date: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
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

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-md text-white"
                style={{
                  background: 'linear-gradient(270deg, rgba(253,59,132,1) 0%, rgba(255,164,141,1) 100%)'
                }}
              >
                Create Offer
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
              <p className="p-3 bg-gray-50 rounded-md">
                {selectedStore?.store_address || 'Select a store to see address'}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Manager / Incharge</h3>
              <input
                type="text"
                value={selectedStore?.manager_name || ''}
                disabled
                className="w-full p-2 border rounded-md bg-gray-50"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact number</h3>
              <input
                type="text"
                value={selectedStore?.manager_contact || ''}
                disabled
                className="w-full p-2 border rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOfferBusiness;

