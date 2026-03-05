"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const PARTNERS = [
    {
        name: "OpenAI",
        category: "AI Foundation",
        description: "Large language models & embeddings powering our AI core.",
        logo: (
            <svg viewBox="0 0 200 200" fill="currentColor" style={{ width: "100%", height: "100%" }}>
                <path d="M183.6 102.5c4.2-13 2.6-27.2-4.4-39C169.6 46 155 38.3 140 39.2c-8.8-11.5-22.3-18.3-36.7-18.3-26.3 0-47.7 21.3-47.8 47.6-13.4 2.7-25 10.8-32.2 22.5-13.2 22.8-6.4 52 15.2 66.6-4.2 13-2.6 27.2 4.4 39 9.6 16.6 27.8 26.2 46.5 24.9 8.8 11.5 22.3 18.3 36.7 18.3 26.3 0 47.7-21.3 47.8-47.6 13.4-2.7 25-10.8 32.2-22.5 13.1-22.8 6.3-52-15.3-66.6l.8-.6zm-73.6 102c-9.2 0-18-3.2-24.9-9 .3-.2.9-.5 1.3-.7l41.4-23.9c2.1-1.2 3.4-3.4 3.4-5.8V107l17.5 10.1c.2.1.3.3.3.5v48.4c0 20.2-16.4 36.5-39 36.5zm-84-33.6c-4.6-8-6.3-17.3-4.8-26.4.3.2.8.5 1.2.7l41.4 23.9c2.1 1.2 4.7 1.2 6.8 0l50.5-29.2v20.2c0 .2-.1.4-.3.6L79.9 184c-17.5 10.1-39.9 4.1-53.9-13.1zm-11-89.7c4.6-8 11.8-14 20.4-17.3v49.2c0 2.4 1.3 4.6 3.4 5.8l50.5 29.2-17.5 10.1c-.2.1-.4.1-.6.1L30 137.5C12.5 127.4 8.5 103.9 15 81.2zm144.5 31.4L108.9 83.4l17.5-10.1c.2-.1.4-.1.6-.1L171 97.6c17.5 10.1 21.5 33.5 14.9 56.2-4.6 8-11.8 14-20.4 17.3v-49.2c0-2.4-1.3-4.6-3.4-5.8l-.6.5zm17.4-26.7c-.3-.2-.8-.5-1.2-.7L134.3 62.3c-2.1-1.2-4.7-1.2-6.8 0L77 91.5V71.3c0-.2.1-.4.3-.6L118.2 47c17.5-10.1 39.9-4.1 53.9 13.1 4.6 8 6.3 17.3 4.8 26.4l-.1-.5zM83.5 117l-17.5-10.1c-.2-.1-.3-.3-.3-.5V57.9c0-20.2 16.6-36.6 39.1-36.5 9.2 0 18 3.2 24.9 9-.3.2-.9.5-1.3.7l-41.4 23.9c-2.1 1.2-3.4 3.4-3.4 5.8V117h-.1zm9.5-20.5l22.5-13 22.5 13v26l-22.5 13-22.5-13v-26z" />
            </svg>
        ),
    },
    {
        name: "AWS",
        category: "Cloud Infrastructure",
        description: "Global compute, storage, and serverless at any scale.",
        logo: (
            <svg viewBox="0 0 304 182" fill="currentColor" style={{ width: "100%", height: "100%" }}>
                <path d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3L83.2 92c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.5-3.1-5.8-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4zm-40.6 15.2c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.6-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2l-14.5-4.5c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z" />
                <path d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" />
                <path d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z" />
            </svg>
        ),
    },
    {
        name: "Google Cloud",
        category: "ML & Data",
        description: "Vertex AI, BigQuery, and distributed data pipelines.",
        logo: (
            <svg viewBox="0 0 128 20" fill="none" style={{ width: "100%", height: "100%" }}>
                <path d="M17.8 6.3H9.6v2h7.4c-.4 3.9-3.7 7-7.4 7-4.2 0-7.6-3.4-7.6-7.6s3.4-7.6 7.6-7.6c2 0 3.8.8 5.2 2l1.4-1.4C14.6.9 12.2 0 9.6 0 4.3 0 0 4.3 0 9.6s4.3 9.6 9.6 9.6c5.6 0 9.3-3.9 9.3-9.5 0-.5 0-1-.1-1.4z" fill="#4285F4" />
                <path d="M17.8 6.3H9.6v2h7.4c-.4 3.9-3.7 7-7.4 7" fill="#34A853" />
                <path d="M2 13.1C.7 11.7 0 9.8 0 7.7" fill="#FBBC05" />
                <path d="M9.6 19.2c2.6 0 4.8-.9 6.5-2.3l-1.5-1.5c-1.3 1-3.1 1.8-5 1.8" fill="#EA4335" />
                <text x="24" y="15" fontFamily="-apple-system, sans-serif" fontSize="13" fontWeight="500" fill="#5F6368">Google Cloud</text>
            </svg>
        ),
    },
    {
        name: "Microsoft Azure",
        category: "Enterprise Cloud",
        description: "Enterprise-grade security, compliance, and global reach.",
        logo: (
            <svg viewBox="0 0 200 50" fill="none" style={{ width: "100%", height: "100%" }}>
                <path d="M0 0h23.5L12.3 33.9 0 50V0z" fill="#0078D4" />
                <path d="M8.1 0h15.4L34.8 35.1 23.4 50H0L8.1 0z" fill="#0078D4" opacity="0.7" />
                <path d="M23.5 0h11.3L46 50H23.4l.1-16.1L35.6 13 23.5 0z" fill="#0078D4" opacity="0.5" />
                <text x="52" y="35" fontFamily="-apple-system, sans-serif" fontSize="18" fontWeight="600" fill="#0078D4">Azure</text>
            </svg>
        ),
    },
];

