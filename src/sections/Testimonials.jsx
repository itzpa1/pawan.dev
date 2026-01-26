"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { Fragment } from "react";

export const TestimonialsSection = () => {
  const testimonialsData = useQuery(api.testimonials.get) || [];

  const techTestimonials = testimonialsData
    .filter((t) => t.visible && (t.category === "tech" || !t.category))
    .map((t) => ({
      name: t.name,
      position: t.role,
      text: t.message,
      avatarUrl:
        t.avatarUrl ||
        `https://tapback.co/api/avatar/${t.name.split(" ")[0]}-${t.gender || "male"}.webp`,
    }));

  useImagePreloader(techTestimonials.map((t) => t.avatarUrl).filter(Boolean));

  return (
    <div className="py-16 lg:py-24">
      <SectionHeader
        eyebrow="Happy Clients"
        title="What Clients Say about Me"
        description="Don't just take my word for it. See what my clients to say about my work."
      />
      <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
        <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {techTestimonials.map((t) => (
                <Card
                  key={`${idx}-${t.name}`}
                  className="max-w-xs md:p-8 p-6 md:max-w-md hover:-rotate-3 transition duration-300"
                >
                  <div className="flex gap-4 items-center">
                    <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden">
                      <img
                        src={t.avatarUrl}
                        alt={t.name}
                        className="max-h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-white/40">{t.position}</div>
                    </div>
                  </div>
                  <p className="mt-4 md:mt-6 text-sm md:text-base ">{t.text}</p>
                </Card>
              ))}
            </Fragment>
          ))}
          {techTestimonials.length === 0 && (
            <div className="text-white/20 italic p-8">
              Awaiting client testimonials...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
