"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const BLOCK_COLORS = [
    // "#ef4444", "#3b82f6", "#22c55e", // existing colors
    "#9c34f0", "#5857f9", "#fb5457"   // added colors
];

interface BlockData {
    index: string;
    title: string;
    tag: string;
    body: string;
    metric: string;
    metricLabel: string;
}

const BLOCKS: BlockData[] = [
    {
        index: "01",
        title: "Elite Engineering",
        tag: "Architecture & Systems",
        body: "We don't just write code — we architect systems. Every decision is made with scale, maintainability, and performance in mind. Our engineers have shipped products used by millions, and that experience shows in everything we touch.",
        metric: "10×",
        metricLabel: "faster delivery vs. traditional agencies",
    },
    {
        index: "02",
        title: "Production-First Approach",
        tag: "Built to Ship",
        body: "Prototypes are fine. But what we care about is production. We build for the edge cases, the traffic spikes, the unexpected — so when you scale, the foundation never cracks. No shortcuts, no tech debt handed off to your team.",
        metric: "99.9%",
        metricLabel: "uptime across client deployments",
    },
    {
        index: "03",
        title: "Long-Term Partnership",
        tag: "Beyond the Deliverable",
        body: "We measure success in years, not sprints. When we partner with a company, we become invested in its growth — attending to strategy, not just execution. Our best clients have been with us since day one.",
        metric: "4.8yr",
        metricLabel: "average client relationship length",
    },
];

/* ─── AnimatedBullet ─────────────────────────────────────────────────────── */
function AnimatedBullet({ color, dotIndex }: { color: string; dotIndex: number }) {
    const uid = "d" + color.replace("#", "");
    const [op, setOp] = useState(0);

    useEffect(() => {
        const onAttach = (e: Event) => {
            const ev = e as CustomEvent<{ target: string }>;
            if (ev.detail.target === `why-${dotIndex}`) setOp(1);
        };
        const onDetach = (e: Event) => {
            const ev = e as CustomEvent<{ target: string }>;
            if (ev.detail.target === `why-${dotIndex}`) setOp(0);
        };
        setOp(0);
        window.addEventListener("dot-attach", onAttach);
        window.addEventListener("dot-detach", onDetach);
        return () => {
            window.removeEventListener("dot-attach", onAttach);
            window.removeEventListener("dot-detach", onDetach);
        };
    }, [dotIndex]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 36 36">
            <style>{`
                @keyframes spin-ring-${uid} {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .ring-${uid} { transform-origin: 18px 18px; animation: spin-ring-${uid} 2.8s linear infinite; }
                .inner-${uid} { transition: opacity 0.35s ease; }
            `}</style>
            <circle className={`ring-${uid}`} cx="18" cy="18" r="18" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="3.5 4.5" opacity="0.6" />
            <circle className={`inner-${uid}`} cx="18" cy="18" r="14" fill={color} opacity={op} />
        </svg>
    );
}

