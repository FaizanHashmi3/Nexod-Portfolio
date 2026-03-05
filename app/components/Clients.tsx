"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const CLIENTS = [
    {
        name: "OpenAI",
        category: "AI Research",
        logo: (
            <svg viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M183.6 102.5c4.2-13 2.6-27.2-4.4-39C169.6 46 155 38.3 140 39.2c-8.8-11.5-22.3-18.3-36.7-18.3-26.3 0-47.7 21.3-47.8 47.6-13.4 2.7-25 10.8-32.2 22.5-13.2 22.8-6.4 52 15.2 66.6-4.2 13-2.6 27.2 4.4 39 9.6 16.6 27.8 26.2 46.5 24.9 8.8 11.5 22.3 18.3 36.7 18.3 26.3 0 47.7-21.3 47.8-47.6 13.4-2.7 25-10.8 32.2-22.5 13.1-22.8 6.3-52-15.3-66.6l.8-.6zm-73.6 102c-9.2 0-18-3.2-24.9-9 .3-.2.9-.5 1.3-.7l41.4-23.9c2.1-1.2 3.4-3.4 3.4-5.8V107l17.5 10.1c.2.1.3.3.3.5v48.4c0 20.2-16.4 36.5-39 36.5zm-84-33.6c-4.6-8-6.3-17.3-4.8-26.4.3.2.8.5 1.2.7l41.4 23.9c2.1 1.2 4.7 1.2 6.8 0l50.5-29.2v20.2c0 .2-.1.4-.3.6L79.9 184c-17.5 10.1-39.9 4.1-53.9-13.1zm-11-89.7c4.6-8 11.8-14 20.4-17.3v49.2c0 2.4 1.3 4.6 3.4 5.8l50.5 29.2-17.5 10.1c-.2.1-.4.1-.6.1L30 137.5C12.5 127.4 8.5 103.9 15 81.2zm144.5 31.4L108.9 83.4l17.5-10.1c.2-.1.4-.1.6-.1L171 97.6c17.5 10.1 21.5 33.5 14.9 56.2-4.6 8-11.8 14-20.4 17.3v-49.2c0-2.4-1.3-4.6-3.4-5.8l-.6.5zm17.4-26.7c-.3-.2-.8-.5-1.2-.7L134.3 62.3c-2.1-1.2-4.7-1.2-6.8 0L77 91.5V71.3c0-.2.1-.4.3-.6L118.2 47c17.5-10.1 39.9-4.1 53.9 13.1 4.6 8 6.3 17.3 4.8 26.4l-.1-.5zM83.5 117l-17.5-10.1c-.2-.1-.3-.3-.3-.5V57.9c0-20.2 16.6-36.6 39.1-36.5 9.2 0 18 3.2 24.9 9-.3.2-.9.5-1.3.7l-41.4 23.9c-2.1 1.2-3.4 3.4-3.4 5.8V117h-.1zm9.5-20.5l22.5-13 22.5 13v26l-22.5 13-22.5-13v-26z" />
            </svg>
        ),
    },
    {
        name: "Stripe",
        category: "Payments",
        logo: (
            <svg viewBox="0 0 200 84" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M15 57.2c0 5.9 4.8 8.2 9.8 8.2 4.6 0 7.4-2.1 7.4-5.3 0-3.7-2.6-4.9-9-6.6-9.2-2.4-15.3-5.6-15.3-14.1C7.9 30.1 15.4 25 25.3 25c9.4 0 16.3 5.3 16.3 13.4H31.5c0-4.4-3.2-6.8-7.4-6.8-3.8 0-6.6 1.9-6.6 4.9 0 3.4 2.8 4.5 10.3 6.5 9.1 2.5 14.1 5.9 14.1 14.3 0 9.4-7.9 14-18.2 14C13.8 71.3 5 66 5 57.2H15zm42.3-30.9v7.4h8.7v7.7h-8.7v19.4c0 3.4 1.3 4.9 4.6 4.9 1.4 0 2.5-.1 3.9-.4v7.9c-2 .6-4.4.9-7 .9-7.4 0-12.3-3.9-12.3-12.5V41.4h-6.8v-7.7h6.8v-7.4h10.8zm14.4 7.4h10.4v6.6h.2c2-4.4 5.8-7.3 11.1-7.3 1.1 0 2.2.1 3.2.4v9.8c-1.3-.4-3-.7-4.6-.7-6.2 0-9.9 4-9.9 11.1v17h-10.4V33.7zm27.4 37h10.4V33.7H99.1v37zm5.2-42.8c-3.5 0-6.2-2.7-6.2-6.2s2.7-6.2 6.2-6.2c3.5 0 6.2 2.7 6.2 6.2s-2.7 6.2-6.2 6.2zm14.7 5.8h9.9v5.5h.2c2.5-4 6.6-6.3 12.1-6.3 9 0 15.1 6.3 15.1 18.5v19.3h-10.4V52.8c0-6.1-2.8-9.7-7.7-9.7-5.3 0-8.8 3.9-8.8 10.3v17.3h-10.4V33.7zm53.1 19.1c0-7.2 3.8-12.2 9.9-12.2 5.5 0 9.2 4.5 9.2 12.2 0 7.6-3.7 12.1-9.2 12.1-6.1 0-9.9-5-9.9-12.1zm-.2 11.8c2.2 4.1 6.6 7.1 13 7.1C190.8 71.7 200 63 200 52.7c0-10.4-8.9-19.7-20.4-19.7-5.8 0-10.2 2.5-12.6 6.5h-.2v-5.8h-9.9v52h10.4V64.6h.2z" />
            </svg>
        ),
    },
    {
        name: "Notion",
        category: "Productivity",
        logo: (
            <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M6.07 7.5c1.73 1.4 2.38 1.3 5.63 1.08l58.5-3.47c.65 0 .11-.65-.11-.76L61.84 0C60.33-.33 57.4.11 54.57.32L-1.74 4.68c-2.27.22-2.7 1.3-1.84 2.16L6.07 7.5zM9.1 18.72V79.2c0 3.46.86 4.75 5.61 4.43l64.4-3.68c4.75-.33 5.29-3.25 5.29-6.72V13.21c0-3.46-1.3-5.18-4.1-4.86L13.2 11.89c-3.02.32-4.1 1.73-4.1 6.83zm63.43 3.78c.43 1.95 0 3.89-1.95 4.1l-3.24.65v47.52c-2.81 1.52-5.4 2.38-7.56 2.38-3.46 0-4.32-1.08-6.9-4.32L34.6 43.06v30.28l6.48 1.41s0 3.89-5.4 3.89L21.9 79.2c-.43-1.95.65-2.7 2.16-3.03l5.62-1.62V31.15l-7.78-.54c-.43-1.95.65-4.75 3.67-4.97l14.69-1.07 20.04 30.82V26.18l-5.4-.65c-.43-2.38 1.29-4.1 3.46-4.32l14.47-.97z" />
            </svg>
        ),
    },
    {
        name: "Vercel",
        category: "Infrastructure",
        logo: (
            <svg viewBox="0 0 284 65" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64L37.59.25zm92.38 5l-27.71 48-27.7-48h10.39l17.31 30 17.3-30h10.41zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9V17.25h9v5.2c1.69-3.7 5.86-6.2 10.86-6.2.37 0 .74.01 1.11.04l1.23.96z" />
            </svg>
        ),
    },
    {
        name: "AWS",
        category: "Cloud",
        logo: (
            <svg viewBox="0 0 304 182" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3L83.2 92c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.5-3.1-5.8-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4zm-40.6 15.2c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.6-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2l-14.5-4.5c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z" />
                <path d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" />
                <path d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z" />
            </svg>
        ),
    },
    {
        name: "Google",
        category: "Technology",
        logo: (
            <svg viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
                <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
                <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.67-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.26zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
                <path d="M225 3v65h-9.5V3H225z" fill="#34A853" />
                <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
                <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65H35.29z" fill="#4285F4" />
            </svg>
        ),
    },
];

