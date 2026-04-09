"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GithubIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GithubIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  isTriggered?: boolean;
}

const BODY_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3,
    },
  },
};

const TAIL_VARIANTS: Variants = {
  normal: { rotate: 0, translateY: 0 },
  animate: {
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const GithubIcon = forwardRef<GithubIconHandle, GithubIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, isTriggered, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (isTriggered) {
        controls.start("animate");
      } else if (isTriggered === false) {
        controls.start("normal");
      }
    }, [isTriggered, controls]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("animate");
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start("normal");
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
            variants={BODY_VARIANTS}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M9 18c-4.51 2-5-2-7-2"
            variants={TAIL_VARIANTS}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: "9px 18px" }}
          />
        </svg>
      </div>
    );
  }
);

GithubIcon.displayName = "GithubIcon";

export { GithubIcon };
