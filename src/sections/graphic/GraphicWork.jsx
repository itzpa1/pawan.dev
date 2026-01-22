"use client";
import { SectionHeader } from "@/components/graphic/SectionHeader";
import Image from "next/image";
import { Card } from "@/components/Card";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { ImageSlideModal } from "@/components/graphic/ImageSlideModal";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { CiImageOff } from "react-icons/ci";

import { Skeleton } from "@/components/Skeleton";

export const GraphicSection = ({ title, imgData, loading }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 items initially (2 cols + 3 in second row)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleLoadMore = () => {
    if (!imgData || !Array.isArray(imgData)) return;
    setVisibleCount((prev) => Math.min(prev + 6, imgData.length)); // Load 6 more items
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  // Safety checks for imgData
  if (
    !loading &&
    (!imgData || !Array.isArray(imgData) || imgData.length === 0)
  ) {
    return (
      <div className="max-w-full">
        <SectionHeader title={title} />
        <div className="container px-0 flex flex-col items-center gap-1 text-gray-500">
          <CiImageOff size={40} />
          <p className="text-center ">No images available</p>
        </div>
      </div>
    );
  }

  const visibleItems = imgData.slice(0, visibleCount);
  const hasMoreItems = visibleCount < imgData.length;

  return (
    <div className="max-w-full">
      <SectionHeader title={title} />
      <div className="container px-0">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="break-inside-avoid mb-3">
                  <Card className="p-2 h-auto">
                    <Skeleton className="w-full aspect-[3/4] rounded-2xl" />
                  </Card>
                </div>
              ))
          ) : (
            <>
              {visibleItems.map((item, index) => {
                // Handle different data structures (Cloudinary or simple array)
                let imageUrl =
                  typeof item === "string"
                    ? item
                    : item.url || item.secure_url || item.src;
                const imageAlt =
                  typeof item === "string"
                    ? `Work ${index + 1}`
                    : item.alt || `Work ${index + 1}`;

                if (!imageUrl) {
                  console.warn(
                    `No valid image URL found for item at index ${index}`,
                    item,
                  );
                  return null;
                }

                // Check if it's a PDF and generate thumbnail if it's Cloudinary
                const isPdf = imageUrl.toLowerCase().endsWith(".pdf");
                let displayUrl = imageUrl;
                if (isPdf && imageUrl.includes("cloudinary.com")) {
                  // Cloudinary PDF thumbnail trick: replace .pdf with .jpg
                  displayUrl = imageUrl.replace(/\.pdf$/i, ".jpg");
                }

                return (
                  <div key={index} className="break-inside-avoid mb-3">
                    <Card className="p-2 h-auto">
                      <div
                        className="cursor-pointer relative group"
                        onClick={() => openModal(index)}
                      >
                        <Image
                          src={displayUrl}
                          alt={imageAlt}
                          className="w-full h-auto object-cover rounded-2xl"
                          width={500}
                          height={500}
                          onError={(e) => {
                            console.error("Image failed to load:", displayUrl);
                            e.target.style.display = "none";
                          }}
                        />
                        {isPdf && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                            PDF
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                          <FaCirclePlus className="text-white text-3xl" />
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}

              {/* Load More Button */}
              {hasMoreItems && (
                <div className="break-inside-avoid">
                  <Card className="p-2 h-40">
                    <button
                      onClick={handleLoadMore}
                      className="h-full w-full flex items-center justify-center transition-colors rounded-2xl hover:bg-gray-900 border-2 border-dashed border-white/10"
                    >
                      <div className="text-center flex flex-col items-center justify-center gap-2">
                        <FaCirclePlus className="text-2xl" />
                        <div className="text-sm font-medium">Load More</div>
                      </div>
                    </button>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Image Slideshow Modal */}
      {selectedImageIndex !== null && (
        <ImageSlideModal
          selectedImageI={selectedImageIndex}
          imgData={imgData} // Pass the imgData to modal
          onClose={closeModal}
        />
      )}
    </div>
  );
};