export default function Clients() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const countRef = useRef<HTMLDivElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            if (eyebrowRef.current) {
                const line = eyebrowRef.current.querySelector<HTMLElement>(".eyebrow-line");
                const text = eyebrowRef.current.querySelector<HTMLElement>(".eyebrow-text");
                if (line && text) {
                    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
                    gsap.set(text, { opacity: 0, x: -8 });
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: eyebrowRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reset",
                        },
                    });
                    tl.to(line, { scaleX: 1, duration: 0.5, ease: "power3.inOut" })
                        .to(text, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, "-=0.15");
                }
            }

            const words = headingRef.current?.querySelectorAll<HTMLElement>(".word");
            if (words && words.length) {
                gsap.set(words, { rotateX: 88, y: 32, opacity: 0, transformOrigin: "bottom center" });
                gsap.to(words, {
                    rotateX: 0, y: 0, opacity: 1, duration: 0.95, ease: "power4.out",
                    stagger: { each: 0.06, ease: "power2.inOut" },
                    scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none reset" },
                });
            }

            if (subtextRef.current) {
                gsap.set(subtextRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
                gsap.to(subtextRef.current, {
                    clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut", delay: 0.32,
                    scrollTrigger: { trigger: subtextRef.current, start: "top 87%", toggleActions: "play none none reset" },
                });
            }

            if (countRef.current) {
                gsap.fromTo(countRef.current,
                    { y: 18, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.55,
                        scrollTrigger: { trigger: countRef.current, start: "top 87%", toggleActions: "play none none reset" },
                    }
                );

                const statEls = countRef.current.querySelectorAll<HTMLElement>(".stat-value");
                statEls.forEach((el) => {
                    const raw = el.getAttribute("data-value") ?? "";
                    const num = parseFloat(raw.replace(/[^\d.]/g, ""));
                    const suffix = raw.replace(/[\d.]/g, "");
                    if (!isNaN(num)) {
                        const obj = { val: 0 };
                        gsap.fromTo(obj, { val: 0 }, {
                            val: num, duration: 1.6, ease: "power2.out", delay: 0.7,
                            onUpdate() { el.textContent = `${Math.round(obj.val)}${suffix}`; },
                            scrollTrigger: { trigger: countRef.current, start: "top 87%", toggleActions: "play none none reset" },
                        });
                    }
                });
            }

            if (dividerRef.current) {
                gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
                gsap.to(dividerRef.current, {
                    scaleX: 1, duration: 1.2, ease: "expo.inOut",
                    scrollTrigger: { trigger: dividerRef.current, start: "top 90%", toggleActions: "play none none reset" },
                });
            }

            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.set(card, { clipPath: "inset(100% 0% 0% 0%)", y: 24 });
                gsap.to(card, {
                    clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9, ease: "power4.out", delay: i * 0.07,
                    scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reset" },
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingWords = "Trusted by Teams Building the Future".split(" ");

    return (
        <section
            ref={sectionRef}
            id="clients-section"
            style={{ fontFamily: FONT }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px",
                    alignItems: "flex-end", marginBottom: "80px",
                }}>
                    <div>
                        <div ref={eyebrowRef} style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em",
                            textTransform: "uppercase", color: "rgba(0,0,0,0.38)",
                            marginBottom: "28px", fontFamily: FONT,
                        }}>
                            <span className="eyebrow-line" style={{ width: "24px", height: "1.5px", background: "currentColor", display: "block", flexShrink: 0 }} />
                            <span className="eyebrow-text">Our Clients</span>
                        </div>

                        <div ref={headingRef} style={{ perspective: "800px" }}>
                            <h2 style={{
                                fontSize: "clamp(36px, 4.6vw, 64px)", fontWeight: 800,
                                lineHeight: 1.05, letterSpacing: "-0.035em", color: "#0a0a0a",
                                margin: 0, fontFamily: FONT, display: "flex", flexWrap: "wrap", gap: "0 0.26em",
                            }}>
                                {headingWords.map((word, i) => (
                                    <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
                                        <span className="word" style={{ display: "inline-block" }}>{word}</span>
                                    </span>
                                ))}
                            </h2>
                        </div>
                    </div>

                    <div style={{ paddingBottom: "4px" }}>
                        <p ref={subtextRef} style={{
                            fontSize: "17px", lineHeight: 1.75, color: "#000",
                            maxWidth: "400px", margin: "0 0 28px 0", fontFamily: FONT, fontWeight: 400,
                        }}>
                            From early-stage startups to publicly traded companies — we partner with teams
                            that have something worth building.
                        </p>

                        <div ref={countRef} style={{ display: "flex", gap: "40px" }}>
                            {[["120+", "Projects shipped"], ["98%", "Retention rate"], ["12", "Countries"]].map(([val, label]) => (
                                <div key={label}>
                                    <div className="stat-value" data-value={val} style={{
                                        fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em",
                                        color: "#0a0a0a", lineHeight: 1, marginBottom: "4px", fontFamily: FONT,
                                    }}>{val}</div>
                                    <div style={{
                                        fontSize: "12px", color: "rgba(0,0,0,0.4)", fontFamily: FONT,
                                        fontWeight: 500, letterSpacing: "0.02em",
                                    }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider — ID added for dot targeting */}
                <div
                    ref={dividerRef}
                    id="clients-divider"
                    style={{
                        width: "100%", height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, transparent)",
                        marginBottom: "64px",
                    }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                    {CLIENTS.map((client, i) => {
                        const isHovered = hoveredIdx === i;
                        return (
                            <div
                                key={client.name}
                                ref={(el) => { cardRefs.current[i] = el; }}
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                style={{
                                    position: "relative",
                                    backgroundColor: isHovered ? "#0a0a0a" : "#ffffff",
                                    border: "1.5px solid rgba(0,0,0,0.08)",
                                    padding: "52px 48px",
                                    display: "flex", flexDirection: "column", gap: "32px",
                                    transition: "background-color 0.35s ease, border-color 0.35s ease",
                                    cursor: "default", overflow: "hidden",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{
                                        fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: isHovered ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.32)",
                                        fontFamily: FONT, transition: "color 0.35s ease",
                                    }}>
                                        {client.category}
                                    </span>
                                    <div style={{
                                        width: "32px", height: "32px", borderRadius: "50%",
                                        border: `1px solid ${isHovered ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)"}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        opacity: isHovered ? 1 : 0,
                                        transform: isHovered ? "translate(0,0)" : "translate(-4px, 4px)",
                                        transition: "opacity 0.3s ease, transform 0.3s ease, border-color 0.35s ease",
                                        flexShrink: 0,
                                    }}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke={isHovered ? "#fff" : "#000"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                <div style={{
                                    height: "44px", display: "flex", alignItems: "center",
                                    color: isHovered ? "#ffffff" : "#0a0a0a",
                                    transition: "color 0.35s ease", opacity: isHovered ? 0.9 : 0.75,
                                }}>
                                    <div style={{ height: "100%", maxWidth: "140px" }}>{client.logo}</div>
                                </div>

                                <div style={{
                                    fontSize: "14px", fontWeight: 600, letterSpacing: "-0.01em",
                                    color: isHovered ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.3)",
                                    fontFamily: FONT, transition: "color 0.35s ease",
                                }}>
                                    {client.name}
                                </div>

                                <div style={{
                                    position: "absolute", bottom: 0, right: 0, width: "80px", height: "80px",
                                    borderTop: `1px solid ${isHovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                                    borderLeft: `1px solid ${isHovered ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                                    borderTopLeftRadius: "16px", transition: "border-color 0.35s ease", pointerEvents: "none",
                                }} />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}