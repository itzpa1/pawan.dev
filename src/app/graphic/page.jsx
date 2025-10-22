import { LeftSection } from "@/sections/graphic/Hero";
import { RightSection } from "@/sections/graphic/Article";
import grainImage from "@/assets/images/grain.jpg";

export default function Graphic() {
  return (
    <div className="flex flex-col md:flex-row relative md:h-screen">
      <div
        className="absolute inset-0 -z-30 opacity-5 "
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>
      <LeftSection />
      <RightSection />
    </div>
  );
}
