import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleOffer = () => {
  const { offer_id } = useParams();
  const [offer, setOffer] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const discountApi = `${process.env.REACT_APP_API_URL}/user/discount`;

  const fetchParticularOffer = async () => {
    try {
      const response = await fetch(discountApi, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ offer_id })
      });
      if (response.ok) {
        const result = await response.json();
        setOffer(result.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchParticularOffer();
  }, [offer_id]);

  if (!offer) return <div>Loading...</div>;

  // Placeholder images (replace with actual images from your API)
  const images = [
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
  ];

  // Mock data for reviews (replace with API data later)
  const mockReviews = [
    { id: 1, author: "Himanshu Raj", rating: 4, comment: "Great food and ambiance!", date: "2023-10-15" },
    { id: 2, author: "Yash Raj", rating: 5, comment: "Absolutely loved the experience!", date: "2023-10-10" },
    { id: 3, author: "Ashish Kumar", rating: 3, comment: "Good, but could be better.", date: "2023-10-05" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
    ));
  };

  return (
    <div id="single-offer-page" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="relative">
            <img
              src={images[activeImage]}
              alt={offer.store.store_name}
              className="w-full h-[400px] object-cover rounded-lg bg-[#971132]"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeImage === index ? 'bg-white' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex mt-4 space-x-4 overflow-x-auto">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer bg-[#971132] ${
                  activeImage === index ? 'border-2 border-pink-500' : ''
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{offer.store.store_name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{offer.store.rating}</span>
            <span className="mx-2">•</span>
            <span>{offer.store.category}</span>
          </div>
          <div className="bg-pink-100 text-pink-800 font-semibold py-2 px-4 rounded-full inline-block mb-4">
            {offer.offer_type}
          </div>
          <p className="text-xl font-semibold mb-4">{offer.description}</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="font-semibold mb-2">Offer Details</h2>
            <ul className="space-y-2">
              <li><strong>Minimum Purchase:</strong> {offer.minimum_purchase || 'N/A'}</li>
              <li><strong>Maximum Discount:</strong> ₹{offer.maximum_discount}</li>
              <li><strong>Valid Until:</strong> {new Date(offer.end_date).toLocaleDateString()}</li>
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Terms & Conditions</h2>
            <p>{offer.terms_conditions}</p>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Store Information</h2>
            <p>{offer.store.address}</p>
            <p>Open: {offer.store.opening_hours}</p>
          </div>
          <Link to='/redeem'>
            <button className="bg-pink-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-pink-600 transition duration-300">
                Redeem Now
            </button>
          </Link>
        </div>
      </div>

      {/* Latest Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Latest Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={`/placeholder.svg?height=40&width=40&text=${review.author.charAt(0)}`}
                    alt={review.author}
                    className="w-10 h-10 rounded-full mr-3 bg-[#971132]"
                  />
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SingleOffer;