"use client";
import { useState, useEffect } from "react";

// Mock data for development
const mockImages = [
  {
    id: "1",
    url: "/graphic1.png",
    width: 400,
    height: 600,
    name: "Creative Design 1",
    format: "png",
    aspectRatio: 0.666,
    thumbnail: "/graphic1.png",
  },
  {
    id: "2",
    url: "/graphic2.png",
    width: 600,
    height: 400,
    name: "Brand Identity",
    format: "png",
    aspectRatio: 1.5,
    thumbnail: "/graphic2.png",
  },
  {
    id: "3",
    url: "/graphic3.png",
    width: 500,
    height: 500,
    name: "Logo Design",
    format: "png",
    aspectRatio: 1,
    thumbnail: "/graphic3.png",
  },
  {
    id: "4",
    url: "/graphic4.png",
    width: 800,
    height: 400,
    name: "Poster Design",
    format: "png",
    aspectRatio: 2,
    thumbnail: "/graphic4.png",
  },
  {
    id: "5",
    url: "/graphic5.png",
    width: 400,
    height: 800,
    name: "Mobile App UI",
    format: "png",
    aspectRatio: 0.5,
    thumbnail: "/graphic5.png",
  },
  {
    id: "6",
    url: "/graphic6.png",
    width: 600,
    height: 300,
    name: "Web Banner",
    format: "png",
    aspectRatio: 2,
    thumbnail: "/graphic6.png",
  },
  {
    id: "7",
    url: "/graphic8.png",
    width: 700,
    height: 500,
    name: "Packaging Design",
    format: "png",
    aspectRatio: 1.4,
    thumbnail: "/graphic8.png",
  },
  {
    id: "8",
    url: "/graphic9.png",
    width: 450,
    height: 600,
    name: "Social Media Post",
    format: "png",
    aspectRatio: 0.75,
    thumbnail: "/graphic9.png",
  },
];

// Toggle this to false when you want real API data
const USE_MOCK_DATA = false;
const IMAGES_PER_LOAD = 4; // Number of images to load each time

export const Portfolio = () => {
  const [allImages, setAllImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [columns, setColumns] = useState(4);

  // Initialize with first batch of images
  useEffect(() => {
    const fetchImages = async () => {
      if (USE_MOCK_DATA) {
        // Use mock data in development
        console.log("Using mock data for development");
        setTimeout(() => {
          setAllImages(mockImages);
          setDisplayedImages(mockImages.slice(0, IMAGES_PER_LOAD));
          setHasMore(mockImages.length > IMAGES_PER_LOAD);
          setLoading(false);
        }, 1000);
        return;
      }

      try {
        const response = await fetch("/api/images", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "dev-key",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        setAllImages(data);
        setDisplayedImages(data.slice(0, IMAGES_PER_LOAD));
        setHasMore(data.length > IMAGES_PER_LOAD);
      } catch (error) {
        console.error("Error fetching images:", error);
        // Fallback to mock data if API fails
        setAllImages(mockImages);
        setDisplayedImages(mockImages.slice(0, IMAGES_PER_LOAD));
        setHasMore(mockImages.length > IMAGES_PER_LOAD);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Shuffle images for random layout
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Group images into columns for masonry layout
  const getColumns = () => {
    const shuffledImages = shuffleArray(allImages);
    const columnsArray = Array.from({ length: columns }, () => []);

    shuffledImages.forEach((image, index) => {
      columnsArray[index % columns].push(image);
    });

    return columnsArray;
  };

  const columnData = getColumns();

  // Load more images
  const loadMoreImages = () => {
    setLoadingMore(true);

    setTimeout(() => {
      const currentLength = displayedImages.length;
      const nextImages = allImages.slice(
        currentLength,
        currentLength + IMAGES_PER_LOAD
      );

      setDisplayedImages((prev) => [...prev, ...nextImages]);
      setHasMore(currentLength + IMAGES_PER_LOAD < allImages.length);
      setLoadingMore(false);
    }, 800); // Simulate loading delay
  };

  // Open image in modal
  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // Close modal
  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  // Navigate to next/previous image
  const navigateImage = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % displayedImages.length;
    } else {
      newIndex =
        (currentIndex - 1 + displayedImages.length) % displayedImages.length;
    }

    setCurrentIndex(newIndex);
    setSelectedImage(displayedImages[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") closeImageModal();
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "ArrowLeft") navigateImage("prev");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        {USE_MOCK_DATA && (
          <span className="ml-3 text-blue-600 text-sm">(Using Mock Data)</span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      {USE_MOCK_DATA && (
        <div className="text-center mb-6 p-3 bg-yellow-100 text-yellow-800 rounded-lg max-w-md mx-auto">
          Development Mode: Using Mock Data
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
        {columnData.map((column, columnIndex) => (
          <div className="flex flex-col gap-4" key={columnIndex}>
            {column.map((image, index) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl duration-300 cursor-pointer transform hover:scale-[1.02] transition-transform"
                onClick={() => openImageModal(image, index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.thumbnail || image.url}
                  alt={image.name}
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: image.aspectRatio,
                    minHeight: "200px",
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMoreImages}
            disabled={loadingMore}
            className="bg-gradient-to-r from-emerald-400 to-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-500 hover:to-sky-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {/* Image Count */}
      <div className="text-center mt-6 text-gray-600">
        Showing {displayedImages.length} of {allImages.length} images
      </div>

      {/* Gallery Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative max-w-4xl max-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-xl font-semibold">{selectedImage.name}</h3>
              <p className="text-sm opacity-80 mt-1">
                {selectedImage.width} × {selectedImage.height} •{" "}
                {currentIndex + 1} of {displayedImages.length}
              </p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {displayedImages.length}
          </div>
        </div>
      )}

      {displayedImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No images found in portfolio.</p>
        </div>
      )}
    </div>
  );
};
