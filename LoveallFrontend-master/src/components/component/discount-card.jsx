import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Discount = ({ detail, style }) => {
  const navigate = useNavigate();
  const handleRedeem = (offerId) => {
    navigate(`/redeem`, { state: { ...detail } });
  };
  return (
    <div
      className={
        `flex flex-col w-72 h-72 gap-1 shadow-lg rounded-md overflow-hidden hover:scale-105 transition-transform duration-300` +
        style
      }
    >
      <div className="w-full h-3/4 overflow-hidden">
        <img
          src={detail.store.logo ? `/images/${detail.store.logo}` : '/images/default-logo.png'}
          alt={`${detail.store.store_name} Logo`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/default-logo.png';
          }}
        />
      </div>
      <div className="grid grid-rows-3 grid-cols-2 px-2">
        <div className="justify-self-start w-full truncate">
          {detail.store.store_name}
        </div>
        <button
          type="button"
          className="text-white justify-self-end rounded-lg bg-[#f24880] p-2"
          onClick={() => handleRedeem(detail.offer_id)}
        >
          Redeem Now
        </button>
        <div className="justify-self-start text-[#ababab]">
          ⭐{detail.store.rating}
        </div>
        <Link
          to={`/offer/${detail.offer_id}`}
          className="justify-self-end underline"
        >
          More Info
        </Link>

        <div className="col-span-2 w-full truncate text-[#007c1f]">
          {detail.description}
        </div>
      </div>
    </div>
  );
};

export default Discount;

