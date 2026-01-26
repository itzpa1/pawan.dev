"use client";
import { useState } from "react";
import { Card } from "./Card";
import Image from "next/image";
import { MdUploadFile } from "react-icons/md";
import Link from "next/link";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FaImage, FaUpload } from "react-icons/fa6";
import { FaExternalLinkAlt, FaTrashAlt } from "react-icons/fa";

export default function FileUpload() {
  const addMedia = useMutation(api.media.add);
  const [uploading, setUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    folder: "Portfolio/images",
    fileName: "",
    imageCategory: "thumbnail", // logo, thumbnail, posters
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const folderOptions = [
    { value: "Portfolio/images", label: "Images", accept: "image/*" },
    { value: "Portfolio/pdfs", label: "PDFs", accept: ".pdf" },
    { value: "Portfolio/resume", label: "Resume", accept: ".pdf" },
  ];

  const imageCategoryOptions = [
    { value: "logo", label: "Logo" },
    { value: "thumbnail", label: "Thumbnail" },
    { value: "posters", label: "Posters" },
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

      // Construct full folder path with category for images
      let finalFolder = uploadData.folder;
      if (
        uploadData.folder === "Portfolio/images" &&
        uploadData.imageCategory
      ) {
        finalFolder = `${uploadData.folder}/${uploadData.imageCategory}`;
      }

      formData.append("folder", finalFolder);
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

      // SYNC TO CONVEX
      await addMedia({
        name: uploadData.fileName || selectedFile.name,
        secureUrl: result.file.url,
        publicId: result.file.id,
        type: result.file.type,
        format: result.file.format,
        category:
          uploadData.folder === "Portfolio/images"
            ? uploadData.imageCategory
            : uploadData.folder.split("/").pop(),
        visible: true,
      });

      setUploadResult({ success: true, data: result.file });
      setSelectedFile(null);
      setFilePreview(null);
      setUploadData((prev) => ({ ...prev, fileName: "" }));

      // Reset file input
      const fileInput = document.getElementById("file-input");
      if (fileInput) fileInput.value = "";
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
    if (type === "application/pdf") return "PDF";
    return type;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <Card className="lg:col-span-2 p-6 bg-white/5 border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FaUpload className="text-blue-400" /> New Upload
        </h3>
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Destination Pool
              </label>
              <select
                value={uploadData.folder}
                onChange={(e) =>
                  setUploadData({ ...uploadData, folder: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
              >
                {folderOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-zinc-900"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {uploadData.folder === "Portfolio/images" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Image Context
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {imageCategoryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setUploadData({
                          ...uploadData,
                          imageCategory: option.value,
                        })
                      }
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        uploadData.imageCategory === option.value
                          ? "bg-blue-600/20 border-blue-500 text-blue-400"
                          : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Identifier (Optional)
              </label>
              <input
                type="text"
                value={uploadData.fileName}
                onChange={(e) =>
                  setUploadData({ ...uploadData, fileName: e.target.value })
                }
                placeholder="Auto-generated if empty"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
              />
            </div>

            <div className="pt-2">
              <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer overflow-hidden">
                <div className="flex flex-col items-center justify-center py-4">
                  <FaImage
                    className={`w-8 h-8 mb-2 transition-transform group-hover:scale-110 ${selectedFile ? "text-blue-400" : "text-white/20"}`}
                  />
                  <p className="text-sm font-medium text-white/60">
                    {selectedFile ? selectedFile.name : "Choose or drag file"}
                  </p>
                  <p className="text-[10px] text-white/30 mt-1">
                    {selectedFile
                      ? formatFileSize(selectedFile.size)
                      : "Max 10MB"}
                  </p>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept={getCurrentAccept()}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:scale-100 active:scale-95"
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                Initializing...
              </div>
            ) : (
              "Initialize Upload"
            )}
          </button>
        </form>

        {uploadResult && (
          <div
            className={`mt-6 p-4 rounded-xl border animate-in slide-in-from-bottom-2 duration-300 ${
              uploadResult.success
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {uploadResult.success ? (
                <>
                  <div className="bg-green-500 rounded-full p-1 text-black">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-xs font-medium">
                    Synced successfully to Convex.
                  </div>
                  <Link
                    href={uploadResult.data.url}
                    target="_blank"
                    className="text-[10px] underline translate-y-px"
                  >
                    View
                  </Link>
                </>
              ) : (
                <div className="text-xs font-medium">
                  Error: {uploadResult.error}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      <Card className="lg:col-span-3 p-6 bg-white/5 border-white/10 flex flex-col min-h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FaImage className="text-blue-400" /> Live Preview
          </h3>
          {selectedFile && (
            <button
              onClick={() => {
                setSelectedFile(null);
                setFilePreview(null);
              }}
              className="text-white/40 hover:text-white transition-colors"
            >
              <FaTrashAlt className="w-4 h-4" />
            </button>
          )}
        </div>

        {filePreview ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-black/40 rounded-2xl border border-white/5 p-4 flex items-center justify-center overflow-hidden">
              {filePreview.type.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={filePreview.url}
                  alt="Preview"
                  className="max-w-full max-h-[300px] object-contain rounded-lg drop-shadow-2xl animate-in zoom-in duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-4 border border-red-500/20">
                    <svg
                      className="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-white mb-1 uppercase tracking-wider text-sm">
                    Document Preview
                  </h4>
                  <p className="text-white/40 text-xs mb-4">
                    Meta data validation successful
                  </p>
                  <a
                    href={filePreview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-2"
                  >
                    Open Full PDF <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">
                  MIME
                </p>
                <p className="text-xs text-white truncate">
                  {filePreview.type}
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">
                  Size
                </p>
                <p className="text-xs text-white uppercase">
                  {formatFileSize(filePreview.size)}
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">
                  Type
                </p>
                <p className="text-xs text-white">
                  {getFileType(filePreview.type)}
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">
                  Status
                </p>
                <p className="text-xs text-yellow-500 font-bold">STAGED</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-black/20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/10 mb-4 animate-pulse">
              <MdUploadFile size="48" />
            </div>
            <p className="text-white/30 text-sm font-medium">
              Awaiting file selection...
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
