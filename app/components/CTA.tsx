"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const ctaCleanupRef = useRef<(() => void) | null>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const lineLeftRef = useRef<HTMLDivElement>(null);
    const lineRightRef = useRef<HTMLDivElement>(null);
    const [btnHovered, setBtnHovered] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const fill = fillRef.current;
            const content = contentRef.current;

            if (fill && content) {
                gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
                gsap.set(content, { color: "#0a0a0a" });

                const onAttach = (e: Event) => {
                    const ev = e as CustomEvent<{ target: string }>;
                    if (ev.detail.target !== "cta") return;
                    gsap.set(fill, { transformOrigin: "top center", scaleY: 0 });
                    gsap.to(fill, { scaleY: 1, duration: 0.75, ease: "power2.inOut" });
                    gsap.to(content, { color: "#ffffff", duration: 0.4, delay: 0.3, ease: "power2.out" });
                };
                const onDetach = (e: Event) => {
                    const ev = e as CustomEvent<{ target: string }>;
                    if (ev.detail.target !== "cta") return;
                    gsap.set(fill, { transformOrigin: "top center", scaleY: 1 });
                    gsap.to(fill, { scaleY: 0, duration: 0.65, ease: "power2.inOut" });
                    gsap.to(content, { color: "#0a0a0a", duration: 0.3, ease: "power2.out" });
                };
                window.addEventListener("dot-attach", onAttach);
                window.addEventListener("dot-detach", onDetach);

                ctaCleanupRef.current = () => {
                    window.removeEventListener("dot-attach", onAttach);
                    window.removeEventListener("dot-detach", onDetach);
                };
            }

            [lineLeftRef.current, lineRightRef.current].forEach((el) => {
                if (!el) return;
                gsap.fromTo(el,
                    { scaleX: 0 },
                    {
                        scaleX: 1, duration: 1.2, ease: "power3.inOut",
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" }
                    }
                );
            });

            if (labelRef.current) {
                gsap.fromTo(labelRef.current,
                    { y: 16, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2,
                        scrollTrigger: { trigger: labelRef.current, start: "top 85%", toggleActions: "play none none none" }
                    }
                );
            }

            const words = headingRef.current?.querySelectorAll<HTMLElement>(".word");
            if (words && words.length) {
                gsap.fromTo(words,
                    { y: 70, opacity: 0, rotateX: -12 },
                    {
                        y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power4.out", stagger: 0.08, delay: 0.1,
                        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" }
                    }
                );
            }

            if (subtextRef.current) {
                gsap.fromTo(subtextRef.current,
                    { y: 24, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.45,
                        scrollTrigger: { trigger: subtextRef.current, start: "top 88%", toggleActions: "play none none none" }
                    }
                );
            }

            if (btnRef.current) {
                gsap.fromTo(btnRef.current,
                    { y: 28, opacity: 0, scale: 0.92 },
                    {
                        y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.6)", delay: 0.6,
                        scrollTrigger: { trigger: btnRef.current, start: "top 90%", toggleActions: "play none none none" }
                    }
                );
            }

        }, sectionRef);

        return () => {
            ctx.revert();
            ctaCleanupRef.current?.();
        };
    }, []);

    const headingWords = "Let's Build Something Extraordinary".split(" ");

    return (
        <section
            ref={sectionRef}
            id="cta-section"
            style={{
                fontFamily: FONT, backgroundColor: "#ffffff",
                paddingTop: "160px", paddingBottom: "160px",
                position: "relative", overflow: "hidden",
            }}
        >
            <div
                ref={fillRef}
                style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, #5857f9 0%, #9c34f0 52%, #fb5457 100%)",
                    transform: "scaleY(0)", transformOrigin: "top center",
                    zIndex: 0, willChange: "transform",
                }}
            />

            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                opacity: 0.04, pointerEvents: "none", zIndex: 1,
            }} />

            <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 70%)",
                pointerEvents: "none", zIndex: 1,
            }} />

            <div
                ref={contentRef}
                style={{
                    maxWidth: "900px", margin: "0 auto", padding: "0 40px",
                    position: "relative", zIndex: 2, textAlign: "center", color: "#0a0a0a",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "48px" }}>
                    <div ref={lineLeftRef} style={{ flex: 1, maxWidth: "120px", height: "1px", background: "currentColor", opacity: 0.35, transformOrigin: "right center" }} />
                    <div ref={labelRef} style={{
                        fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em",
                        textTransform: "uppercase", color: "inherit", fontFamily: FONT, whiteSpace: "nowrap", opacity: 0.7,
                    }}>Ready to start</div>
                    <div ref={lineRightRef} style={{ flex: 1, maxWidth: "120px", height: "1px", background: "currentColor", opacity: 0.35, transformOrigin: "left center" }} />
                </div>

                <div ref={headingRef} style={{ perspective: "800px", marginBottom: "32px" }}>
                    <h2 style={{
                        fontSize: "clamp(44px, 6.5vw, 88px)", fontWeight: 800,
                        lineHeight: 1.0, letterSpacing: "-0.04em", color: "inherit",
                        margin: 0, fontFamily: FONT, display: "flex", flexWrap: "wrap",
                        justifyContent: "center", gap: "0 0.24em",
                    }}>
                        {headingWords.map((word, i) => (
                            <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
                                <span className="word" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>
                </div>

                <p ref={subtextRef} style={{
                    fontSize: "18px", lineHeight: 1.7, color: "inherit", opacity: 0.72,
                    maxWidth: "520px", margin: "0 auto 56px", fontFamily: FONT, fontWeight: 400,
                }}>
                    Tell us about your idea. We&apos;ll architect the system,
                    ship the product, and scale it with you.
                </p>

                <button
                    ref={btnRef}
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "12px",
                        backgroundColor: "#ffffff", color: "#0a0a0a", border: "none",
                        borderRadius: "100px", padding: "20px 44px", fontSize: "15px",
                        fontWeight: 700, fontFamily: FONT, cursor: "pointer", letterSpacing: "-0.01em",
                        boxShadow: btnHovered
                            ? "0 24px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15)"
                            : "0 8px 32px rgba(0,0,0,0.2)",
                        transform: btnHovered ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                >
                    Start Your Project
                    <div style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        backgroundColor: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center",
                        transform: btnHovered ? "translate(3px, -3px)" : "translate(0,0)",
                        transition: "transform 0.3s ease", flexShrink: 0,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 12L12 2M12 2H5M12 2v7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </button>

                <p style={{
                    marginTop: "32px", fontSize: "13px", color: "inherit",
                    opacity: 0.45, fontFamily: FONT, letterSpacing: "0.01em",
                }}>
                    No commitment required · Response within 24 hours
                </p>
            </div>
        </section>
    );
}