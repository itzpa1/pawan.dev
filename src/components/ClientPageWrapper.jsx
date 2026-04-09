"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Preloader } from "@/components/Preloader";

export const ClientPageWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let minTimePassed = false;
        let pageLoaded = false;

        const checkLoading = () => {
            if (minTimePassed && pageLoaded) {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            minTimePassed = true;
            checkLoading();
        }, 3800);

        const handleLoad = () => {
            pageLoaded = true;
            checkLoading();
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader />}
            </AnimatePresence>
            <div className={isLoading ? "invisible" : "visible"}>
                {children}
            </div>
        </>
    );
};