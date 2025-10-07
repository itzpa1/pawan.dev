'use client';
import { useState } from 'react';

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    folder: 'Portfolio',
    fileName: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const folderOptions = [
    { value: 'Portfolio', label: 'Portfolio (Images)', accept: 'image/*' },
    { value: 'Portfolio/videos', label: 'Videos', accept: 'video/*' },
    { value: 'Portfolio/pdfs', label: 'PDFs', accept: '.pdf' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    // Set default file name
    if (file && !uploadData.fileName) {
      setUploadData(prev => ({
        ...prev,
        fileName: file.name.split('.')[0] // Remove extension
      }));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('folder', uploadData.folder);
      if (uploadData.fileName) {
        formData.append('fileName', uploadData.fileName);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setUploadResult({ success: true, data: result.file });
      setSelectedFile(null);
      setUploadData(prev => ({ ...prev, fileName: '' }));
      
      // Reset file input
      document.getElementById('file-input').value = '';
      
    } catch (error) {
      setUploadResult({ success: false, error: error.message });
    } finally {
      setUploading(false);
    }
  };

  const getCurrentAccept = () => {
    const folder = folderOptions.find(f => f.value === uploadData.folder);
    return folder?.accept || '*/*';
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Files to Cloudinary</h2>
      
      <form onSubmit={handleUpload} className="space-y-6">
        {/* Folder Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Folder
          </label>
          <select
            value={uploadData.folder}
            onChange={(e) => setUploadData({...uploadData, folder: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {folderOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Files will be uploaded to: <strong>{uploadData.folder}</strong>
          </p>
        </div>

        {/* File Name (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom File Name (Optional)
          </label>
          <input
            type="text"
            value={uploadData.fileName}
            onChange={(e) => setUploadData({...uploadData, fileName: e.target.value})}
            placeholder="Leave empty to use original filename"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <input
            id="file-input"
            type="file"
            accept={getCurrentAccept()}
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {selectedFile && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: <strong>{selectedFile.name}</strong> ({Math.round(selectedFile.size / 1024)} KB)
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Uploading...
            </div>
          ) : (
            'Upload File'
          )}
        </button>
      </form>

      {/* Upload Result */}
      {uploadResult && (
        <div className={`mt-6 p-4 rounded-md ${
          uploadResult.success 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {uploadResult.success ? (
            <div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-green-800 font-medium">Upload Successful!</h3>
              </div>
              <div className="mt-2 text-sm text-green-700">
                <p><strong>URL:</strong> <a href={uploadResult.data.url} target="_blank" rel="noopener noreferrer" className="underline">{uploadResult.data.url}</a></p>
                <p><strong>Type:</strong> {uploadResult.data.type}</p>
                <p><strong>Folder:</strong> {uploadResult.data.folder}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-red-800 font-medium">Upload Failed</h3>
                <p className="text-sm text-red-700 mt-1">{uploadResult.error}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Folder Structure Info */}
      <div className="mt-8 bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Folder Structure</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center">
            <span className="w-32 font-medium">Portfolio/</span>
            <span>→ For images</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">Portfolio/videos/</span>
            <span>→ For video files</span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium">Portfolio/pdfs/</span>
            <span>→ For PDF documents</span>
          </div>
        </div>
      </div>
    </div>
  );
}