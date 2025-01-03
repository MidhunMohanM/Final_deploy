import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';



export default function PopularNow(props) {
  const [topStores, setTopStores] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTopStores(props.data);
    setError(props.error);
    setIsLoading(false);
    console.log('Offers data:', props.data);
  }, [props.data, props.error]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading top stores...</div>;
  }

  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}. Please check your server connection and try again.</div>;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Popular Now</h2>
      {topStores.length === 0 ? (
        <p className="text-center py-4">No top stores found.</p>
      ) : (
        <div className="relative popular-now-slider">
          <Slider {...settings}>
            {topStores.map((offer) => (
              <Link to={`/offer/${offer.offer_id}`} key={offer.offer_id}>
                <div className="px-4">
                  <div className="bg-[#F6F6F6] rounded-lg border border-gray-300 shadow-md p-4 flex flex-col items-center h-full max-w-[200px] mx-auto">
                    <div className="w-full h-32 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white border border-gray-300">
                      <img className="w-full h-full object-contain p-2"
                        src={offer.store?.logo ? `/images/${offer.store.logo}` : '/images/logo4.png'}
                        alt={offer.store?.store_name || 'Store logo'}  
                      />
                    </div>
                    <div className="text-center">
                      <span className="block mb-1 font-poppins text-[16px] font-semibold text-[#000000]">
                        {offer.store?.store_name || 'Store'}
                      </span>
                      <span className="block font-poppins text-[14px] font-semibold text-[#606060]">
                        DISCOUNT {offer.discount_percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      )}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
        
        .popular-now-slider :global(.slick-prev),
        .popular-now-slider :global(.slick-next) {
          background-color: #87CEEB;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          z-index: 1;
        }
        .popular-now-slider :global(.slick-prev:hover),
        .popular-now-slider :global(.slick-next:hover) {
          background-color: #5F9EA0;
        }
        .popular-now-slider :global(.slick-prev:before),
        .popular-now-slider :global(.slick-next:before) {
          color: #FFFFFF;
        }
        .popular-now-slider :global(.slick-prev) {
          left: -35px;
        }
        .popular-now-slider :global(.slick-next) {
          right: -35px;
        }
        .popular-now-slider :global(.slick-slide > div) {
          height: 100%;
        }
        .popular-now-slider :global(.slick-slide > div > div) {
          height: 100%;
        }
        .popular-now-slider :global(.slick-list) {
          margin: 0 -16px;
        }
      `}</style>
    </section>
  );
}

