import { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";
import Image from "next/image";

export const ImageSlideModal = ({ selectedImageI, imgData, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(selectedImageI);
  const [mediaOrientation, setMediaOrientation] = useState("landscape");

  // Update internal state when prop changes
  useEffect(() => {
    setSelectedImageIndex(selectedImageI);
  }, [selectedImageI]);

  // Detect orientation when selected image changes
  useEffect(() => {
    if (selectedImageIndex === null || !imgData) return;

    const currentItem = imgData[selectedImageIndex];
    detectOrientation(currentItem);
  }, [selectedImageIndex, imgData]);

  const detectOrientation = async (item) => {
    if (!item) {
      setMediaOrientation("landscape");
      return;
    }

    // If orientation is explicitly provided, use it
    if (item.orientation) {
      setMediaOrientation(item.orientation);
      return;
    }

    // If dimensions are provided, use them
    if (item.width && item.height) {
      setMediaOrientation(item.height > item.width ? "portrait" : "landscape");
      return;
    }

    const mediaUrl =
      typeof item === "string" ? item : item.url || item.secure_url || item.src;
    const mediaType = getMediaType(item);

    if (mediaType === "image") {
      try {
        const img = new window.Image();
        img.src = mediaUrl;
        await new Promise((resolve, reject) => {
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
        setMediaOrientation(img.height > img.width ? "portrait" : "landscape");
      } catch (error) {
        console.warn(
          "Could not detect image orientation, using landscape as default",
        );
        setMediaOrientation("landscape");
      }
    } else if (mediaType === "pdf") {
      setMediaOrientation("portrait");
    } else {
      // Default
      setMediaOrientation("landscape");
    }
  };

  const getMediaType = (item) => {
    if (!item) return "image";
    const mediaUrl =
      typeof item === "string" ? item : item.url || item.secure_url || item.src;
    if (!mediaUrl) return "image";
    const cleanUrl = mediaUrl.split("?")[0];
    if (cleanUrl.toLowerCase().endsWith(".pdf")) return "pdf";
    return item.type || "image";
  };

  const handleNext = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % imgData.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex(
      (selectedImageIndex - 1 + imgData.length) % imgData.length,
    );
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
    onClose();
  };

  // Don't render the modal if no image is selected or no imgData
  if (
    selectedImageIndex === null ||
    selectedImageIndex === undefined ||
    !imgData
  ) {
    return null;
  }

  // Get the current media item
  const currentItem = imgData[selectedImageIndex];
  const mediaUrl =
    typeof currentItem === "string"
      ? currentItem
      : currentItem?.url || currentItem?.secure_url || currentItem?.src;
  const mediaAlt =
    typeof currentItem === "string"
      ? `Work ${selectedImageIndex + 1}`
      : currentItem?.alt || `Work ${selectedImageIndex + 1}`;
  const mediaType = getMediaType(currentItem);

  if (!mediaUrl) {
    console.error(`No valid media found at index ${selectedImageIndex}`);
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
      >
        <IoClose />
      </button>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors md:left-8"
      >
        <FaChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors md:right-8"
      >
        <FaChevronRight />
      </button>

      {/* Media Content */}
      <div
        className={`relative mx-4 ${
          mediaOrientation === "portrait"
            ? "w-full max-w-md h-[80vh]" // Constrain width for portrait
            : "w-full max-w-4xl max-h-[80vh]" // Constrain both for landscape
        }`}
      >
        {mediaType === "pdf" ? (
          <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
            <div className="bg-gray-100 p-2 border-b flex justify-between items-center ">
              <span className="text-gray-900 text-xs font-bold uppercase ml-2">
                PDF Viewer
              </span>
              <div className="flex gap-2">
                <a
                  href={mediaUrl}
                  download
                  className="bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-bold px-3 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <FaDownload /> Download
                </a>
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded transition-colors"
                >
                  Full View
                </a>
              </div>
            </div>
            <div className="w-full h-full relative flex-1">
              {/* Fallback text if iframe fails */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 z-0 p-4 text-center">
                <p className="mb-2">Preview not loading?</p>
                <a
                  href={mediaUrl}
                  download
                  className="text-emerald-500 underline font-bold"
                >
                  Download PDF instead
                </a>
              </div>
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(mediaUrl)}&embedded=true`}
                className="absolute inset-0 w-full h-full border-none z-10 bg-transparent"
                title="PDF Viewer"
                allow="fullscreen"
              />
            </div>
          </div>
        ) : (
          <Image
            src={mediaUrl}
            alt={mediaAlt}
            className="object-contain w-full h-full"
            width={mediaOrientation === "portrait" ? 400 : 1200}
            height={mediaOrientation === "portrait" ? 533 : 800}
            onError={(e) => {
              console.error("Image failed to load:", mediaUrl);
              e.target.style.display = "none";
            }}
          />
        )}

        {/* Media Counter */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
          {selectedImageIndex + 1} / {imgData.length}
        </div>
      </div>
    </div>
  );
};
