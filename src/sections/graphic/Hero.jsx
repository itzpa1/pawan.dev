import Avatar from "@/assets/images/user.png";
import Image from "next/image";
import SparkleIcon from "@/assets/icons/star.svg";
import { HeroOrbit } from "@/components/HeroOrbit";
import Link from "next/link";
import { IoEarthOutline, IoLocationOutline } from "react-icons/io5";

export const LeftSection = () => {
  return (
    <div className="w-1/2  p-8 flex flex-col justify-center items-center sticky top-0 h-screen">
      <div className="max-w-md flex flex-col">
        <div className="size-[180px] relative rounded-full border-emerald-300/5 shadow-[0_0_80px_inset] shadow-emerald-300/5 flex items-center justify-center">
          <HeroOrbit
            size={180}
            rotation={-72}
            shouldOrbit
            orbitDuration="48s"
            shouldSpin
            spinDuration="6s"
          >
            <SparkleIcon className="size-8 text-emerald-300/20" />
          </HeroOrbit>
          <Image
            src={Avatar}
            className="w-32 aspect-square rounded-full shadow-[0_0_80px_inset] shadow-emerald-300/5"
            alt="user"
          />
        </div>

        <div className="flex items-center w-full gap-1 my-4">
          <div className="bg-gray-950 border border-gray-800 px-3 py-1.5 inline-flex items-center gap-3 rounded-lg cursor-default">
            <div className="bg-green-500 size-2 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 animate-ping-large rounded-full"></div>
            </div>
            <p className="text-xs font-medium ">Available for new projects</p>
          </div>
          <Link
            href={"https://linkedin.com/in/itzpa1"}
            className="px-3 py-[4px] rounded-lg text-xs font-medium text-gray-950 bg-white border border-white/80"
          >
            Let&apos;s Connect
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold">Hi👋, I&apos;m PAWAN</h1>
          <div className="flex gap-4 items-center">
            <p className="flex items-center gap-1 text-sm text-white font-medium">
              <IoLocationOutline />
              India
            </p>
            <p className="flex items-center gap-1 text-sm text-white font-medium">
              <IoEarthOutline />
              Hindi, English
            </p>
          </div>
          <p className="text-white/60 text-base md:text-sm text-justify">
            I work as a short-form video editor, graphic designer, and frontend
            web developer. I create social media content, edit reels, enhance
            website UI/UX.
          </p>
        </div>
      </div>
    </div>
  );
};
