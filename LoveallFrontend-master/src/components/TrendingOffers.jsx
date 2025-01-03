import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TrendingOffers(props) {
  const [trendingOffers, setTrendingOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setError(props.error);
    setTrendingOffers(props.data)
    setIsLoading(false);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading trending offers...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}. Please check your server connection and try again.</div>;

  return (
    <section className="mb-8 px-4 md:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Trending Offers</h2>
      {trendingOffers.length === 0 ? (
        <div className="text-center">No trending offers available at the moment.</div>
      ) : (
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingOffers.map((offer) => (
              <div key={offer.offer_id} className="flex-shrink-0 w-[calc(33.333%-16px)] min-w-[280px] max-w-[300px] snap-start">
                <div className="bg-white rounded-lg shadow-md p-6 m-2 flex flex-col items-center text-center h-full">
                  <h3 className="text-xl font-bold mb-3" style={{
                    background: 'linear-gradient(90deg, rgba(112,1,43,1) 0%, rgba(93,1,36,1) 61%, rgba(56,1,22,1) 94%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {offer.store_name}
                  </h3>
                  <p className="text-4xl font-bold mb-3" style={{
                    background: 'linear-gradient(90deg, rgba(253,59,132,1) 0%, rgba(255,164,141,1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {offer.discount_percentage}% Off
                  </p>
                  <p className="text-sm mb-5" style={{ color: '#5F0013' }}>
                    Valid till {new Date(offer.end_date).toLocaleDateString('en-GB')}
                  </p>
                  <Link
                    to='/redeem'
                    state={{ ...offer }}
                    className="w-full py-3 rounded-full text-white font-semibold transition-transform hover:scale-105 mt-auto"
                    style={{
                      background: 'linear-gradient(90deg, rgba(253,59,132,1) 0%, rgba(255,164,141,1) 100%)'
                    }}
                  >
                    Redeem now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
            aria-label="Scroll left"
          >
            ◀
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md"
            aria-label="Scroll right"
          >
            ▶
          </button>
        </div>
      )}
    </section>
  );
}