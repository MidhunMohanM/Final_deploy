import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Discount from "../components/component/discount-card";

const RecommendedBrands = () => {
  const { store_id } = useParams();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });
  const [filter, setFilter] = useState({
    store_id: store_id,
    page: 1,
  });

  const recommendedBrandsApi = `${process.env.REACT_APP_API_URL}/user/recommended-brands`;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(recommendedBrandsApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filter),
        });

        if (response.ok) {
          const result = await response.json();
          setOffers(result.data);
          setPagination(result.pagination);
        } else {
          throw new Error('Failed to fetch offers');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [filter, recommendedBrandsApi]);

  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Recommended Offers</h1>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-10 justify-items-center">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.offer_id}>
              <Discount detail={offer} />
            </div>
          ))
        ) : (
          <>
            <div className="w-72 h-72 bg-slate-400"></div>
            <div className="w-72 h-72 bg-slate-400"></div>
            <div className="w-72 h-72 bg-slate-400"></div>
          </>
        )}
      </div>

      <div className="flex justify-center items-center mt-10">
        {pagination.totalPages > 1 && (
          <div className="flex gap-3">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 bg-gray-200 rounded"
            >
              Previous
            </button>
            {Array.from({ length: pagination.totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`p-2 ${
                  pagination.currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedBrands;

