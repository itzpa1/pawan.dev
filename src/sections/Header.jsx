"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { HomeIcon } from "@/components/ui/home";
import { FoldersIcon } from "@/components/ui/folders";
import { UserIcon } from "@/components/ui/user";
import { MailboxIcon } from "@/components/ui/mailbox";
import { useState } from "react";

const headerData = [
  { name: "Home", link: "/#", Icon: HomeIcon },
  { name: "Projects", link: "/#project", Icon: FoldersIcon },
  { name: "About", link: "/#about", Icon: UserIcon },
  { name: "Contact", link: "/#contact", Icon: MailboxIcon },
  { name: "Graphics", link: "/#graphic", Icon: null },
];

export const Header = () => {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        {headerData.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>
    </div>
  );
};

// Sub-component to handle individual hover states
const NavItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, link, Icon } = item;

  return (
    <Link
      href={link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={twMerge(
        "nav-item flex gap-2 items-center",
        link === "/#graphic" && "bg-white text-gray-900 hover:bg-white/70 hover:cursor-pointer"
      )}
    >
      {/* If Icon exists, render it with the hover state; otherwise show emoji */}
      {Icon ? (
        <Icon
          size={20}
          isTriggered={isHovered}
          className="text-xl md:text-base"
        />
      ) : (
        <span className="text-xl">🎨</span>
      )}

      <p className="hidden md:inline-flex">{name}</p>
    </Link>
  );
};