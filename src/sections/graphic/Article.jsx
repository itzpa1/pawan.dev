"use client";
import { GraphicSection } from "@/sections/graphic/GraphicWork";
import { useEffect, useState } from "react";

export const RightSection = () => {
  const [data, setData] = useState({
    recent: [],
    logos: [],
    thumbnails: [],
    posters: [],
    pdfs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/resources?folder=Portfolio");
        if (!response.ok) throw new Error("Failed to fetch resources");

        const flattened = await response.json();
        console.log(flattened)

        // Pick top 6 as recent (images only)
        const recent = flattened
          .filter((item) => item.category !== "pdf" && item.format !== "pdf")
          .slice(0, 6);

        // Group by category
        const grouped = flattened.reduce(
          (acc, item) => {
            if (item.category === "logo") acc.logos.push(item);
            else if (item.category === "thumbnail") acc.thumbnails.push(item);
            else if (item.category === "pdf") acc.pdfs.push(item);
            else if (item.category === "posters") acc.posters.push(item);
            return acc;
          },
          { recent, logos: [], thumbnails: [], posters: [], pdfs: [] },
        );

        setData(grouped);
      } catch (error) {
        console.error("Error fetching graphic data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="md:w-1/2 md:overflow-y-auto px-6 pb-4 md:px-0">
      <div className="md:pr-8 space-y-8">
        <GraphicSection
          title={"Recent Works📆"}
          imgData={data.recent}
          loading={loading}
        />
        <GraphicSection
          title={"Thumbnails🎴"}
          imgData={data.thumbnails}
          loading={loading}
        />
        <GraphicSection
          title={"Posters🖼️"}
          imgData={data.posters}
          loading={loading}
        />
        <GraphicSection
          title={"Logos⭐"}
          imgData={data.logos}
          loading={loading}
        />
        <GraphicSection
          title={"PPTs 📄"}
          imgData={data.pdfs}
          loading={loading}
        />
      </div>
    </div>
  );
};
