import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, QrCode } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getToken } from '../../utils/tokenManager';
import BusinessEditOffer from '../../components/BusinessEditOffer';
import AddOfferBusiness from '../../components/AddOfferBusiness';

const EmptyState = ({ onCreateClick }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <img
      src="/no-offers.png"
      alt="No offers illustration"
      className="w-64 h-64 mb-6"
    />
    <h2 className="text-xl font-semibold mb-2">No Offers currently</h2>
    <button
      onClick={onCreateClick}
      className="mt-6 px-8 py-3 bg-[#53031f] text-white rounded-md hover:bg-[#53031f]/90 transition-colors"
    >
      CREATE NOW
    </button>
  </div>
);

const YourOffers = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    } else {
      fetchStores();
    }
  }, [isAuthenticated, navigate]);

  const fetchStores = async () => {
    try {
      const token = getToken('business_auth_token');
      if (!token) {
        navigate("/", { replace: true });
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/your-offers`, {
        method: 'POST',
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
      setStores(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching stores:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOffer = (offer, store) => {
    setSelectedOffer({ ...offer, store_name: store.store_name });
    setIsEditModalOpen(true);
  };

  const handleDeleteOffer = async (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const token = getToken('business_auth_token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/business/delete-offer/${offerId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete offer');
        }

        fetchStores();
      } catch (error) {
        console.error('Error deleting offer:', error);
        setError(error.message);
      }
    }
  };

  const handleCreateOffer = () => {
    setIsAddModalOpen(true);
  };

  const handleQrCodeClick = (offerId) => {
    navigate(`/business/qr-code/${offerId}`);
  };

  const filteredStores = stores.filter(store => 
    store.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.store_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.offers.some(offer => offer.offer_type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Offers</h1>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">🎫 Your Offers</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              className="pl-10 w-[300px] h-10 border border-gray-300 rounded-md"
              placeholder="Search Offers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={handleCreateOffer}
            className="flex items-center gap-2 px-4 py-2 bg-[#53031f] text-white rounded-md hover:bg-[#53031f]/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create offers
          </button>
        </div>
      </div>

      {stores.length === 0 ? (
        <EmptyState onCreateClick={handleCreateOffer} />
      ) : (
        <div className="space-y-6">
          {filteredStores.map((store) => (
            <div key={store.store_id} className="border rounded-lg p-6">
              <div className="flex items-start gap-8">
                <div className="w-2/5">
                  <div className="w-full aspect-square object-cover bg-[#53031f]"></div>
                </div>
                <div className="w-3/5">
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Store name</div>
                    <div className="text-lg font-semibold">{store.store_name}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">Store address</div>
                    <div>{store.store_address}</div>
                  </div>
                  <div className="flex gap-12 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Manager / Incharge</div>
                      <div className="flex items-center gap-2">
                        <span>{store.manager_name}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Contact Number</div>
                      <div>{store.manager_contact}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-2">Offers</div>
                    {store.offers.length > 0 ? (
                      store.offers.map((offer) => (
                        <div key={offer.offer_id} className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2">
                          <div>
                            <div className="font-semibold">{offer.offer_type}</div>
                            <div className="text-sm text-gray-600">{offer.description}</div>
                            <div className="text-sm text-gray-500">
                              Valid till {offer.end_date ? new Date(offer.end_date).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                              onClick={() => handleQrCodeClick(offer.offer_id)}
                            >
                              <QrCode className="h-4 w-4" />
                            </button>
                            <button 
                              className="bg-[#FD3B84] hover:bg-[#FD3B84]/90 text-white px-3 py-1 rounded-md"
                              onClick={() => handleEditOffer(offer, store)}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                              onClick={() => handleDeleteOffer(offer.offer_id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">No offers for this store</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BusinessEditOffer
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        offer={selectedOffer}
        onUpdate={fetchStores}
      />
      <AddOfferBusiness
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUpdate={fetchStores}
      />
    </div>
  );
};

export default YourOffers;

