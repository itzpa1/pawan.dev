"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Fragment, useEffect, useState } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import Link from "next/link";
import { Skeleton } from "@/components/Skeleton";

export const GraphicsSection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "/api/resources?folder=Portfolio&limit=10",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        // Filter out PDFs
        const filteredImages = data.filter(
          (item) => item.category !== "pdf" && item.format !== "pdf",
        );
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
      <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
        <div className="flex gap-4 pr-4 flex-none animate-move-left [animation-duration:30s] hover:[animation-play-state:paused]">
          {loading ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="flex-shrink-0 w-[300px] md:w-[350px] snap-start p-2"
                >
                  <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                </Card>
              ))
          ) : (
            <Fragment>
              {[...new Array(2)].fill(0).map((_, idx) => (
                <Fragment key={idx}>
                  {images.map((item, index) => (
                    <Card
                      key={`${idx}-${item.id}`}
                      className="flex-shrink-0 w-[300px] md:w-[350px] p-2 group cursor-pointer overflow-hidden border border-white/5 hover:border-emerald-300/50 transition-all duration-300 transform hover:-translate-y-1"
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
                </Fragment>
              ))}
            </Fragment>
          )}
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
