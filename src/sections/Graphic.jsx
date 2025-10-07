"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { Fragment } from "react";
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

export const GraphicsSection = () => {
  const router = useRouter();

  return (
    <div className="py-16 lg:py-24 relative" id="graphic">
      <SectionHeader
        eyebrow="Graphics"
        title="What Clients Say about Me"
        description="Designing with Passion, Precision, and a Pinch of Magic"
      />
      <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
        <div className="flex gap-8 pr-8 flex-none animate-move-right [animation-duration:90s] hover:[animation-play-state:paused]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {graphics.map((item) => (
                <Card
                  key={item.id}
                  className="max-w-xs w-64 md:w-96 md:p-8 p-6 md:max-w-md hover:-rotate-3 transition duration-300"
                >
                  <div className="w-full overflow-hidden aspect-[4/5] rounded-lg">
                    <Image
                      className="object-cover"
                      src={item.image}
                      alt={item.id}
                    />
                  </div>
                </Card>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => router.replace("/graphic")}
          className="inline-flex items-center gap-2 px-3 md:px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-lg py-1 md:py-2 cursor-pointer"
        >
          <span className="font-medium text-gray-950">
            🔗Check Graphics Section
          </span>
          <FaExternalLinkSquareAlt className="text-gray-950" />
        </button>
      </div>
    </div>
  );
};
