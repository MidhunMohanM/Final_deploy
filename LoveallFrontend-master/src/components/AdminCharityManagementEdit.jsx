import React, { useState, useEffect } from 'react';
import { getToken } from "../utils/tokenManager";
import { X, Upload } from 'lucide-react';

const AdminCharityManagementEdit = ({ item, onClose, api }) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview URL for image/video
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken('admin_auth_token');
      const formData = new FormData();
      
      // Add all fields except 'type' to formData
      for (const key in editedItem) {
        if (key !== 'type' && key !== editedItem.type) {
          formData.append(key, editedItem[key]);
        }
      }
      
      // Only append file if a new one was selected
      if (file) {
        formData.append(editedItem.type, file);
      }

      // Add a flag to indicate if we're keeping the existing file
      formData.append('keepExisting', !file ? 'true' : 'false');

      const response = await fetch(`${api}/admin/charity/${editedItem.type}/${editedItem[`${editedItem.type}_id`]}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to update item: ${response.status} ${response.statusText}`);
      }

      // Cleanup preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative z-50 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit {editedItem.type}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {(editedItem.type === 'image' || editedItem.type === 'video') && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current {editedItem.type}:
              </label>
              <div className="border rounded-lg p-4 mb-4">
                {editedItem.type === 'image' && (
                  <img
                    src={previewUrl || `/images/${editedItem.image}`}
                    alt="Current media"
                    className="max-h-64 object-contain mx-auto"
                  />
                )}
                {editedItem.type === 'video' && (
                  <video
                    src={previewUrl || `/images/${editedItem.video}`}
                    controls
                    className="max-h-64 w-full"
                  />
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload new {editedItem.type}:
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept={editedItem.type === 'image' ? "image/*" : "video/*"}
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
            </div>
          )}
          {editedItem.type === 'story' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={editedItem.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d071a]"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {editedItem.type === 'story' ? 'Story' : 'Description'}:
            </label>
            <textarea
              name={editedItem.type === 'story' ? 'story' : 'description'}
              value={editedItem.type === 'story' ? editedItem.story : editedItem.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d071a]"
              rows="4"
            ></textarea>
          </div>
          {error && (
            <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#6d071a] text-white px-4 py-2 rounded-md text-sm hover:bg-[#8b0921]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCharityManagementEdit;

