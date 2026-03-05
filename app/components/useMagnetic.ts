"use client";

import { useEffect } from "react";

export default function useMagnetic(ref: any) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouse = (e: any) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        };

        const reset = () => {
            el.style.transform = `translate(0px,0px)`;
        };

        el.addEventListener("mousemove", handleMouse);
        el.addEventListener("mouseleave", reset);

        return () => {
            el.removeEventListener("mousemove", handleMouse);
            el.removeEventListener("mouseleave", reset);
        };
    }, [ref]);
}