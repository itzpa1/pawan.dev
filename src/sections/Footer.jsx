// import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";

const footerLinks = [
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/itzpa1/",
  },
  {
    title: "GitHub",
    url: "https://github.com/itzpa1",
  },
  {
    title: "YouTube",
    url: "https://youtube.com/@itz_pa1/",
  },
  {
    title: "Instagram",
    url: "https://instagram.com/code.itzpa1/",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8 ">
          <div className="text-white/40 ">
            &copy; {currentYear}. All rights reserved.
          </div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <Link
                href={link.url}
                key={link.title}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <span className="font-semibold">{link.title}</span>
                <LuArrowUpRight />
                {/* <ArrowUpRightIcon className="size-4" /> */}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t md:border-none border-white/15 py-6 text-sm flex justify-center items-center gap-1">
          Made with <FaHeart color="white" /> by Pawan
        </p>
      </div>
    </footer>
  );
};
