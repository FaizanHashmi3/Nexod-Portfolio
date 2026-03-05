"use client";

import { useEffect, useRef } from "react";
import gsap from "../../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        id: 1,
        color: "#5857f9",
        title: "Discover",
        points: [
            "Business Model Analysis",
            "Bottleneck Identification",
            "AI Leverage Mapping",
            "Competitive Gap Review",
        ],
    },
    {
        id: 2,
        color: "#9c34f0",
        title: "Design",
        points: [
            "Scalable System Blueprints",
            "Seamless UX Architecture",
            "Growth-Aligned Strategy",
            "Integration Spec Definition",
        ],
    },
    {
        id: 3,
        color: "#fb5457",
        title: "Build",
        points: [
            "Production-Ready Platforms",
            "Real-World Testing",
            "Scalable Deployment",
            "Continuous Optimisation",
        ],
    },
];

const SCROLL_PER_STEP = 1.1;

export default function Process() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const sticky = stickyRef.current;
        if (!wrapper || !sticky) return;

        const ctx = gsap.context(() => {

            // ── Header reveal ──────────────────────────────────────────────
            const labelLine = document.querySelector<HTMLElement>(".proc-label-line");
            const labelText = document.querySelector<HTMLElement>(".proc-label-text");
            const headingWords = document.querySelectorAll<HTMLElement>(".proc-h-word");
            const subtext = document.querySelector<HTMLElement>(".proc-subtext");

            if (labelLine && labelText) {
                gsap.set(labelLine, { scaleX: 0, transformOrigin: "left center" });
                gsap.set(labelText, { opacity: 0, x: -10 });
                gsap.timeline({
                    scrollTrigger: { trigger: labelLine, start: "top 88%", toggleActions: "play none none reset" },
                })
                    .to(labelLine, { scaleX: 1, duration: 0.5, ease: "power3.inOut" })
                    .to(labelText, { opacity: 1, x: 0, duration: 0.45 }, "-=0.15");
            }

            if (headingWords.length) {
                gsap.set(headingWords, { rotateX: 88, y: 32, opacity: 0, transformOrigin: "bottom center" });
                gsap.to(headingWords, {
                    rotateX: 0, y: 0, opacity: 1, duration: 0.95, ease: "power4.out", stagger: 0.065,
                    scrollTrigger: { trigger: headingWords[0], start: "top 85%", toggleActions: "play none none reset" },
                });
            }

            if (subtext) {
                gsap.set(subtext, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
                gsap.to(subtext, {
                    clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power3.inOut",
                    scrollTrigger: { trigger: subtext, start: "top 88%", toggleActions: "play none none reset" },
                });
            }

            // ── Gather step DOM nodes ──────────────────────────────────────
            const titleEls = STEPS.map((s) => sticky.querySelector<HTMLElement>(`#ptitle-${s.id}`));
            const descEls = STEPS.map((s) => sticky.querySelector<HTMLElement>(`#pdesc-${s.id}`));
            const visualEls = STEPS.map((s) => sticky.querySelector<HTMLElement>(`#pvisual-${s.id}`));

            // ── Initial states ─────────────────────────────────────────────
            titleEls.forEach((el) => el && gsap.set(el, { y: 0, opacity: 1 }));
            descEls.forEach((el) => el && gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" }));
            visualEls.forEach((el) => el && gsap.set(el, { opacity: 0, y: 24 }));

            // ── PIN ────────────────────────────────────────────────────────
            const totalScroll = window.innerHeight + window.innerHeight * SCROLL_PER_STEP * STEPS.length;

            ScrollTrigger.create({
                trigger: wrapper,
                start: "top top",
                end: `+=${totalScroll}`,
                pin: sticky,
                pinSpacing: true,
                anticipatePin: 1,
            });

            // ── VISUAL ONLY helpers — zero dot dispatch ────────────────────
            // StoryCanvas is the single source of truth for dot-attach/detach.

            function showTitlesOnly() {
                titleEls.forEach((el) => el && gsap.to(el, {
                    y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: true,
                }));
                descEls.forEach((el) => el && gsap.to(el, {
                    height: 0, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: true,
                }));
                visualEls.forEach((el) => el && gsap.to(el, {
                    opacity: 0, y: 24, duration: 0.3, ease: "power2.in", overwrite: true,
                }));
            }

            function showStep(i: number) {
                visualEls.forEach((el, vi) => {
                    if (!el) return;
                    if (vi === i)
                        gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", overwrite: true });
                    else
                        gsap.to(el, { opacity: 0, y: vi < i ? -24 : 24, duration: 0.35, ease: "power2.in", overwrite: true });
                });

                descEls.forEach((el, di) => {
                    if (!el) return;
                    if (di === i)
                        gsap.to(el, { height: "auto", opacity: 1, duration: 0.55, ease: "power3.out", overwrite: true });
                    else
                        gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power2.in", overwrite: true });
                });

                titleEls.forEach((el, ti) => {
                    if (!el) return;
                    if (ti < i)
                        gsap.to(el, { y: -60, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: true });
                    else
                        gsap.to(el, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", overwrite: true });
                });
            }

            // ── ScrollTriggers ─────────────────────────────────────────────
            const stepOffset = window.innerHeight;

            ScrollTrigger.create({
                trigger: wrapper,
                start: "top top",
                end: `+=${stepOffset - 10}`,
                onEnter: () => showTitlesOnly(),
                onEnterBack: () => showTitlesOnly(),
            });

            STEPS.forEach((_, i) => {
                ScrollTrigger.create({
                    trigger: wrapper,
                    start: `top+=${stepOffset + window.innerHeight * SCROLL_PER_STEP * i} top`,
                    end: `top+=${stepOffset + window.innerHeight * SCROLL_PER_STEP * (i + 1)} top`,
                    onEnter: () => showStep(i),
                    onEnterBack: () => showStep(i),
                });
            });

        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        <section id="process" style={{ background: "#fff" }}>

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "160px 48px 80px" }}>
                <div style={{ maxWidth: 680 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        fontSize: 11, fontWeight: 600, letterSpacing: "0.22em",
                        textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 32,
                    }}>
                        <span className="proc-label-line" style={{ display: "block", width: 24, height: 1, background: "currentColor", flexShrink: 0 }} />
                        <span className="proc-label-text">Process</span>
                    </div>

                    <h2 style={{
                        fontSize: "clamp(52px,6vw,80px)", fontWeight: 700,
                        letterSpacing: "-0.04em", lineHeight: 1.02, color: "#0a0a0a",
                        margin: 0, perspective: "800px",
                    }}>
                        {["From Vision", "To Deployment"].map((line, li) => (
                            <span key={li} style={{ display: "block" }}>
                                {line.split(" ").map((word, wi) => (
                                    <span key={wi} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.26em" }}>
                                        <span className="proc-h-word" style={{ display: "inline-block" }}>{word}</span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>

                    <p className="proc-subtext" style={{
                        fontSize: 17, lineHeight: 1.8, color: "#000",
                        maxWidth: 480, margin: "32px 0 0 0", fontWeight: 400,
                    }}>
                        A structured execution framework designed to transform complex ideas
                        into scalable intelligent systems.
                    </p>
                </div>
            </div>

            <div ref={wrapperRef}>
                <div
                    ref={stickyRef}
                    style={{
                        width: "100%", height: "100vh",
                        display: "grid", gridTemplateColumns: "1fr 1fr",
                        gap: 80, alignItems: "center",
                        maxWidth: 1280, margin: "0 auto",
                        padding: "0 48px", boxSizing: "border-box",
                    }}
                >
                    <div style={{ position: "relative" }}>
                        {STEPS.map((step, i) => (
                            <div key={step.id}>
                                <div
                                    id={`ptitle-${step.id}`}
                                    style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 4 }}
                                >
                                    <AnimatedBullet color={step.color} dotIndex={i} />
                                    <h3 style={{
                                        fontSize: "clamp(44px,4.2vw,60px)", fontWeight: 900,
                                        letterSpacing: "-0.03em", lineHeight: 1,
                                        color: "#0a0a0a", margin: 0,
                                    }}>
                                        {step.title}
                                    </h3>
                                </div>

                                <div id={`pdesc-${step.id}`} style={{ overflow: "hidden", height: 0, opacity: 0 }}>
                                    <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "22px 0 22px 68px" }} />
                                    <ul style={{
                                        listStyle: "none", margin: 0, padding: "0 0 28px 68px",
                                        display: "flex", flexDirection: "column", gap: 14,
                                    }}>
                                        {step.points.map((point, pi) => (
                                            <li key={pi} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                <span style={{ flexShrink: 0, width: 5, height: 5, borderRadius: "50%", background: step.color }} />
                                                <span style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(0,0,0,0.62)", fontWeight: 400 }}>
                                                    {point}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ position: "relative", width: 460, height: 460 }}>
                            {STEPS.map((step) => (
                                <div
                                    key={step.id}
                                    id={`pvisual-${step.id}`}
                                    style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }}
                                >
                                    {step.id === 1 && <ResearchMappingSVG />}
                                    {step.id === 2 && <SystemArchitectureSVG />}
                                    {step.id === 3 && <DeploymentInfrastructureSVG />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── AnimatedBullet ────────────────────────────────────────────────────────────
function AnimatedBullet({ color, dotIndex }: { color: string; dotIndex: number }) {
    const uid = color.replace("#", "");
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fill = (on: boolean) => {
            wrapRef.current?.classList.toggle("bullet-filled", on);
        };
        const onAttach = (e: Event) => {
            const ev = e as CustomEvent<{ target: string }>;
            if (ev.detail.target === `process-${dotIndex}`) fill(true);
        };
        const onDetach = (e: Event) => {
            const ev = e as CustomEvent<{ target: string }>;
            if (ev.detail.target === `process-${dotIndex}`) fill(false);
        };
        fill(false);
        window.addEventListener("dot-attach", onAttach);
        window.addEventListener("dot-detach", onDetach);
        return () => {
            window.removeEventListener("dot-attach", onAttach);
            window.removeEventListener("dot-detach", onDetach);
        };
    }, [dotIndex]);

    return (
        <div ref={wrapRef} style={{ flexShrink: 0 }}>
            <style>{`
                @keyframes spin-ring-${uid} { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                .ring-${uid} { transform-origin:18px 18px; animation:spin-ring-${uid} 2.8s linear infinite; }
                .inner-${uid} {
                    transform-origin: 18px 18px;
                    transform: scale(0);
                    opacity: 0;
                    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
                }
                .bullet-filled .inner-${uid} { transform: scale(1); opacity: 1; }
            `}</style>
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 36 36">
                <circle className={`ring-${uid}`} cx="18" cy="18" r="18" fill="none" stroke="#000" strokeWidth="1.5" strokeDasharray="3.5 4.5" opacity="0.6" />
                <circle className={`inner-${uid}`} cx="18" cy="18" r="14" fill={color} />
            </svg>
        </div>
    );
}

function ResearchMappingSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="320" height="320">
            <style>{`
        @keyframes pulse-node-r{0%,100%{r:6;opacity:1}50%{r:9;opacity:.7}}
        @keyframes pulse-ctr-r{0%,100%{r:14;opacity:1}50%{r:18;opacity:.75}}
        @keyframes draw-edge-r{from{stroke-dashoffset:120}to{stroke-dashoffset:0}}
        @keyframes orbit-r{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fid-r{0%{opacity:0;transform:scale(0)}60%{opacity:1;transform:scale(1.2)}100%{opacity:1;transform:scale(1)}}
        .re{stroke:#011736;stroke-width:1;fill:none;stroke-dasharray:120;animation:draw-edge-r 1.2s ease forwards}
        .re2{animation-delay:.2s;stroke-dashoffset:120}.re3{animation-delay:.4s;stroke-dashoffset:120}
        .re4{animation-delay:.6s;stroke-dashoffset:120}.re5{animation-delay:.8s;stroke-dashoffset:120}
        .rn{fill:#fff;stroke:#011736;stroke-width:1;animation:pulse-node-r 2.4s ease-in-out infinite}
        .rn2{animation-delay:.4s}.rn3{animation-delay:.8s}.rn4{animation-delay:1.2s}.rn5{animation-delay:1.6s}
        .rc{fill:#7202BB;animation:pulse-ctr-r 2s ease-in-out infinite}
        .rl{fill:#011736;font-size:7px;font-family:sans-serif;opacity:0;animation:fid-r .5s ease forwards}
        .rl2{animation-delay:.6s}.rl3{animation-delay:1s}.rl4{animation-delay:1.4s}
        .ro{fill:none;stroke:#011736;stroke-width:.5;stroke-dasharray:3 4;opacity:.25;transform-origin:110px 110px;animation:orbit-r 18s linear infinite}
        .ro2{animation-direction:reverse;animation-duration:28s}
      `}</style>
            <circle className="ro" cx="110" cy="110" r="72" /><circle className="ro ro2" cx="110" cy="110" r="50" />
            <line className="re" x1="110" y1="110" x2="60" y2="60" /><line className="re re2" x1="110" y1="110" x2="165" y2="72" />
            <line className="re re3" x1="110" y1="110" x2="170" y2="148" /><line className="re re4" x1="110" y1="110" x2="68" y2="155" />
            <line className="re re5" x1="110" y1="110" x2="48" y2="120" />
            <line className="re re3" x1="60" y1="60" x2="165" y2="72" strokeOpacity=".3" />
            <line className="re re4" x1="165" y1="72" x2="170" y2="148" strokeOpacity=".3" />
            <circle className="rn" cx="60" cy="60" r="6" /><circle className="rn rn2" cx="165" cy="72" r="6" />
            <circle className="rn rn3" cx="170" cy="148" r="6" /><circle className="rn rn4" cx="68" cy="155" r="6" /><circle className="rn rn5" cx="48" cy="120" r="5" />
            <circle cx="165" cy="72" r="2.5" fill="#7202BB" opacity="0" style={{ animation: "fid-r .5s .9s ease forwards" }} />
            <circle cx="170" cy="148" r="2.5" fill="#7202BB" opacity="0" style={{ animation: "fid-r .5s 1.5s ease forwards" }} />
            <circle className="rc" cx="110" cy="110" r="14" />
            <circle cx="110" cy="110" r="14" fill="none" stroke="#011736" strokeWidth="1" />
            <line x1="104" y1="110" x2="116" y2="110" stroke="#fff" strokeWidth="1.5" />
            <line x1="110" y1="104" x2="110" y2="116" stroke="#fff" strokeWidth="1.5" />
            <text className="rl" x="50" y="56" textAnchor="middle">USER</text>
            <text className="rl rl2" x="174" y="68" textAnchor="start">DATA</text>
            <text className="rl rl3" x="174" y="153" textAnchor="start">FLOW</text>
            <text className="rl rl4" x="58" y="168" textAnchor="middle">GAP</text>
        </svg>
    );
}

function SystemArchitectureSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="320" height="320">
            <style>{`
        @keyframes dbox-a{from{stroke-dashoffset:200;opacity:0}to{stroke-dashoffset:0;opacity:1}}
        @keyframes farr-a{0%{stroke-dashoffset:40;opacity:0}30%{opacity:1}100%{stroke-dashoffset:0;opacity:1}}
        @keyframes bdot-a{0%,80%,100%{opacity:1}40%{opacity:.2}}
        .ab{fill:#fff;stroke:#011736;stroke-width:1;stroke-dasharray:200;animation:dbox-a .8s ease forwards;opacity:0}
        .ab2{animation-delay:.3s}.ab3{animation-delay:.6s}.ab4{animation-delay:.9s}
        .ac{fill:#7202BB;stroke:none;opacity:0;animation:dbox-a .5s ease forwards}
        .ac2{animation-delay:.5s}.ac3{animation-delay:.8s}.ac4{animation-delay:1.1s}
        .aa{fill:none;stroke:#011736;stroke-width:1;stroke-dasharray:40;animation:farr-a .6s ease forwards;opacity:0}
        .aa2{animation-delay:.5s}.aa3{animation-delay:.8s}.aa4{animation-delay:1.1s}
        .al{fill:#011736;font-size:6.5px;font-family:monospace;opacity:0;animation:dbox-a .4s ease forwards}
        .al2{animation-delay:.4s}.al3{animation-delay:.7s}.al4{animation-delay:1s}
        .ad{fill:#7202BB;animation:bdot-a 1.8s ease-in-out infinite}
        .ad2{animation-delay:.6s}.ad3{animation-delay:1.2s}
        .ag{stroke:#011736;stroke-width:.3;opacity:.08}
      `}</style>
            {[40, 60, 80, 100, 120, 140, 160, 180].map(x => <line key={`v${x}`} className="ag" x1={x} y1="20" x2={x} y2="200" />)}
            {[40, 60, 80, 100, 120, 140, 160, 180].map(y => <line key={`h${y}`} className="ag" x1="20" y1={y} x2="200" y2={y} />)}
            <rect className="ab" x="28" y="38" width="60" height="32" rx="3" /><rect className="ac" x="28" y="38" width="4" height="32" rx="1" />
            <text className="al" x="40" y="52">INPUT</text>
            <rect className="ab ab2" x="132" y="38" width="60" height="32" rx="3" /><rect className="ac ac2" x="132" y="38" width="4" height="32" rx="1" />
            <text className="al al2" x="144" y="52">PROCESS</text>
            <path className="aa" d="M88,54 L132,54" markerEnd="url(#arra)" />
            <rect className="ab ab3" x="80" y="100" width="60" height="32" rx="3" /><rect className="ac ac3" x="80" y="100" width="60" height="4" rx="1" />
            <text className="al al3" x="92" y="116">ORCHESTRATE</text>
            <path className="aa aa2" d="M162,70 L162,86 Q162,96 152,100" markerEnd="url(#arra)" />
            <path className="aa aa3" d="M58,70 L58,86 Q58,96 80,113" markerEnd="url(#arra)" />
            <rect className="ab ab4" x="80" y="158" width="60" height="30" rx="3" /><rect className="ac ac4" x="80" y="158" width="60" height="4" rx="1" />
            <text className="al al4" x="93" y="173">OUTPUT</text>
            <path className="aa aa4" d="M110,132 L110,158" markerEnd="url(#arra)" />
            <circle className="ad" cx="183" cy="42" r="3" /><circle className="ad ad2" cx="183" cy="54" r="3" /><circle className="ad ad3" cx="183" cy="66" r="3" />
            <defs><marker id="arra" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 Z" fill="#011736" /></marker></defs>
        </svg>
    );
}

function DeploymentInfrastructureSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="320" height="320">
            <style>{`
        @keyframes rbar-d{from{transform:scaleY(0)}to{transform:scaleY(1)}}
        @keyframes ssrv-d{from{transform:translateX(-30px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes ping-d{0%,100%{r:3;opacity:1}50%{r:5;opacity:.5}}
        @keyframes dln-d{0%{stroke-dashoffset:80}100%{stroke-dashoffset:0}}
        @keyframes cup-d{from{opacity:0}to{opacity:1}}
        .db{fill:#011736;transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);animation:rbar-d .7s cubic-bezier(.34,1.56,.64,1) forwards}
        .db2{animation-delay:.15s}.db3{animation-delay:.3s;fill:#7202BB}.db4{animation-delay:.45s}.db5{animation-delay:.6s;fill:#7202BB}.db6{animation-delay:.75s}
        .ds{fill:#fff;stroke:#011736;stroke-width:1;opacity:0;animation:ssrv-d .5s ease forwards}
        .ds2{animation-delay:.4s}.ds3{animation-delay:.7s}
        .dl{fill:#7202BB;animation:ping-d 1.6s ease-in-out infinite}
        .dl2{animation-delay:.5s}.dl3{animation-delay:1.1s;opacity:.5}
        .dp{fill:none;stroke:#7202BB;stroke-width:1.5;stroke-dasharray:80;stroke-dashoffset:80;animation:dln-d 1s ease 1.2s forwards}
        .dlb{fill:#011736;font-size:6px;font-family:monospace;opacity:0;animation:cup-d .3s ease forwards}
        .dlb2{animation-delay:.8s}.dlb3{animation-delay:1.3s}
        .dax{stroke:#011736;stroke-width:.8;opacity:.4}
      `}</style>
            <rect className="ds" x="22" y="68" width="50" height="14" rx="2" /><rect className="ds ds2" x="22" y="86" width="50" height="14" rx="2" /><rect className="ds ds3" x="22" y="104" width="50" height="14" rx="2" />
            <circle className="dl" cx="30" cy="75" r="3" /><circle className="dl dl2" cx="30" cy="93" r="3" /><circle className="dl dl3" cx="30" cy="111" r="3" />
            {[75, 93, 111].map((y, i) => <rect key={i} x="36" y={y - 2} width={24 - i * 4} height="4" rx="1" fill="#011736" opacity="0.15" />)}
            <text className="dlb" x="22" y="63">SRV-01</text><text className="dlb dlb2" x="22" y="130">SRV-02</text>
            <path className="dp" d="M72,91 Q100,91 108,130" />
            <line className="dax" x1="108" y1="128" x2="200" y2="128" /><line className="dax" x1="108" y1="60" x2="108" y2="128" />
            <rect className="db" x="114" y="98" width="10" height="30" /><rect className="db db2" x="128" y="88" width="10" height="40" />
            <rect className="db db3" x="142" y="78" width="10" height="50" /><rect className="db db4" x="156" y="92" width="10" height="36" />
            <rect className="db db5" x="170" y="68" width="10" height="60" /><rect className="db db6" x="184" y="82" width="10" height="46" />
            <polyline points="119,98 133,88 147,78 161,92 175,68 189,72" fill="none" stroke="#7202BB" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100" style={{ animation: "dln-d 1s ease 1.5s forwards" }} />
            <text className="dlb dlb3" x="108" y="140">DEPLOY CYCLES</text>
            <text x="170" y="62" fill="#7202BB" fontSize="7" fontFamily="monospace" opacity="0" style={{ animation: "cup-d .3s 2s ease forwards" }}>▲ 98%</text>
            <circle cx="189" cy="72" r="4" fill="#7202BB" opacity="0" style={{ animation: "ping-d 2s 2.2s ease-in-out infinite" }} />
        </svg>
    );
}