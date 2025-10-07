"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Images</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={image.url}
              alt={image.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="font-medium">{image.name}</p>
              <p className="text-sm text-gray-500">
                {image.width} × {image.height}
              </p>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center text-gray-500">
          No images found in Cloudinary folder
        </div>
      )}
    </div>
  );
}
