"use client";

import { useEffect, useState } from "react";
import { FaSquareCaretUp } from "react-icons/fa6";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top fun
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in hover:-translate-y-1 "
      aria-label="Scroll to top"
    >
      <FaSquareCaretUp className="w-10 h-10 text-sky-400 shadow-md hover:shadow-lg hover:shadow-sky-400/20" />
    </button>
  );
}