export default function Partners() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            if (labelRef.current) {
                const line = labelRef.current.querySelector<HTMLElement>(".label-line");
                const text = labelRef.current.querySelector<HTMLElement>(".label-text");
                if (line && text) {
                    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
                    gsap.set(text, { opacity: 0, x: -10 });
                    const tl = gsap.timeline({
                        scrollTrigger: { trigger: labelRef.current, start: "top 85%", toggleActions: "play none none reset" },
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
                    stagger: { each: 0.065, ease: "power2.inOut" },
                    scrollTrigger: { trigger: headingRef.current, start: "top 83%", toggleActions: "play none none reset" },
                });
            }

            if (subtextRef.current) {
                gsap.set(subtextRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
                gsap.to(subtextRef.current, {
                    clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut", delay: 0.35,
                    scrollTrigger: { trigger: subtextRef.current, start: "top 87%", toggleActions: "play none none reset" },
                });
            }

            if (dividerRef.current) {
                gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
                gsap.to(dividerRef.current, {
                    scaleX: 1, duration: 1.2, ease: "expo.inOut",
                    scrollTrigger: { trigger: dividerRef.current, start: "top 88%", toggleActions: "play none none reset" },
                });
            }

            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                gsap.set(card, { clipPath: "inset(100% 0% 0% 0%)", y: 24 });
                gsap.to(card, {
                    clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9, ease: "power4.out", delay: i * 0.09,
                    scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reset" },
                });
            });

            if (rowRef.current) {
                gsap.fromTo(rowRef.current,
                    { y: 24, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: rowRef.current, start: "top 90%", toggleActions: "play none none reset" },
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingWords = "Built on Industry-Leading Infrastructure".split(" ");

    return (
        <section
            ref={sectionRef}
            id="partners-section"
            style={{ fontFamily: FONT, paddingTop: "140px", paddingBottom: "160px" }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "flex-end", marginBottom: "80px" }}>
                    <div>
                        <div ref={labelRef} style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em",
                            textTransform: "uppercase", color: "rgba(0,0,0,0.38)",
                            marginBottom: "28px", fontFamily: FONT,
                        }}>
                            <span className="label-line" style={{ width: "24px", height: "1.5px", background: "currentColor", display: "block", flexShrink: 0 }} />
                            <span className="label-text">Technology Stack</span>
                        </div>

                        <div ref={headingRef} style={{ perspective: "800px" }}>
                            <h2 style={{
                                fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: 800,
                                lineHeight: 1.06, letterSpacing: "-0.035em", color: "#0a0a0a",
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
                            maxWidth: "400px", margin: 0, fontFamily: FONT, fontWeight: 400,
                        }}>
                            Every tool we use is chosen for reliability, scale, and speed.
                            We don&apos;t experiment on production — we ship on proven platforms.
                        </p>
                    </div>
                </div>

                {/* Divider — ID added for dot targeting */}
                <div
                    ref={dividerRef}
                    id="partners-divider"
                    style={{
                        width: "100%", height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, transparent)",
                        marginBottom: "64px",
                    }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
                    {PARTNERS.map((p, i) => {
                        const isHovered = hoveredIdx === i;
                        return (
                            <div
                                key={p.name}
                                ref={(el) => { cardRefs.current[i] = el; }}
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                style={{
                                    position: "relative",
                                    backgroundColor: isHovered ? "#f5f5f4" : "#fafaf9",
                                    border: `1px solid ${isHovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.07)"}`,
                                    padding: "44px 36px 48px",
                                    display: "flex", flexDirection: "column", gap: "28px",
                                    transition: "background-color 0.3s ease, border-color 0.3s ease",
                                    cursor: "default", overflow: "hidden",
                                }}
                            >
                                <div style={{
                                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                                    background: isHovered ? "linear-gradient(90deg, #ef4444, #3b82f6, #22c55e)" : "transparent",
                                    transition: "background 0.4s ease",
                                }} />

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{
                                        fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: isHovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.32)",
                                        fontFamily: FONT, transition: "color 0.3s",
                                    }}>{p.category}</span>
                                    <div style={{
                                        width: "28px", height: "28px", borderRadius: "50%",
                                        border: "1px solid rgba(0,0,0,0.14)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        opacity: isHovered ? 1 : 0,
                                        transform: isHovered ? "translate(0,0)" : "translate(-4px,4px)",
                                        transition: "opacity 0.3s, transform 0.3s",
                                    }}>
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                            <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5v6" stroke="rgba(0,0,0,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                <div style={{
                                    height: "40px", display: "flex", alignItems: "center",
                                    color: isHovered ? "#0a0a0a" : "rgba(0,0,0,0.6)",
                                    transition: "color 0.3s ease",
                                }}>
                                    <div style={{ height: "100%", maxWidth: "130px" }}>{p.logo}</div>
                                </div>

                                <p style={{
                                    fontSize: "14px", lineHeight: 1.65,
                                    color: isHovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.38)",
                                    margin: 0, fontFamily: FONT, transition: "color 0.3s ease",
                                }}>{p.description}</p>

                                <div style={{
                                    marginTop: "auto", fontSize: "13px", fontWeight: 600,
                                    letterSpacing: "-0.01em",
                                    color: isHovered ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.2)",
                                    fontFamily: FONT, transition: "color 0.3s",
                                }}>{p.name}</div>

                                <div style={{
                                    position: "absolute", top: "-40px", right: "-40px",
                                    width: "120px", height: "120px", borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                                    opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none",
                                }} />
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}