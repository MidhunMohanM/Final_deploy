import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '../../utils/tokenManager';

export default function BusinessProfileStores() {
  const [businessData, setBusinessData] = useState({
    business_name: '',
    business_email: '',
    stores: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    } else {
      fetchStores();
    }
  }, [isAuthenticated, navigate]);

  const fetchStores = async () => {
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        navigate('/', { replace: true });
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/stores`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch stores');
      }

      const data = await response.json();
      setBusinessData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching stores:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStore = async (storeId) => {
    if (!window.confirm('Are you sure you want to delete this store?')) {
      return;
    }

    try {
      const token = getToken('business_auth_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/stores/${storeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete store');
      }

      setBusinessData(prev => ({
        ...prev,
        stores: prev.stores.filter(store => store.store_id !== storeId)
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditStore = (storeId) => {
    navigate(`/business/profile/stores/edit/${storeId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Background with increased height */}
      <div className="relative h-96"> {/* Increased from h-64 to h-96 */}
        <div className="absolute inset-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
          >
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor="rgba(71,0,28,1)" offset="0%" />
                <stop stopColor="rgba(151,17,50,1)" offset="100%" />
              </linearGradient>
            </defs>
            <rect width="1440" height="320" fill="url(#gradient)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-3xl font-bold mb-2">{businessData.business_name}</h1>
          <p className="text-lg opacity-90">{businessData.business_email}</p>
        </div>
      </div>

      {/* Store Locations Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Store Locations</h2>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md text-white"
            style={{
              background: 'rgb(71,0,28)',
              background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
            }}
          >
            <Plus className="w-5 h-5" />
            Add Store
          </button>
        </div>

        <div className="space-y-4">
          {businessData.stores.map((store) => (
            <div key={store.store_id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{store.store_name}</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>{store.store_address}</p>
                    <p>Manager: {store.manager_name}</p>
                    <p>Contact: {store.manager_contact}</p>
                    <p>Email: {store.store_email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-md text-white"
                    style={{
                      background: 'rgb(71,0,28)',
                      background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
                    }}
                    onClick={() => handleEditStore(store.store_id)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                    onClick={() => handleDeleteStore(store.store_id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

