import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoveAllRecommendedBrands(props) {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBrands(props.data);
    setError(props.error);
  }, [props]);

  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}. Please check your server connection and try again.</div>;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">LoveAll Recommended Brands</h2>
      {brands.length === 0 ? (
        <p className="text-gray-500">Loading brands...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <Link to={`/recommended-brands/${brand.store_id}`} key={brand.store_id} className="flex flex-col items-center">
              <div className="w-24 h-24 relative mb-2 rounded-lg overflow-hidden">
                <img
                  src={brand.logo ? `/images/${brand.logo}` : '/images/default-logo.png'}
                  alt={`${brand.store_name} Logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-logo.png';
                  }}
                />
              </div>
              <span className="text-sm text-center font-medium">{brand.store_name}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

