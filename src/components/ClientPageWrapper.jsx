"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Preloader } from "@/components/Preloader";

export const ClientPageWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader />}
            </AnimatePresence>
            <div className={isLoading ? "hidden" : "block"}>
                {children}
            </div>
        </>
    );
};