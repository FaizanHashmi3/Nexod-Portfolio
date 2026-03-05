"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

interface CardData {
    color: string;
    number: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
}

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const CARDS: CardData[] = [
    {
        color: "#5857f9",
        number: "01",
        title: "AI Platforms",
        subtitle: "Intelligent by Design",
        description:
            "End-to-end AI systems built for production — from model selection to deployment pipelines that scale without friction.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <rect x="8" y="16" width="32" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
                <path d="M16 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="18" cy="27" r="3" fill="currentColor" />
                <circle cx="30" cy="27" r="3" fill="currentColor" />
                <path d="M18 30c0 3 12 3 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 25H4M44 25h-4M24 38v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        color: "#9c34f0",
        number: "02",
        title: "Automation Infrastructure",
        subtitle: "Zero Friction Operations",
        description:
            "Robust workflows and integration layers that eliminate manual overhead — so your team operates at maximum leverage, always.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M24 6v8M24 34v8M6 24h8M34 24h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="24" cy="24" r="4" fill="currentColor" />
                <path d="M10.1 10.1l5.66 5.66M32.24 32.24l5.66 5.66M10.1 37.9l5.66-5.66M32.24 15.76l5.66-5.66"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        color: "#fb5457",
        number: "03",
        title: "Growth Systems",
        subtitle: "Compounding Results",
        description:
            "Data-driven growth engines that identify leverage points, automate acquisition, and turn insights into compounding revenue.",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <path d="M6 38l10-12 8 6 10-14 8-10" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="42" cy="8" r="4" fill="currentColor" />
                <path d="M6 42h36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M34 20l8-12-8 2-2-8" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const headingLines = headingRef.current?.querySelectorAll<HTMLElement>(".line-wrap");
            if (headingLines && headingLines.length > 0) {
                gsap.fromTo(
                    headingLines,
                    { y: 80, opacity: 0, rotateX: -15 },
                    {
                        y: 0, opacity: 1, rotateX: 0,
                        duration: 1.1, ease: "power4.out", stagger: 0.12,
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reset",
                        },
                    }
                );
            }

            if (taglineRef.current) {
                gsap.fromTo(
                    taglineRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.4,
                        scrollTrigger: {
                            trigger: taglineRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reset",
                        },
                    }
                );
            }

            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const fill = fillRefs.current[i];
                const content = contentRefs.current[i];
                if (!fill || !content) return;

                gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });

                const onAttach = (e: Event) => {
                    const ev = e as CustomEvent<{ target: string; idx: number; from?: string }>;
                    if (ev.detail.target !== "services-" + i) return;
                    const origin = ev.detail.from === "bottom" ? "bottom center" : "top center";
                    gsap.set(fill, { transformOrigin: origin, scaleY: 0 });
                    gsap.to(fill, { scaleY: 1, duration: 0.65, ease: "power2.inOut" });
                    gsap.to(content, { color: "#ffffff", duration: 0.35, delay: 0.25, ease: "power2.out" });
                };

                const onDetach = (e: Event) => {
                    const ev = e as CustomEvent<{ target: string; idx: number; from?: string }>;
                    if (ev.detail.target !== "services-" + i) return;
                    const origin = ev.detail.from === "bottom" ? "top center" : "bottom center";
                    gsap.set(fill, { transformOrigin: origin, scaleY: 1 });
                    gsap.to(fill, { scaleY: 0, duration: 0.65, ease: "power2.inOut" });
                    gsap.to(content, { color: "#000000", duration: 0.35, ease: "power2.out" });
                };

                window.addEventListener("dot-attach", onAttach);
                window.addEventListener("dot-detach", onDetach);

                (card as HTMLElement & { _dotCleanup?: () => void })._dotCleanup = () => {
                    window.removeEventListener("dot-attach", onAttach);
                    window.removeEventListener("dot-detach", onDetach);
                };
            });

        }, sectionRef);

        return () => {
            ctx.revert();
            cardsRef.current.forEach(card => {
                if (card) {
                    const c = card as HTMLElement & { _dotCleanup?: () => void };
                    c._dotCleanup?.();
                }
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services-section"
            style={{ fontFamily: FONT, paddingTop: "120px", paddingBottom: "140px", minHeight: "100vh" }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

                <div style={{ marginBottom: "80px" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em",
                        textTransform: "uppercase", color: "rgba(0,0,0,0.4)",
                        marginBottom: "28px", fontFamily: FONT,
                    }}>
                        <span style={{ display: "block", width: "24px", height: "1.5px", background: "currentColor", flexShrink: 0 }} />
                        Our Capabilities
                    </div>

                    <div ref={headingRef}>
                        {["Capabilities That Power Intelligent Companies."].map((line) => (
                            <span key={line} style={{ overflow: "hidden", display: "block" }}>
                                <span className="line-wrap" style={{
                                    display: "block", fontSize: "42px", fontWeight: 800,
                                    lineHeight: 1.4, letterSpacing: "-0.035em", color: "#000", fontFamily: FONT,
                                }}>
                                    {line}
                                </span>
                            </span>
                        ))}
                    </div>

                    <p ref={taglineRef} style={{
                        maxWidth: "480px", fontSize: "16px", lineHeight: 1.75,
                        color: "#000", fontWeight: 400, fontFamily: FONT, margin: "28px 0 0 0",
                    }}>
                        We build systems that don&apos;t just solve problems — they create
                        lasting competitive advantages for the companies we partner with.
                    </p>
                </div>

                <div style={{
                    width: "100%", height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.12) 70%, transparent)",
                    marginBottom: "72px",
                }} />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {CARDS.map((card, i) => {
                        const isHovered = hoveredIdx === i;
                        const cardStyle: CSSProperties = {
                            position: "relative", overflow: "hidden",
                            border: `1.5px solid ${isHovered ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.10)"}`,
                            background: "#ffffff", cursor: "default",
                            boxShadow: isHovered ? "0 32px 80px rgba(0,0,0,0.12)" : "none",
                            transition: "box-shadow 0.4s ease, border-color 0.3s ease",
                            minHeight: "110vh",
                        };

                        return (
                            <div
                                key={card.number}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                data-dot-card={i}
                                style={cardStyle}
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                            >
                                <div
                                    ref={(el) => { fillRefs.current[i] = el; }}
                                    style={{
                                        position: "absolute", inset: 0,
                                        transform: "scaleY(0)", transformOrigin: "top center",
                                        zIndex: 0, willChange: "transform",
                                        backgroundColor: card.color,
                                    }}
                                />

                                <div
                                    ref={(el) => { contentRefs.current[i] = el; }}
                                    style={{
                                        position: "relative", zIndex: 1, color: "#000000",
                                        padding: "52px 40px 56px", fontFamily: FONT,
                                        minHeight: "110vh", display: "flex",
                                        flexDirection: "column", justifyContent: "space-between",
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            display: "flex", justifyContent: "space-between",
                                            alignItems: "flex-start", marginBottom: "56px",
                                        }}>
                                            <div style={{
                                                width: "64px", height: "64px", borderRadius: "20px",
                                                border: "1.5px solid currentColor",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                opacity: isHovered ? 1 : 0.85, padding: "14px",
                                                transition: "opacity 0.3s", boxSizing: "border-box", flexShrink: 0,
                                            }}>
                                                {card.icon}
                                            </div>
                                            <span style={{
                                                fontFamily: FONT, fontSize: "13px", fontWeight: 700,
                                                letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4,
                                            }}>
                                                {card.number}
                                            </span>
                                        </div>

                                        <div style={{ marginBottom: "24px" }}>
                                            <p style={{
                                                fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em",
                                                textTransform: "uppercase", opacity: 0.5, margin: "0 0 10px 0", fontFamily: FONT,
                                            }}>
                                                {card.subtitle}
                                            </p>
                                            <h3 style={{
                                                fontFamily: FONT, fontSize: "clamp(24px, 2.2vw, 32px)",
                                                fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0,
                                            }}>
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div style={{ width: "100%", height: "1px", background: "currentColor", opacity: 0.12, marginBottom: "24px" }} />

                                        <p style={{ fontSize: "16px", lineHeight: 1.75, opacity: 0.7, margin: 0, fontFamily: FONT }}>
                                            {card.description}
                                        </p>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", opacity: 0.6, fontFamily: FONT }}>
                                            Explore service
                                        </span>
                                        <div style={{
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            border: "1.5px solid currentColor",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            opacity: isHovered ? 1 : 0.5,
                                            transform: isHovered ? "translate(3px, -3px)" : "translate(0, 0)",
                                            transition: "opacity 0.3s, transform 0.3s", flexShrink: 0,
                                        }}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}