"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card } from "@/components/Card";
import { Fragment } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";

export const TestimonialCards = () => {
  const testimonialsData = useQuery(api.testimonials.get) || [];

  const marketingTestimonials = testimonialsData
    .filter((t) => t.visible && t.category === "marketing")
    .map((t) => ({
      name: t.name,
      position: t.role,
      text: t.message,
      avatar:
        t.avatarUrl ||
        `https://tapback.co/api/avatar/${t.name.split(" ")[0]}-${t.gender || "male"}.webp`,
    }));

  useImagePreloader(marketingTestimonials.map((t) => t.avatar).filter(Boolean));

  return (
    <div className="mt-6 ">
      <h1 className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text text-center md:text-left py-4">
        Testimonials <span className="text-white">📩</span>
      </h1>
      <div className="flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
        <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {marketingTestimonials.map((t) => (
                <Card
                  key={`${idx}-${t.name}`}
                  className="max-w-xs md:p-4 p-2 md:max-w-md hover:-rotate-3 transition duration-300"
                >
                  <div className="flex gap-4 items-center">
                    <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="max-h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <div className="font-semibold">
                        {t.name} &bull;{" "}
                        <span className="text-sm text-white/40">
                          {t.position}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 md:mt-4 text-sm md:text-base text-ellipsis line-clamp-3 ">
                    {t.text}
                  </p>
                </Card>
              ))}
            </Fragment>
          ))}
          {marketingTestimonials.length === 0 && (
            <div className="text-white/20 italic p-8">
              Awaiting marketing testimonials...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
