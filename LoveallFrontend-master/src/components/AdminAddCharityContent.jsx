import React, { useState } from 'react';
import { getToken } from "../utils/tokenManager";
import { X, Upload } from 'lucide-react';

const AdminAddCharityContent = ({ type, onClose, api }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken('admin_auth_token');
      const formData = new FormData();
      
      if (type === 'image' || type === 'video') {
        if (!file) {
          throw new Error(`Please select a ${type} to upload`);
        }
        formData.append('file', file);
        formData.append('description', description);
      } else if (type === 'story') {
        if (!title || !description) {
          throw new Error('Please provide both title and description for the story');
        }
        formData.append('title', title);
        formData.append('story', description);
      }

      const response = await fetch(`${api}/admin/charity/${type}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add ${type}: ${response.status} ${response.statusText}`);
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {(type === 'image' || type === 'video') && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload {type}:
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
                    accept={type === 'image' ? "image/*" : "video/*"}
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
          )}
          {type === 'story' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d071a]"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {type === 'story' ? 'Story' : 'Description'}:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#6d071a] text-white px-4 py-2 rounded-md text-sm hover:bg-[#8b0921]"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCharityContent;

