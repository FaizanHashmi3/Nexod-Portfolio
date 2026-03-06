"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

const NAV_LINKS = [
    { label: "Work", href: "#" },
    { label: "Services", href: "/services" },
    { label: "Clients", href: "/#clients-section" },
    { label: "About", href: "#" },
    { label: "Knowledge", href: "#" },
];

const PARTNERSHIP_MODELS = [
    {
        color: "#5857f9",
        label: "Project Based",
        desc: "Defined scope, timeline, and deliverables. Ideal for discrete AI initiatives.",
        points: ["Fixed scope and timeline", "Clear deliverables & milestones", "Ideal for specific AI projects", "Post-launch support included"],
    },
    {
        color: "#9c34f0",
        label: "Retainer",
        desc: "Ongoing partnership with dedicated bandwidth for continuous development.",
        points: ["Ongoing AI development", "Continuous optimisation", "Dedicated team allocation", "Monthly strategy reviews"],
    },
    {
        color: "#fb5457",
        label: "Equity Partnership",
        desc: "We co-invest our expertise in high-conviction AI-first ventures.",
        points: ["Shared risk and reward", "Long-term commitment", "Ideal for AI-first ventures", "Strategic advisory included"],
    },
];

/* ── Header ───────────────────────────────────────────────────────────────── */
function PageHeader() {
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", width: "85%", zIndex: 99999, display: "flex", justifyContent: "center" }}>
            <div style={{
                width: "100%", maxWidth: 1280, borderRadius: 9999,
                backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(0,0,0,0.10)",
                background: scrolled ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.65)",
                boxShadow: scrolled ? "0 15px 50px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.4s ease",
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px" }}>
                    <div onClick={() => router.push("/")} style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", cursor: "pointer", fontFamily: FONT }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>N</div>
                        Nexod
                    </div>
                    <nav style={{ display: "flex", alignItems: "center", gap: 40 }}>
                        {NAV_LINKS.map(({ label, href }) => (
                            <a key={label} href={href} style={{
                                fontSize: 14, fontWeight: 500, color: "#0a0a0a", textDecoration: "none", fontFamily: FONT,
                                opacity: href === "/services" ? 1 : 0.45,
                                borderBottom: href === "/services" ? "1.5px solid #0a0a0a" : "1.5px solid transparent",
                                paddingBottom: 2, transition: "opacity 0.2s",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = href === "/services" ? "1" : "0.45"; }}
                            >{label}</a>
                        ))}
                    </nav>
                    <button
                        onClick={() => router.push("/contact")}
                        style={{ padding: "12px 32px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 9999, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT, transition: "transform 0.25s, opacity 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    >Contact</button>
                </div>
            </div>
        </div>
    );
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
function PageFooter() {
    return (
        <footer style={{ background: "#0a0a0a", color: "#fff", fontFamily: FONT, padding: "80px 48px 48px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 64, marginBottom: 72 }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 700, fontSize: 18, marginBottom: 20, letterSpacing: "-0.02em" }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>N</div>
                            Nexod
                        </div>
                        <p style={{ color: "rgba(255,255,255,0.38)", lineHeight: 1.75, fontSize: 14, margin: "0 0 28px", maxWidth: 220 }}>
                            AI-native product and growth studio building intelligent platforms for companies shaping the future.
                        </p>
                    </div>
                    {[
                        { title: "Services", items: ["AI Platforms", "Automation Systems", "Growth Infrastructure", "Product Engineering"] },
                        { title: "Company", items: ["About", "Careers", "Case Studies", "Contact"] },
                        { title: "Contact", items: ["hello@nexod.ai", "nexod.ai", "San Francisco / Remote"] },
                    ].map(col => (
                        <div key={col.title}>
                            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 20px" }}>{col.title}</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {col.items.map(item => (
                                    <span key={item} style={{ fontSize: 14, color: "rgba(255,255,255,0.48)", cursor: "pointer", transition: "color 0.2s" }}
                                        onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                                    >{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} Nexod. All rights reserved.</span>
                    <div style={{ display: "flex", gap: 28 }}>
                        {["Privacy", "Terms", "Cookies"].map(item => (
                            <span key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", cursor: "pointer", transition: "color 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
                            >{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ── Form Field ───────────────────────────────────────────────────────────── */
function Field({ label, placeholder, type = "text", value, onChange }: {
    label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.38)", display: "block", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                style={{ width: "100%", boxSizing: "border-box" as const, background: focused ? "#fff" : "#f7f7f5", border: `1.5px solid ${focused ? "#0a0a0a" : "transparent"}`, borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#0a0a0a", fontFamily: FONT, outline: "none", transition: "all 0.2s ease" }}
            />
        </div>
    );
}

function SelectField({ label, options, value, onChange }: {
    label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.38)", display: "block", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{label}</label>
            <select value={value} onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                style={{ width: "100%", boxSizing: "border-box" as const, background: focused ? "#fff" : "#f7f7f5", border: `1.5px solid ${focused ? "#0a0a0a" : "transparent"}`, borderRadius: 10, padding: "13px 16px", fontSize: 14, color: value ? "#0a0a0a" : "rgba(0,0,0,0.32)", fontFamily: FONT, outline: "none", cursor: "pointer", appearance: "none" as const, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' stroke='rgba(0,0,0,0.35)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "16px", transition: "all 0.2s ease" }}
            >
                <option value="">Select…</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const modelsRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const [form, setForm] = useState({ name: "", email: "", company: "", role: "", partnershipType: "", budget: "", description: "" });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Hero
        if (heroRef.current) {
            gsap.fromTo(heroRef.current.querySelectorAll<HTMLElement>(".h-reveal"),
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1, delay: 0.15 }
            );
        }

        // Models
        if (modelsRef.current) {
            gsap.fromTo(modelsRef.current.querySelectorAll<HTMLElement>(".model-card"),
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: modelsRef.current, start: "top 80%", toggleActions: "play none none reset" }
                }
            );
        }

        // Form
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: formRef.current, start: "top 82%", toggleActions: "play none none reset" }
                }
            );
        }

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <main style={{ fontFamily: FONT, background: "#fff", color: "#0a0a0a", minHeight: "100vh", overflowX: "hidden" }}>
            <PageHeader />

            {/* ════════════════════════════════════════════════════════
                HERO
            ════════════════════════════════════════════════════════ */}
            <div ref={heroRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "160px 56px 100px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "flex-end" }}>
                    <div>
                        <div className="h-reveal" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.32)", marginBottom: 32 }}>
                            <span style={{ width: 24, height: 1.5, background: "currentColor", display: "block" }} />
                            Partnership
                        </div>
                        <h1 className="h-reveal" style={{ fontSize: "clamp(52px, 6vw, 82px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#0a0a0a", margin: "0 0 0" }}>
                            Let&apos;s Build<br />
                            Something<br />
                            <span style={{
                                backgroundImage: "linear-gradient(135deg, #5857f9 0%, #9c34f0 50%, #fb5457 100%)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                                Extraordinary.
                            </span>
                        </h1>
                    </div>
                    <div style={{ paddingBottom: 8 }}>
                        <p className="h-reveal" style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(0,0,0,0.5)", margin: "0 0 40px", fontWeight: 400, maxWidth: 440 }}>
                            Whether you&apos;re looking for AI development, marketing solutions, or a strategic
                            partnership — we&apos;re ready to help you transform your vision into reality.
                        </p>
                        <div className="h-reveal" style={{ display: "flex", gap: 12 }}>
                            <a href="#form-section" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "#0a0a0a", color: "#fff", borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "opacity 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                            >
                                Apply Now
                                <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                           
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════
                PARTNERSHIP MODELS — light theme
            ════════════════════════════════════════════════════════ */}
            <div ref={modelsRef} style={{ background: "#fff", padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 56px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72 }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.28)", marginBottom: 16 }}>
                                Engagement Models
                            </div>
                            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a", margin: 0, lineHeight: 1.05 }}>
                                How We Work<br />Together
                            </h2>
                        </div>
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(0,0,0,0.42)", maxWidth: 320, margin: 0, fontWeight: 400 }}>
                            Choose the engagement model that best fits your goals, timeline, and growth ambitions.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                        {PARTNERSHIP_MODELS.map((m, i) => (
                            <div
                                key={i}
                                className="model-card"
                                style={{
                                    border: "1.5px solid rgba(0,0,0,0.08)",
                                    borderRadius: 20,
                                    padding: "44px 36px 40px",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "border-color 0.3s, box-shadow 0.3s",
                                    cursor: "default",
                                    background: "#fff",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = `${m.color}50`; e.currentTarget.style.boxShadow = `0 20px 60px ${m.color}10`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                {/* Top accent line */}
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.color, borderRadius: "20px 20px 0 0" }} />

                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: m.color, marginBottom: 20 }}>
                                    0{i + 1}
                                </div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", margin: "0 0 10px" }}>
                                    {m.label}
                                </h3>
                                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(0,0,0,0.42)", margin: "0 0 32px" }}>
                                    {m.desc}
                                </p>

                                <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: 28 }} />

                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    {m.points.map((pt, pi) => (
                                        <div key={pi} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <svg viewBox="0 0 10 10" width={10} height={10} fill="none">
                                                    <path d="M2 5l2.5 2.5L8 2.5" stroke={m.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <span style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", lineHeight: 1.5 }}>{pt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════
                FORM
            ════════════════════════════════════════════════════════ */}
            <div id="form-section" style={{ background: "#fafaf8", padding: "120px 56px" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "start" }}>

                    {/* Left: copy */}
                    <div style={{ position: "sticky", top: 120 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", marginBottom: 20 }}>
                            Get Started
                        </div>
                        <h2 style={{ fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a", margin: "0 0 20px", lineHeight: 1.05 }}>
                            Submit Your<br />Venture Idea
                        </h2>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(0,0,0,0.45)", margin: "0 0 48px", maxWidth: 340 }}>
                            Tell us about your project and we&apos;ll create a tailored plan. We review every submission personally.
                        </p>

                        {/* Stats */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {[
                                { num: "48h", label: "Average response time" },
                                { num: "100%", label: "Custom proposals" },
                                { num: "4.8yr", label: "Avg. client relationship" },
                            ].map((s, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a", minWidth: 72 }}>{s.num}</div>
                                    <div style={{ fontSize: 14, color: "rgba(0,0,0,0.42)" }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: form */}
                    <div ref={formRef} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 24, padding: "52px 48px" }}>
                        {submitted ? (
                            <div style={{ textAlign: "center", padding: "48px 0" }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                                    <svg viewBox="0 0 24 24" width={26} height={26} fill="none">
                                        <path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.025em", color: "#0a0a0a", margin: "0 0 12px" }}>Application Received</h3>
                                <p style={{ fontSize: 15, color: "rgba(0,0,0,0.42)", margin: 0, lineHeight: 1.7 }}>
                                    We&apos;ll review your venture idea and get back within 48 hours with a tailored plan.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#0a0a0a", margin: "0 0 32px" }}>
                                    Partnership Application
                                </h3>

                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                        <Field label="Full Name" placeholder="John Doe" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                                        <Field label="Email" placeholder="john@company.com" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                        <Field label="Company" placeholder="Your company" value={form.company} onChange={v => setForm(f => ({ ...f, company: v }))} />
                                        <Field label="Role (Optional)" placeholder="CEO, CTO…" value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} />
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                        <SelectField label="Partnership Type" options={["Project Based", "Retainer", "Equity Partnership"]} value={form.partnershipType} onChange={v => setForm(f => ({ ...f, partnershipType: v }))} />
                                        <SelectField label="Budget Range" options={["< $10k", "$10k – $50k", "$50k – $200k", "$200k+"]} value={form.budget} onChange={v => setForm(f => ({ ...f, budget: v }))} />
                                    </div>

                                    <div>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.38)", display: "block", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Project Description</label>
                                        <textarea
                                            value={form.description}
                                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                            placeholder="Describe your project, goals, timeline, and any specific requirements…"
                                            rows={5}
                                            style={{ width: "100%", boxSizing: "border-box", background: "#f7f7f5", border: "1.5px solid transparent", borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#0a0a0a", fontFamily: FONT, resize: "none", outline: "none", lineHeight: 1.7, transition: "all 0.2s" }}
                                            onFocus={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
                                            onBlur={e => { e.currentTarget.style.background = "#f7f7f5"; e.currentTarget.style.borderColor = "transparent"; }}
                                        />
                                    </div>

                                    <button
                                        onClick={() => setSubmitted(true)}
                                        style={{ width: "100%", padding: "17px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "opacity 0.2s, transform 0.2s", marginTop: 4 }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                                    >
                                        Submit Partnership Application
                                        <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    <p style={{ textAlign: "center", fontSize: 12, color: "rgba(0,0,0,0.3)", margin: "4px 0 0", letterSpacing: "0.01em" }}>
                                        No commitment required · We respond within 48 hours
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <PageFooter />
        </main>
    );
}