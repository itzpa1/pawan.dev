"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Fragment, useEffect, useState } from "react";
import Graphic1 from "@/assets/graphics/graphic1.png";
import Graphic2 from "@/assets/graphics/graphic2.png";
import Graphic3 from "@/assets/graphics/graphic3.png";
import Graphic4 from "@/assets/graphics/graphic4.png";
import Graphic5 from "@/assets/graphics/graphic5.png";
import Graphic6 from "@/assets/graphics/graphic6.png";
import Graphic8 from "@/assets/graphics/graphic8.png";
import Graphic9 from "@/assets/graphics/graphic9.png";
import Graphic10 from "@/assets/graphics/graphic10.png";
import Graphic11 from "@/assets/graphics/graphic11.png";
import Graphic12 from "@/assets/graphics/graphic12.png";
import Graphic13 from "@/assets/graphics/graphic13.png";
import Graphic14 from "@/assets/graphics/graphic14.png";
import { useRouter } from "next/navigation";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import Link from "next/link";

const graphics = [
  {
    id: 1,
    image: Graphic1,
  },
  {
    id: 2,
    image: Graphic2,
  },
  {
    id: 3,
    image: Graphic3,
  },
  {
    id: 4,
    image: Graphic4,
  },
  {
    id: 5,
    image: Graphic5,
  },
  {
    id: 6,
    image: Graphic6,
  },
  {
    id: 8,
    image: Graphic8,
  },
  {
    id: 9,
    image: Graphic9,
  },
  {
    id: 10,
    image: Graphic10,
  },
  {
    id: 11,
    image: Graphic11,
  },
  {
    id: 12,
    image: Graphic12,
  },
  {
    id: 13,
    image: Graphic13,
  },
  {
    id: 14,
    image: Graphic14,
  },
];

import { Skeleton } from "@/components/Skeleton";

export const GraphicsSection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/resources?folder=Portfolio&limit=6");

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        // Filter out PDFs and limit to first 6 images
        const filteredImages = data
          .filter((item) => item.category !== "pdf" && item.format !== "pdf")
          .slice(0, 6);
        setImages(filteredImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="py-16 lg:py-24 relative" id="graphic">
      <SectionHeader
        eyebrow="Graphics"
        title="Recent Graphic Works"
        description="Freshly baked designs from my creative studio."
      />
      <div className="mt-12 lg:mt-20 container">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <Card
                    key={i}
                    className="flex-shrink-0 w-[300px] md:w-[350px] snap-start p-2"
                  >
                    <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                  </Card>
                ))
            : images.map((item, index) => (
                <Card
                  key={item.id}
                  className="flex-shrink-0 w-[300px] md:w-[350px] snap-start p-2 group cursor-pointer overflow-hidden border border-white/5 hover:border-emerald-300/50 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <Link href="/graphic">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={item.thumbnail || item.url}
                        alt={item.name}
                        className="w-full h-auto aspect-[3/4] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                          View all
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
        </div>
      </div>
      <div className="w-full flex justify-center mt-12">
        <Link href="/graphic">
          <button className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-md text-gray-950 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20">
            <span>Explore Full Gallery</span>
            <FaExternalLinkSquareAlt className="text-gray-950" />
          </button>
        </Link>
      </div>
    </div>
  );
};
