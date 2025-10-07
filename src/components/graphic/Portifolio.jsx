"use client";
import { useState, useEffect } from "react";

export const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
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
    const shuffledImages = shuffleArray(images);
    const columnsArray = Array.from({ length: columns }, () => []);

    shuffledImages.forEach((image, index) => {
      columnsArray[index % columns].push(image);
    });

    return columnsArray;
  };

  const columnData = getColumns();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-1/2">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {columnData.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl duration-300 cursor-pointer transform hover:scale-[1.01] transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.thumbnail}
                  alt={image.name}
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: image.aspectRatio,
                    minHeight: "200px",
                  }}
                  loading="lazy"
                />
                {/* <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {image.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {image.width} × {image.height}
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/80">No images found in portfolio.</p>
        </div>
      )}
    </div>
  );
};
