import React, { useState, useEffect } from "react";
import { FiImage, FiVideo, FiFileText } from "react-icons/fi";

const Charity = () => {
  const [type, setType] = useState("all");
  const [charityData, setCharityData] = useState({ images: [], videos: [], stories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharityData = async () => {
      try {
        console.log("Fetching charity data...");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/charity`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("Response status charity:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received data:", data);
        if (data.success) {
          setCharityData(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch charity data");
        }
      } catch (err) {
        console.error("Error fetching charity data:", err);
        setError(`An error occurred while fetching data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharityData();
  }, []);

  const filteredMedia = () => {
    try {
      switch(type) {
        case "image":
          return charityData.images.map(item => ({ ...item, type: "image" }));
        case "video":
          return charityData.videos.map(item => ({ ...item, type: "video" }));
        case "story":
          return charityData.stories.map(item => ({ ...item, type: "story" }));
        default:
          return [
            ...charityData.images.map(item => ({ ...item, type: "image" })),
            ...charityData.videos.map(item => ({ ...item, type: "video" })),
            ...charityData.stories.map(item => ({ ...item, type: "story" }))
          ];
      }
    } catch (err) {
      console.error("Error in filteredMedia:", err);
      setError(`An error occurred while filtering media: ${err.message}`);
      return [];
    }
  };

  if (isLoading) return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-100 flex justify-center items-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 bg-[#6d071a] flex justify-center items-center">
        <h1 className="text-4xl text-white underline font-bold">
          Charity Media
        </h1>
      </div>
      <div className="pt-5">
        <p className="text-center max-w-3xl mx-auto text-[#666b74] text-lg leading-relaxed">
          Charity Media is a dedicated space where we share the powerful
          stories, images, and videos of our ongoing efforts to combat hunger.
          It's a visual journey that highlights the impact of our mission and
          the people whose lives have been transformed through your effort.
        </p>
      </div>
      <main className="px-6 pt-10">
        <div className="flex flex-row border-b-2 border-[#d2d2d2] mb-8">
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "all"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-l-2 border-t-2 border-r-2 rounded-tl-lg`}
            onClick={() => setType("all")}
          >
            All
          </button>
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "image"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-t-2 border-r-2`}
            onClick={() => setType("image")}
          >
            Images
          </button>
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "video"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-t-2 border-r-2`}
            onClick={() => setType("video")}
          >
            Videos
          </button>
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "story"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-t-2 border-r-2 rounded-tr-lg`}
            onClick={() => setType("story")}
          >
            Stories
          </button>
        </div>
        <div id="media" className="grid grid-cols-1 gap-8">
          {filteredMedia().map((item, index) => (
            <div
              key={index}
              className={`grid gap-6 ${
                item.type === "story" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
              } bg-slate-50`}
            >
              {item.type === "image" && (
                <div className="bg-[#6d071a] p-5 rounded-lg shadow-md">
                  <img
                    src={`/images/${item.image}`}
                    alt="Charity media"
                    className="w-full h-auto object-cover rounded-lg"
                    onError={(e) => {
                      console.error(`Failed to load image: ${item.image}`);
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
              )}
              {item.type === "video" && (
                <div className="bg-[#6d071a] p-5 rounded-lg shadow-md">
                  <video
                    src={`/images/${item.video}`}
                    controls
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                      console.error(`Failed to load video: ${item.video}`);
                      e.target.src = '/images/video-placeholder.mp4';
                    }}
                  />
                </div>
              )}
              <div className={`bg-white p-6 rounded-lg shadow-md overflow-y-auto ${
                item.type === "story" ? "max-w-4xl mx-auto w-full" : "max-h-96"
              }`}>
                {item.type === "story" && (
                  <h2 className="text-2xl font-bold mb-4 text-center">{item.title}</h2>
                )}
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.type === "story" ? item.story : item.description}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(item.time).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Charity;

