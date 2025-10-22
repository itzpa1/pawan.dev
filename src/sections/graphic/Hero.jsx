import Avatar from "@/assets/images/user.png";
import Image from "next/image";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { HeroOrbit } from "@/components/HeroOrbit";
import Link from "next/link";
import { IoEarthOutline, IoLocationOutline } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

export const LeftSection = () => {
  return (
    <div className="md:w-1/2  p-8 flex flex-col justify-center items-center md:sticky top-0 md:h-screen">
      <div className="md:max-w-md flex flex-col items-center md:items-start pt-4 md:pt-0">
        <div className="size-[180px] relative rounded-full border-emerald-300/5 shadow-[0_0_80px_inset] shadow-emerald-300/5 flex items-center justify-center">
          <p className="md:hidden absolute left-1/2 -translate-x-1/2 top-1 font-bold text-3xl z-0 text-white/50">
            PORTIFOLIO
          </p>
          <HeroOrbit
            size={180}
            rotation={-72}
            shouldOrbit
            orbitDuration="48s"
            shouldSpin
            spinDuration="6s"
          >
            <SparkleIcon className="size-8 text-emerald-300/80" />
          </HeroOrbit>
          <Image
            src={Avatar}
            className="w-32 aspect-square rounded-full shadow-[0_0_80px_inset] shadow-emerald-300/5 z-10"
            alt="user"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-1 my-4">
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

        <div className="flex flex-col items-center md:items-start gap-2 my-6 md:my-0">
          <h1 className="text-3xl md:text-4xl font-bold">
            Hi👋, I&apos;m PAWAN
          </h1>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-1 text-sm text-white font-medium">
                <IoLocationOutline />
                India
              </p>
              <p className="flex items-center gap-1 text-sm text-white font-medium">
                <IoEarthOutline />
                Hindi, English
              </p>
            </div>
            <span className="hidden md:inline-flex">&bull;</span>
            <div className="flex items-center gap-3 text-xl md:text-lg">
              <Link
                href={"mailto:pehlalevel@gmail.com"}
                className="text-white hover:text-white/50 duration-200"
              >
                <MdMail />
              </Link>
              <Link
                href={"https://linkedin.com/in/itzpa1"}
                className="text-white hover:text-white/50 duration-200"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                href={"https://instagram.com/code.itzpa1"}
                className="text-white hover:text-white/50 duration-200"
              >
                <FaInstagram />
              </Link>
              <Link
                href={"https://youtube.com/@itz_pa1"}
                className="text-white hover:text-white/50 duration-200"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
          <p className="text-white/60 text-base md:text-sm text-center md:text-justify">
            I work as a short-form video editor, graphic designer, and frontend
            web developer. I create social media content, edit reels, enhance
            website UI/UX.
          </p>
        </div>
      </div>
    </div>
  );
};
