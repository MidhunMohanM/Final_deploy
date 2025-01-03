import React, { useEffect, useState } from "react";
import { SlidersHorizontal } from 'lucide-react';
import Discount from "../components/component/discount-card";
import { useNavigate } from 'react-router-dom';

const Offer = () => {
  const [category, setCategory] = useState([]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [offers, setOffers] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });
  const [filter, setFilter] = useState({
    search: "",
    category: "",
    rating: "",
    distance: "",
    discount: "",
    location: "",
    page: 1,
    featured: null,
  });
  const categoryApi = `${process.env.REACT_APP_API_URL}/user/category`;
  const discountApi = `${process.env.REACT_APP_API_URL}/user/discount`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await fetch(discountApi, {
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
          setOffers([]);
          console.log("I am not getting any offer");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiscount();
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(categoryApi);
        if (response.ok) {
          const result = await response.json();
          setCategory(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(offers);
  }, [offers]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value, page: 1 }));
    console.log(filter);
  };

  const handleFilter = (payload) => {
    if (payload.category) {
      setActiveCategory(payload.category);
    } else if (payload.featured) {
      setActiveCategory("featured");
    } else {
      setActiveCategory(null);
    }
    setFilter((prev) => ({ ...prev, ...payload }));
  };

  const handlePageChange = (newPage) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterVisible(!isMobileFilterVisible);
  };

  return (
    <div id="category-page" className="m-4">
      <div
        id="category"
        className="gap-10 flex lg:gap-16 overflow-x-scroll no-scrollbar"
      >
        {category.length > 0 ? (
          <>
            <button
              type="button"
              className={`flex flex-col gap-2 justify-items-center items-center ${
                activeCategory === null ? "scale-105" : ""
              }`}
              onClick={() => handleFilter({ category: null, featured: null })}
            >
              <div className="w-12 h-12 bg-[#971132] lg:w-16 lg:h-16 rounded-full "></div>
              <div className="text-center w-20">All</div>
            </button>
            <button
              type="button"
              className={`flex flex-col gap-2 justify-items-center items-center ${
                activeCategory === "featured" ? "scale-105" : ""
              }`}
              onClick={() => handleFilter({ featured: 1, category: null })}
            >
              <div className="w-12 h-12 bg-[#971132] lg:w-16 lg:h-16 rounded-full"></div>
              <div className="text-center w-20">Featured</div>
            </button>
            {category.map((data, index) => (
              <button
                type="button"
                key={index}
                className={`flex flex-col gap-2 justify-items-center items-center ${
                  activeCategory === data.category_id ? "scale-105" : ""
                }`}
                onClick={() =>
                  handleFilter({ category: data.category_id, featured: null })
                }
              >
                <div className="w-12 h-12 bg-[#971132] lg:w-16 lg:h-16 rounded-full"></div>
                <div className="text-center w-20">{data.category_name}</div>
              </button>
            ))}
            <button
              type="button"
              className="flex flex-col gap-2 justify-items-center items-center"
            >
              <div className="w-12 h-12 bg-[#971132] lg:w-16 lg:h-16 rounded-full"></div>
              <div className="text-center w-20">More</div>
            </button>
          </>
        ) : (
          <p>Loading....</p>
        )}
      </div>
      <div className="flex flex-col mt-10 xl:flex-row gap-4">
        <div className="flex flex-col gap-5 xl:hidden">
          <input
            type="text"
            name="search"
            id="search"
            value={filter.search}
            onChange={handleInputChange}
            placeholder="Search..."
            className="w-full p-2 border-2 border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 h-10"
          />
          <button
            type="button"
            className="w-full h-10 bg-[#971132] rounded-md flex justify-center items-center"
            onClick={toggleMobileFilter}
          >
            <div className="flex flex-row gap-3">
              <SlidersHorizontal />
              <span>Filter</span>
            </div>
          </button>
        </div>

        {isMobileFilterVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg relative">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium">
                  Rating
                </label>
                <select
                  name="rating"
                  value={filter.rating}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All</option>
                  <option value="1">1 Star & Above</option>
                  <option value="2">2 Stars & Above</option>
                  <option value="3">3 Stars & Above</option>
                  <option value="4">4 Stars & Above</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="distance" className="block text-sm font-medium">
                  Distance
                </label>
                <input
                  type="number"
                  name="distance"
                  value={filter.distance}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter distance"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="discount" className="block text-sm font-medium">
                  Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  value={filter.discount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter discount"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={filter.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter location"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={toggleMobileFilter}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={toggleMobileFilter}
                  className="px-4 py-2 bg-[#971132] text-white rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="">
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
        <div className="hidden xl:block xl:w-96 xl:h-full p-4 border-r justify-self-center">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium">
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              value={filter.search}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Search offers"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium">
              Rating
            </label>
            <select
              name="rating"
              id="rating"
              value={filter.rating}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="1">1 Star & Above</option>
              <option value="2">2 Stars & Above</option>
              <option value="3">3 Stars & Above</option>
              <option value="4">4 Stars & Above</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="distance" className="block text-sm font-medium">
              Distance
            </label>
            <input
              type="number"
              name="distance"
              id="distance"
              value={filter.distance}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter distance"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="discount" className="block text-sm font-medium">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={filter.discount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter discount"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={filter.location}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

