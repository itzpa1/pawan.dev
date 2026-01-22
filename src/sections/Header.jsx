import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { FaFolderOpen, FaHome, FaUser } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";

const header = [
  {
    name: "Home",
    link: "/#",
    icon: <FaHome className="text-xl md:text-lg" />,
  },
  {
    name: "Projects",
    link: "/#project",
    icon: <FaFolderOpen className="text-xl md:text-lg" />,
  },
  {
    name: "About",
    link: "/#about",
    icon: <FaUser className="text-xl md:text-lg" />,
  },
  {
    name: "Contact",
    link: "/#contact",
    icon: <IoMdMailUnread className="text-xl md:text-lg" />,
  },
  {
    name: "Graphics",
    link: "#graphic",
    icon: "",
  },
];
export const Header = () => {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        {header.map(({ name, link, icon }) => (
          <Link
            href={link}
            className={twMerge(
              link == "#graphic" &&
                "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900 hover:cursor-pointer",
              "nav-item flex gap-2 items-center",
            )}
            key={name}
          >
            {icon != "" ? icon : "🎨"}
            <p className="hidden md:inline-flex">{name}</p>
          </Link>
        ))}
      </nav>
    </div>
  );
};
