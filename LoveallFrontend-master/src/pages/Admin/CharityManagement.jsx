import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../utils/tokenManager";
import { FileImage, FileVideo, FileText, Edit, Trash2, Plus } from 'lucide-react';
import AdminCharityManagementEdit from "../../components/AdminCharityManagementEdit";
import AdminAddCharityContent from "../../components/AdminAddCharityContent";

const CharityManagement = () => {
  const [charityData, setCharityData] = useState({ images: [], videos: [], stories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("all");
  const [editItem, setEditItem] = useState(null);
  const [addItem, setAddItem] = useState(null);
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const api = process.env.REACT_APP_API_URL;

  const fetchCharityData = useCallback(async () => {
    try {
      const token = getToken('admin_auth_token');
      const response = await fetch(`${api}/admin/charity`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch charity data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        setCharityData(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch charity data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCharityData();
    }
  }, [isAuthenticated, fetchCharityData]);

  const filteredMedia = () => {
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
  };

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = getToken('admin_auth_token');
        const response = await fetch(`${api}/admin/charity/${item.type}/${item[`${item.type}_id`]}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to delete item: ${response.status} ${response.statusText}`);
        }

        fetchCharityData(); // Refresh data after deletion
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleAdd = (type) => {
    setAddItem(type);
  };

  const handleCloseEdit = () => {
    setEditItem(null);
    fetchCharityData(); // Refresh data after edit
  };

  const handleCloseAdd = () => {
    setAddItem(null);
    fetchCharityData(); // Refresh data after add
  };

  if (!isAuthenticated) {
    return <div>Please log in to manage charity media.</div>;
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Loading charity media...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-40 bg-[#6d071a] flex justify-center items-center">
        <h1 className="text-4xl text-white underline font-bold">
          Charity Media Management
        </h1>
      </div>
      <main className="container mx-auto px-4 py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(type === "all" || type === "image") && (
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleAdd("image")}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <Plus size={48} className="text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center">Add Image</h3>
              </div>
            </div>
          )}
          {(type === "all" || type === "video") && (
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleAdd("video")}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <Plus size={48} className="text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center">Add Video</h3>
              </div>
            </div>
          )}
          {(type === "all" || type === "story") && (
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleAdd("story")}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <Plus size={48} className="text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center">Add Story</h3>
              </div>
            </div>
          )}
          {filteredMedia().map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.type === "image" && (
                <div className="relative h-48">
                  <img
                    src={`/images/${item.image}`}
                    alt="Charity media"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white rounded-full p-1">
                    <FileImage className="text-[#6d071a]" size={20} />
                  </div>
                </div>
              )}
              {item.type === "video" && (
                <div className="relative h-48">
                  <video
                    src={`/images/${item.video}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white rounded-full p-1">
                    <FileVideo className="text-[#6d071a]" size={20} />
                  </div>
                </div>
              )}
              {item.type === "story" && (
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  <div className="absolute top-2 left-2 bg-white rounded-full p-1">
                    <FileText className="text-[#6d071a]" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-center px-4">{item.title}</h3>
                </div>
              )}
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(item.time).toLocaleDateString()}
                </p>
                <p className="text-gray-800">
                  {item.type === "story" ? item.story.substring(0, 100) + "..." : item.description}
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button 
                    className="bg-[#6d071a] text-white px-4 py-2 rounded-md text-sm flex items-center"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </button>
                  <button 
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
                    onClick={() => handleDelete(item)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {editItem && (
        <AdminCharityManagementEdit
          item={editItem}
          onClose={handleCloseEdit}
          api={api}
        />
      )}
      {addItem && (
        <AdminAddCharityContent
          type={addItem}
          onClose={handleCloseAdd}
          api={api}
        />
      )}
    </div>
  );
};

export default CharityManagement;

