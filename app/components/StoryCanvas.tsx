"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOT_COLORS = ["#5857f9", "#9c34f0", "#fb5457"];
const DOT_LARGE = 48;
const DOT_SMALL = 14;

export default function StoryCanvas() {
    const dotsRef = useRef<HTMLDivElement[]>([]);
    const sphereRafRef = useRef<number>(0);
    const rotRef = useRef(0);
    const explodeRef = useRef(0);
    const targetExplode = useRef(0);
    const particlesRef = useRef<
        { ox: number; oy: number; oz: number; vx: number; vy: number; vz: number }[]
    >([]);

    // ── dots overlay ──────────────────────────────────────────────────────────
    useEffect(() => {
        const ov = document.createElement("div");
        ov.id = "sc-overlay";
        ov.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:visible;";
        document.body.appendChild(ov);

        DOT_COLORS.forEach((color, i) => {
            const d = document.createElement("div");
            d.style.cssText = `
                position:fixed;width:${DOT_LARGE}px;height:${DOT_LARGE}px;
                border-radius:50%;background:${color};
                box-shadow:0 0 0 3px rgba(255,255,255,0.85),0 6px 28px ${color}aa;
                opacity:0;left:0;top:0;
                transform:translate(-50%,-50%) scale(0);
                will-change:left,top,transform,opacity,width,height;
                pointer-events:none;
            `;
            ov.appendChild(d);
            dotsRef.current[i] = d;
        });
        return () => { ov.remove(); };
    }, []);

    // ── particle sphere ───────────────────────────────────────────────────────
    useEffect(() => {
        let cleanup: (() => void) | undefined;
        const init = () => {
            const hero = document.getElementById("hero");
            if (!hero) { setTimeout(init, 300); return; }
            const canvas = document.createElement("canvas");
            canvas.id = "sc-sphere-canvas";
            canvas.style.cssText =
                "position:absolute;top:0;right:0;width:50%;height:100%;pointer-events:none;z-index:1;";
            hero.style.position = "relative";
            hero.appendChild(canvas);
            const ctx = canvas.getContext("2d")!;
            const COUNT = 300, R = 115;
            particlesRef.current = Array.from({ length: COUNT }, (_, i) => {
                const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
                const theta = Math.PI * (1 + Math.sqrt(5)) * i;
                return {
                    ox: R * Math.sin(phi) * Math.cos(theta),
                    oy: R * Math.sin(phi) * Math.sin(theta),
                    oz: R * Math.cos(phi),
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 6,
                    vz: (Math.random() - 0.5) * 4,
                };
            });
            const resize = () => {
                const r = canvas.getBoundingClientRect(), dpr = devicePixelRatio || 1;
                canvas.width = r.width * dpr;
                canvas.height = r.height * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            };
            resize();
            window.addEventListener("resize", resize);
            const COLS = ["#5857f9", "#9c34f0", "#fb5457"];
            const draw = () => {
                const W = canvas.width / (devicePixelRatio || 1);
                const H = canvas.height / (devicePixelRatio || 1);
                ctx.clearRect(0, 0, W, H);
                rotRef.current += 0.005;
                explodeRef.current += (targetExplode.current - explodeRef.current) * 0.06;
                const cos = Math.cos(rotRef.current), sin = Math.sin(rotRef.current), ep = explodeRef.current;
                particlesRef.current.forEach((p, i) => {
                    const rx = p.ox * cos - p.oz * sin, rz = p.ox * sin + p.oz * cos, ry = p.oy;
                    const fx = rx + p.vx * ep * 50, fy = ry + p.vy * ep * 50, fz = rz + p.vz * ep * 25;
                    const pv = 400 / (400 + fz);
                    const alpha = Math.max(0, (1 - ep * 0.92) * pv * 0.88);
                    ctx.beginPath();
                    ctx.arc(W / 2 + fx * pv, H / 2 + fy * pv, Math.max(0.4, pv * 2.5), 0, Math.PI * 2);
                    ctx.fillStyle = COLS[Math.floor(i / (COUNT / 3)) % 3] + Math.round(alpha * 255).toString(16).padStart(2, "0");
                    ctx.fill();
                });
                sphereRafRef.current = requestAnimationFrame(draw);
            };
            draw();
            cleanup = () => {
                cancelAnimationFrame(sphereRafRef.current);
                window.removeEventListener("resize", resize);
                canvas.remove();
            };
        };
        const t = setTimeout(init, 400);
        return () => { clearTimeout(t); cleanup?.(); };
    }, []);

    // ── scroll animation ──────────────────────────────────────────────────────
    useEffect(() => {
        const t = setTimeout(build, 900);
        return () => clearTimeout(t);

        function eio(v: number) { return v < 0.5 ? 2 * v * v : -1 + (4 - 2 * v) * v; }
        function cl(v: number) { return Math.max(0, Math.min(1, v)); }

        function build() {
            const dots = dotsRef.current;
            if (!dots[0]) return;

            const paint = (dot: HTMLDivElement, x: number, y: number, op: number, sc: number) => {
                dot.style.left = x + "px";
                dot.style.top = y + "px";
                dot.style.opacity = String(cl(op));
                dot.style.transform = `translate(-50%,-50%) scale(${cl(sc)})`;
            };
            const resize = (dot: HTMLDivElement, sz: number) => {
                dot.style.width = sz + "px";
                dot.style.height = sz + "px";
            };

            // ── emit: fires dot-attach/detach, deduped per key ────────────
            const st: Record<string, boolean> = {};
            const emit = (key: string, val: boolean, target: string, idx: number, extra?: Record<string, unknown>) => {
                if (st[key] === val) return;
                st[key] = val;
                window.dispatchEvent(new CustomEvent(val ? "dot-attach" : "dot-detach", {
                    detail: { target, idx, ...extra }
                }));
            };
            // forceEmit ignores dedup — used on boundary resets so AnimatedBullet
            // state never gets out of sync after a full scroll cycle
            const forceEmit = (key: string, val: boolean, target: string, idx: number, extra?: Record<string, unknown>) => {
                delete st[key];
                emit(key, val, target, idx, extra);
            };

            const GAP = 22;
            const cardSel = ["[data-dot-card='0']", "[data-dot-card='1']", "[data-dot-card='2']"] as const;
            const bulletSel = ["#ptitle-1 svg", "#ptitle-2 svg", "#ptitle-3 svg"] as const;
            const whySel = ["#why-bullet-0", "#why-bullet-1", "#why-bullet-2"] as const;

            // Live position helpers — always called inside onUpdate
            const pos = (sel: string) => {
                const el = document.querySelector<HTMLElement>(sel);
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            };
            const sphere = () => {
                const c = document.getElementById("sc-sphere-canvas");
                if (!c) return { x: innerWidth * 0.75, y: innerHeight / 2 };
                const r = c.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            };
            const bulletPos = (i: number) => pos(bulletSel[i]);
            const whyPos = (i: number) => {
                const wrap = document.querySelector<HTMLElement>(whySel[i]);
                if (!wrap) return null;
                const svg = wrap.querySelector<SVGElement>("svg") ?? wrap;
                const r = svg.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            };
            const cardTop = (i: number) => {
                const el = document.querySelector<HTMLElement>(cardSel[i]);
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + 40 };
            };
            const cardBottom = (i: number) => {
                const el = document.querySelector<HTMLElement>(cardSel[i]);
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.bottom - 40 };
            };
            const clientsPos = (i: number) => {
                const p = pos("#clients-divider");
                if (!p) return null;
                return { x: p.x + [-GAP, 0, GAP][i], y: p.y };
            };
            const partnersPos = (i: number) => {
                const p = pos("#partners-divider");
                if (!p) return null;
                return { x: p.x + [-GAP, 0, GAP][i], y: p.y };
            };
            const ctaPos = () => {
                const el = document.getElementById("cta-section");
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height * 0.35 };
            };

            dots.forEach((dot, di) => {

                // ════════════════════════════════════════════════════════════
                // A: HERO
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 2.2,
                    onUpdate(self) {
                        const p = self.progress;
                        const sc = sphere();
                        resize(dot, DOT_LARGE);
                        paint(dot, sc.x, sc.y, cl(p * 3), cl(p * 2));
                        targetExplode.current = cl(p * 2);
                    },
                    onLeave: () => { targetExplode.current = 1; },
                    onEnterBack: () => { targetExplode.current = 0; },
                });

                // ════════════════════════════════════════════════════════════
                // B/C/D: PROCESS — one trigger, three bands
                //
                // B 0.00–0.25 : dot travels sphere → bullet   (dot visible)
                // C 0.25–0.88 : dot HIDDEN, circle ON          ← attach
                // D 0.88–1.00 : dot fades back in, circle OFF  ← detach
                //
                // Using #process (scrolls normally) not the pinned inner SVGs.
                // All 3 dots share same trigger → attach/detach fires together.
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: "#process",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2.5,
                    onUpdate(self) {
                        const p = self.progress;
                        const bp = bulletPos(di);
                        if (p < 0.25) {
                            const t = p / 0.25;
                            const fr = sphere();
                            if (fr && bp) { resize(dot, DOT_LARGE); paint(dot, fr.x + (bp.x - fr.x) * eio(t), fr.y + (bp.y - fr.y) * eio(t), cl(t * 2), cl(t)); }
                            forceEmit("proc" + di, false, "process-" + di, di);
                        } else if (p < 0.88) {
                            if (bp) { resize(dot, DOT_LARGE); paint(dot, bp.x, bp.y, 0, 0); }
                            emit("proc" + di, true, "process-" + di, di);
                        } else {
                            const t = (p - 0.88) / 0.12;
                            if (bp) { resize(dot, DOT_LARGE); paint(dot, bp.x, bp.y, cl(t), cl(t)); }
                            forceEmit("proc" + di, false, "process-" + di, di);
                        }
                    },
                    onLeaveBack: () => forceEmit("proc" + di, false, "process-" + di, di),
                    onLeave: () => forceEmit("proc" + di, false, "process-" + di, di),
                });

                // ════════════════════════════════════════════════════════════
                // E: SERVICES — dot arrives at card top
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: cardSel[di],
                    start: "top bottom",
                    end: "top center",
                    scrub: 2.2,
                    onUpdate(self) {
                        const p = self.progress;
                        const fr = bulletPos(di);
                        const to = cardTop(di);
                        if (!fr || !to) return;
                        resize(dot, DOT_LARGE);
                        paint(dot, fr.x + (to.x - fr.x) * eio(p), fr.y + (to.y - fr.y) * eio(p), cl(p * 3), cl(0.3 + p * 0.7));
                    },
                });

                // ════════════════════════════════════════════════════════════
                // F: SERVICES invisible zone + card fill/drain events
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: cardSel[di],
                    start: "top center",
                    end: "bottom center",
                    scrub: 2.2,
                    onEnter: () => emit("svc" + di, true, "services-" + di, di, { from: "top" }),
                    onLeave: () => emit("svc" + di, false, "services-" + di, di, { from: "bottom" }),
                    onEnterBack: () => emit("svc" + di, true, "services-" + di, di, { from: "bottom" }),
                    onLeaveBack: () => emit("svc" + di, false, "services-" + di, di, { from: "top" }),
                    onUpdate(self) {
                        const to = self.progress < 0.5 ? cardTop(di) : cardBottom(di);
                        if (!to) return;
                        resize(dot, DOT_LARGE);
                        paint(dot, to.x, to.y, 0, 0);
                    },
                });

                // ════════════════════════════════════════════════════════════
                // G: SERVICES → WHY travel
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: cardSel[di],
                    start: "bottom center",
                    end: "bottom top",
                    scrub: 2.2,
                    onUpdate(self) {
                        const p = self.progress;
                        const fr = cardBottom(di);
                        const to = pos(whySel[di]);
                        if (!fr || !to) return;
                        resize(dot, DOT_LARGE);
                        paint(dot, fr.x + (to.x - fr.x) * eio(p), fr.y + (to.y - fr.y) * eio(p), cl(p * 3), cl(0.3 + p * 0.7));
                    },
                });

                // ════════════════════════════════════════════════════════════
                // H: WHY travel — dot moves from cardBottom to bullet
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: "#why-section",
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 2.5,
                    onUpdate(self) {
                        const p = self.progress;
                        const wp = whyPos(di);
                        const fr = cardBottom(di);
                        if (fr && wp) {
                            resize(dot, DOT_LARGE);
                            paint(dot, fr.x + (wp.x - fr.x) * eio(p), fr.y + (wp.y - fr.y) * eio(p), cl(p * 2), cl(p));
                        }
                    },
                });

                // ════════════════════════════════════════════════════════════
                // I: WHY attach — directly set inner circle scale via DOM
                // Zero events, zero React state — immune to all batching issues
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: "#why-section",
                    start: "top 20%",
                    end: "bottom top",
                    onEnter: () => {
                        window.dispatchEvent(new CustomEvent("dot-attach", { detail: { target: `why-${di}`, idx: di } }));
                        const wp = whyPos(di);
                        if (wp) { resize(dot, DOT_LARGE); paint(dot, wp.x, wp.y, 0, 0); }
                    },
                    onLeave: () => {
                        window.dispatchEvent(new CustomEvent("dot-detach", { detail: { target: `why-${di}`, idx: di } }));
                    },
                    onEnterBack: () => {
                        window.dispatchEvent(new CustomEvent("dot-attach", { detail: { target: `why-${di}`, idx: di } }));
                        const wp = whyPos(di);
                        if (wp) { resize(dot, DOT_LARGE); paint(dot, wp.x, wp.y, 0, 0); }
                    },
                    onLeaveBack: () => {
                        window.dispatchEvent(new CustomEvent("dot-detach", { detail: { target: `why-${di}`, idx: di } }));
                    },
                });

                // ════════════════════════════════════════════════════════════
                // K: CLIENTS travel + lock
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: "#clients-section",
                    start: "top bottom",
                    end: "top center",
                    scrub: 2.2,
                    onUpdate(self) {
                        const p = self.progress;
                        const fr = whyPos(di);
                        const to = clientsPos(di);
                        if (!fr || !to) return;
                        resize(dot, DOT_LARGE + (DOT_SMALL - DOT_LARGE) * p);
                        paint(dot, fr.x + (to.x - fr.x) * eio(p), fr.y + (to.y - fr.y) * eio(p), cl(p * 3), cl(0.3 + p * 0.7));
                    },
                });
                ScrollTrigger.create({
                    trigger: "#clients-section",
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 2.2,
                    onUpdate() {
                        const to = clientsPos(di);
                        if (!to) return;
                        resize(dot, DOT_SMALL);
                        paint(dot, to.x, to.y, 1, 1);
                    },
                });

                // ════════════════════════════════════════════════════════════
                // L: PARTNERS travel + lock
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: "#partners-section",
                    start: "top bottom",
                    end: "top center",
                    scrub: 2.2,
                    onUpdate(self) {
                        const p = self.progress;
                        const fr = clientsPos(di);
                        const to = partnersPos(di);
                        if (!fr || !to) return;
                        resize(dot, DOT_SMALL);
                        paint(dot, fr.x + (to.x - fr.x) * eio(p), fr.y + (to.y - fr.y) * eio(p), 1, 1);
                    },
                });
                ScrollTrigger.create({
                    trigger: "#partners-section",
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 2.2,
                    onUpdate() {
                        const to = partnersPos(di);
                        if (!to) return;
                        resize(dot, DOT_SMALL);
                        paint(dot, to.x, to.y, 1, 1);
                    },
                });

                // ════════════════════════════════════════════════════════════
                // M: CTA travel + fade out
                // ════════════════════════════════════════════════════════════
                ScrollTrigger.create({
                    trigger: "#cta-section",
                    start: "top bottom",
                    end: "top top",
                    scrub: 2.2,
                    onUpdate(self) {
                        const p = self.progress;
                        const fr = partnersPos(di);
                        const to = ctaPos();
                        if (!fr || !to) return;
                        const e = eio(cl(p / 0.3));
                        const op = cl(1 - p / 0.25);
                        resize(dot, DOT_SMALL);
                        paint(dot, fr.x + (to.x - fr.x) * e, fr.y + (to.y - fr.y) * e, op, cl(1 - p * 0.5));
                    },
                });

                // ════════════════════════════════════════════════════════════
                // N: CTA background fill (di === 0 only)
                // ════════════════════════════════════════════════════════════
                if (di === 0) {
                    ScrollTrigger.create({
                        trigger: "#cta-section",
                        start: "top 80%",
                        end: "bottom top",
                        onEnter: () => emit("cta", true, "cta", 0),
                        onLeave: () => emit("cta", false, "cta", 0),
                        onEnterBack: () => emit("cta", true, "cta", 0),
                        onLeaveBack: () => emit("cta", false, "cta", 0),
                    });
                }
            });

            ScrollTrigger.refresh();
        }
    }, []);

    return null;
}