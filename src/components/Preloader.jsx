"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const words = [
    { text: "नमस्ते", font: "var(--font-rozha)" },
    { text: "welcome", font: "var(--font-poppins)" },
];

export const Preloader = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index === 0) {
            const timeout = setTimeout(() => setIndex(1), 1500);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black"
        >

            <div className="relative overflow-hidden h-24 md:h-32 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={words[index].text}
                        initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
                        transition={{
                            duration: 0.9,
                            ease: [0.215, 0.61, 0.355, 1]
                        }}
                        className="text-6xl md:text-8xl text-transparent bg-linear-to-r from-emerald-300 to-sky-400 bg-clip-text text-center leading-none tracking-tight"
                        style={{ fontFamily: words[index].font }}
                    >
                        {words[index].text}
                    </motion.p>
                </AnimatePresence>
            </div>


            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30%] bg-linear-to-t from-white/5 to-transparent pointer-events-none" />
        </motion.div>
    );
};