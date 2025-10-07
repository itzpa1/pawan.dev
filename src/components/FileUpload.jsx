"use client";
import { useState } from "react";
import { Card } from "./Card";
import Image from "next/image";
import { MdUploadFile } from "react-icons/md";
import Link from "next/link";

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    folder: "Portfolio/images",
    fileName: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const folderOptions = [
    { value: "Portfolio/images", label: "Images", accept: "image/*" },
    { value: "Portfolio/videos", label: "Videos", accept: "video/*" },
    { value: "Portfolio/pdfs", label: "PDFs", accept: ".pdf" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Create preview
    if (file) {
      const fileType = file.type;
      const objectUrl = URL.createObjectURL(file);

      setFilePreview({
        url: objectUrl,
        type: fileType,
        name: file.name,
        size: file.size,
      });

      // Set default file name
      if (!uploadData.fileName) {
        setUploadData((prev) => ({
          ...prev,
          fileName: file.name.split(".")[0], // Remove extension
        }));
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", uploadData.folder);
      if (uploadData.fileName) {
        formData.append("fileName", uploadData.fileName);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setUploadResult({ success: true, data: result.file });
      setSelectedFile(null);
      setFilePreview(null);
      setUploadData((prev) => ({ ...prev, fileName: "" }));

      // Reset file input
      document.getElementById("file-input").value = "";
    } catch (error) {
      setUploadResult({ success: false, error: error.message });
    } finally {
      setUploading(false);
    }
  };

  const getCurrentAccept = () => {
    const folder = folderOptions.find((f) => f.value === uploadData.folder);
    return folder?.accept || "*/*";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getFileType = (type) => {
    if (type.startsWith("image/")) return "Image";
    if (type.startsWith("video/")) return "Video";
    if (type === "application/pdf") return "PDF";
    return type;
  };

  return (
    <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-4 gap-6">
      <Card className="flex-1 w-full col-auto md:row-auto md:col-start-2 mx-auto p-6 shadow-md">
        <h2 className="text-2xl font-bold text-white mb-6">Upload Files</h2>
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Target Folder
            </label>
            <select
              value={uploadData.folder}
              onChange={(e) =>
                setUploadData({ ...uploadData, folder: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-500 font-medium text-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            >
              {folderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-white mt-1">
              Files will be uploaded to: <strong>{uploadData.folder}</strong>
            </p>
          </div>

          {/* File Name (Optional) */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Custom File Name (Optional)
            </label>
            <input
              type="text"
              value={uploadData.fileName}
              onChange={(e) =>
                setUploadData({ ...uploadData, fileName: e.target.value })
              }
              placeholder="Leave empty to use original filename"
              className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder:text-gray-500 text-gray-950 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select File
            </label>
            <input
              id="file-input"
              type="file"
              accept={getCurrentAccept()}
              onChange={handleFileChange}
              className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-gray-900 hover:file:bg-indigo-100"
            />
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
              "Upload File"
            )}
          </button>
        </form>

        {/* Upload Result */}
        {uploadResult && (
          <div
            className={`mt-6 p-4 rounded-md ${
              uploadResult.success
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {uploadResult.success ? (
              <div className="">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-green-800 font-medium">
                    Upload Successful!
                  </h3>
                </div>
                <div className="mt-2 text-sm text-green-700">
                  <p className="flex gap-0.5">
                    <strong>URL:</strong>{" "}
                    <Link
                      href={uploadResult.data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline line-clamp-1 text-ellipsis"
                    >
                      {uploadResult.data.url}
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="text-red-800 font-medium">Upload Failed</h3>
                  <p className="text-sm text-red-700 mt-1">
                    {uploadResult.error}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Preview Card */}
      <Card
        className={"flex-1 col-auto md:row-auto md:col-start-3 p-6 shadow-md"}
      >
        <h1 className="text-2xl font-bold text-white">Preview</h1>
        {selectedFile && (
          <p className="text-white/80 font-medium grid grid-cols-3">
            <span className="text-ellipsis line-clamp-1 col-span-2">
              {selectedFile.name}
            </span>{" "}
            <span className="col-span-1 ">
              &bull; ({formatFileSize(selectedFile.size)})
            </span>
          </p>
        )}

        {filePreview ? (
          <div className="my-4 flex-1">
            {/* Preview Content */}
            <div className="p-4 rounded-lg">
              {filePreview.type.startsWith("image/") && (
                <div className="flex justify-center">
                  {filePreview.url.startsWith("blob:") ? (
                    // Use img for blob URLs
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={filePreview.url}
                      alt="Preview"
                      className="max-w-full max-h-64 object-contain rounded-lg"
                    />
                  ) : (
                    // Use Next.js Image for regular URLs (after upload)
                    <Image
                      src={filePreview.url}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="max-w-full max-h-64 object-contain rounded-lg"
                    />
                  )}
                </div>
              )}

              {filePreview.type.startsWith("video/") && (
                <div className="flex w-full justify-center">
                  <video controls className="max-w-full max-h-64 rounded-lg">
                    <source src={filePreview.url} type={filePreview.type} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {filePreview.type === "application/pdf" && (
                <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-lg">
                  <svg
                    className="w-16 h-16 text-red-400 mb-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-white text-center">
                    PDF Preview
                    <br />
                    <span className="text-sm text-white/60">
                      (Preview will be available after upload)
                    </span>
                  </p>
                  <a
                    href={filePreview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Open PDF
                  </a>
                </div>
              )}

              {!filePreview.type.startsWith("image/") &&
                !filePreview.type.startsWith("video/") &&
                filePreview.type !== "application/pdf" && (
                  <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-lg">
                    <svg
                      className="w-16 h-16 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-white text-center">
                      File Preview
                      <br />
                      <span className="text-sm text-white/60">
                        No preview available for this file type
                      </span>
                    </p>
                  </div>
                )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col self-center items-center justify-center h-[80%] bg-white/5 rounded-lg border-2 border-dashed border-white/20">
            <MdUploadFile className="text-white/60" size={"40"} />
            <p className="text-white/60 text-center">
              Select a file to see preview
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