/* ─── Why ────────────────────────────────────────────────────────────────── */
export default function Why() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
    const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Heading words
            const words = headingRef.current?.querySelectorAll<HTMLElement>(".word");
            if (words && words.length) {
                gsap.fromTo(words,
                    { y: 60, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.06,
                        scrollTrigger: { trigger: headingRef.current, start: "top 82%", toggleActions: "play none none reset" },
                    }
                );
            }

            // Subtext
            if (subtextRef.current) {
                gsap.fromTo(subtextRef.current,
                    { y: 24, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5,
                        scrollTrigger: { trigger: subtextRef.current, start: "top 85%", toggleActions: "play none none reset" },
                    }
                );
            }

            // Per-block: entrance + line + metric animations only
            // NOTE: dot attach/detach is owned entirely by StoryCanvas (H/I/J sections)
            blockRefs.current.forEach((block, i) => {
                if (!block) return;

                // Entrance animation — only y, no opacity (opacity on parent overrides circle's opacity attribute)
                gsap.fromTo(block,
                    { y: 50 },
                    {
                        y: 0, duration: 1, ease: "power3.out",
                        scrollTrigger: { trigger: block, start: "top 84%", toggleActions: "play none none reset" },
                    }
                );

                // Line reveal
                const line = lineRefs.current[i];
                if (line) {
                    gsap.fromTo(line,
                        { scaleX: 0, transformOrigin: "left center" },
                        {
                            scaleX: 1, duration: 1.1, ease: "power3.inOut",
                            scrollTrigger: { trigger: block, start: "top 84%", toggleActions: "play none none reset" },
                        }
                    );
                }

                // Metric reveal
                const metric = metricRefs.current[i];
                if (metric) {
                    gsap.fromTo(metric,
                        { y: 20, opacity: 0, scale: 0.88 },
                        {
                            y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)", delay: 0.25,
                            scrollTrigger: { trigger: block, start: "top 84%", toggleActions: "play none none reset" },
                        }
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingWords = "Built For Companies That Move Fast".split(" ");

    return (
        <section
            ref={sectionRef}
            id="why-section"
            style={{
                fontFamily: FONT,
                backgroundColor: "#ffffff",
                paddingTop: "140px",
                paddingBottom: "160px",
            }}
        >
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                    alignItems: "flex-end",
                    marginBottom: "100px",
                }}>
                    <div>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em",
                            textTransform: "uppercase", color: "rgba(0,0,0,0.38)",
                            marginBottom: "32px", fontFamily: FONT,
                        }}>
                            <span style={{ width: "24px", height: "1.5px", background: "currentColor", display: "block", flexShrink: 0 }} />
                            Why Us
                        </div>

                        <div ref={headingRef} style={{ perspective: "600px" }}>
                            <h2 style={{
                                fontSize: "clamp(38px, 4.8vw, 68px)",
                                fontWeight: 800,
                                lineHeight: 1.05,
                                letterSpacing: "-0.035em",
                                color: "#0a0a0a",
                                margin: 0,
                                fontFamily: FONT,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0 0.28em",
                                overflow: "hidden",
                            }}>
                                {headingWords.map((word, i) => (
                                    <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
                                        <span className="word" style={{ display: "inline-block" }}>{word}</span>
                                    </span>
                                ))}
                            </h2>
                        </div>
                    </div>

                    <div style={{ paddingBottom: "6px" }}>
                        <p
                            ref={subtextRef}
                            style={{
                                fontSize: "17px",
                                lineHeight: 1.75,
                                color: "#000",
                                maxWidth: "420px",
                                margin: 0,
                                fontFamily: FONT,
                                fontWeight: 400,
                            }}
                        >
                            We&apos;ve worked with growth-stage startups and global enterprises alike.
                            What they share: a need for a partner that operates at the highest level —
                            technically, strategically, and creatively.
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {BLOCKS.map((block, i) => {
                        const isActive = activeIdx === i;

                        const rowStyle: CSSProperties = {
                            display: "grid",
                            gridTemplateColumns: "80px 1fr 200px",
                            gap: "0 48px",
                            alignItems: "start",
                            padding: "56px 0",
                            cursor: "default",
                        };

                        return (
                            <div key={block.index}>
                                <div
                                    ref={(el) => { lineRefs.current[i] = el; }}
                                    style={{
                                        width: "100%",
                                        height: "1px",
                                        background: "rgba(0,0,0,0.12)",
                                        transformOrigin: "left center",
                                    }}
                                />

                                <div
                                    ref={(el) => { blockRefs.current[i] = el; }}
                                    style={rowStyle}
                                    onMouseEnter={() => setActiveIdx(i)}
                                    onMouseLeave={() => setActiveIdx(null)}
                                >
                                    {/* Bullet — ID used by StoryCanvas for dot positioning */}
                                    <div id={`why-bullet-${i}`} style={{ paddingTop: "2px" }}>
                                        <AnimatedBullet color={BLOCK_COLORS[i]} dotIndex={i} />
                                    </div>

                                    <div>
                                        <div style={{
                                            display: "inline-block",
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            letterSpacing: "0.14em",
                                            textTransform: "uppercase",
                                            color: isActive ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.35)",
                                            border: "1px solid currentColor",
                                            borderRadius: "100px",
                                            padding: "5px 14px",
                                            marginBottom: "20px",
                                            fontFamily: FONT,
                                            transition: "color 0.3s",
                                        }}>
                                            {block.tag}
                                        </div>

                                        <h3 style={{
                                            fontSize: "clamp(26px, 2.8vw, 38px)",
                                            fontWeight: 700,
                                            lineHeight: 1.1,
                                            letterSpacing: "-0.025em",
                                            color: "#0a0a0a",
                                            margin: "0 0 20px 0",
                                            fontFamily: FONT,
                                            transition: "transform 0.4s ease",
                                            transform: isActive ? "translateX(6px)" : "translateX(0)",
                                        }}>
                                            {block.title}
                                        </h3>

                                        <p style={{
                                            fontSize: "16px",
                                            lineHeight: 1.75,
                                            color: "#000",
                                            maxWidth: "560px",
                                            margin: 0,
                                            fontFamily: FONT,
                                            fontWeight: 400,
                                        }}>
                                            {block.body}
                                        </p>
                                    </div>

                                    <div
                                        ref={(el) => { metricRefs.current[i] = el; }}
                                        style={{ textAlign: "right", paddingTop: "4px" }}
                                    >
                                        <div style={{
                                            fontSize: "clamp(36px, 3.5vw, 52px)",
                                            fontWeight: 800,
                                            letterSpacing: "-0.04em",
                                            color: isActive ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                                            lineHeight: 1,
                                            marginBottom: "10px",
                                            fontFamily: FONT,
                                            transition: "color 0.4s ease",
                                        }}>
                                            {block.metric}
                                        </div>
                                        <div style={{
                                            fontSize: "12px",
                                            fontWeight: 500,
                                            lineHeight: 1.5,
                                            color: "rgba(0,0,0,0.38)",
                                            fontFamily: FONT,
                                            maxWidth: "160px",
                                            marginLeft: "auto",
                                        }}>
                                            {block.metricLabel}
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