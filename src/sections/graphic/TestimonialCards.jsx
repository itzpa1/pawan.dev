import { reviewsMarketing } from "@/assets/reviews";
import { Card } from "@/components/Card";
import { Fragment } from "react";

const testimonials = reviewsMarketing.map((r) => ({
  name: r.name,
  position: `${r.role} @ ${r.organization}`,
  text: r.review,
  avatar: `https://tapback.co/api/avatar/${r.name.split(" ")[0]}-${r.gender}.webp`,
}));

export const TestimonialCards = () => {

  return (
    <div className="mt-6 ">
      <h1 className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text text-center md:text-left py-4">
        Testimonials <span className="text-white">📩</span>
      </h1>
      <div className="flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
        <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
          {[...new Array(2)].fill(0).map((_, idx) => (
            <Fragment key={idx}>
              {testimonials.map((testimonials) => (
                <Card
                  key={testimonials.name}
                  className="max-w-xs md:p-4 p-2 md:max-w-md hover:-rotate-3 transition duration-300"
                >
                  <div className="flex gap-4 items-center">
                    <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden">
                      <img
                        src={testimonials.avatar}
                        alt={testimonials.name}
                        className="max-h-full object-cover"
                      />
                    </div>
                    <div className="">
                      <div className="font-semibold">
                        {testimonials.name} &bull;{" "}
                        <span className="text-sm text-white/40">
                          {testimonials.position}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 md:mt-4 text-sm md:text-base text-ellipsis line-clamp-3 ">
                    {testimonials.text}
                  </p>
                </Card>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
