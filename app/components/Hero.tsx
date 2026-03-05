"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allTargets = [
      badgeRef.current,
      headingRef.current?.querySelectorAll(".h-line"),
      subRef.current,
      ctaRef.current?.querySelectorAll("button"),
      statsRef.current?.querySelectorAll(".stat-block"),
      statsRef.current?.querySelectorAll(".stat-divider"),
    ];
    allTargets.forEach((t) => t && gsap.killTweensOf(t));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.1 });

      gsap.set(badgeRef.current, { y: -16, opacity: 0 });
      tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.7 }, 0);

      const lines = headingRef.current?.querySelectorAll<HTMLElement>(".h-line");
      if (lines?.length) {
        gsap.set(lines, {
          rotateX: 90,
          y: 40,
          opacity: 0,
          transformOrigin: "bottom center",
        });
        tl.to(
          lines,
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.18
        );
      }

      gsap.set(subRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
      tl.to(
        subRef.current,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.inOut",
        },
        0.55
      );

      const btns = ctaRef.current?.querySelectorAll<HTMLElement>("button");
      if (btns?.length) {
        gsap.set(btns, { y: 24, opacity: 0 });
        tl.to(btns, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 }, 0.7);
      }

      const statEls =
        statsRef.current?.querySelectorAll<HTMLElement>(".stat-block");
      const dividers =
        statsRef.current?.querySelectorAll<HTMLElement>(".stat-divider");

      if (statEls?.length) {
        gsap.set(statEls, { y: 20, opacity: 0 });
        gsap.set(dividers ?? [], {
          scaleY: 0,
          transformOrigin: "top center",
        });

        tl.to(
          statEls,
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          0.85
        );
        tl.to(
          dividers ?? [],
          { scaleY: 1, duration: 0.5, stagger: 0.08 },
          0.9
        );

        statEls.forEach((el) => {
          const numEl = el.querySelector<HTMLElement>(".stat-num");
          if (!numEl) return;

          const raw = numEl.dataset.value ?? "0";
          const suffix = raw.replace(/[\d.]/g, "");
          const target = parseFloat(raw);
          if (!isFinite(target)) return;

          numEl.textContent = "0" + suffix;

          const counter = { val: 0 };
          tl.to(
            counter,
            {
              val: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate() {
                numEl.textContent =
                  (Number.isInteger(target)
                    ? Math.round(counter.val)
                    : counter.val.toFixed(1)) + suffix;
              },
            },
            1.05
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-white flex items-center py-26"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="relative">

          {/* BADGE */}
          <div
            ref={badgeRef}
            className="inline-flex items-center mb-5 px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-400 tracking-wide"
          >
            AI-Native Product &amp; Growth Studio
          </div>

          {/* HEADING */}
          <h1
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-7"
            style={{ perspective: "900px" }}
          >
            {[
              <>We Turn</>,
              <>Complex Ideas</>,
              <>
                Into{" "}
                <span
                  id="hero-dot-target-2"
                  className="bg-gradient-to-r from-[#9c34f0] via-[#5857f9] to-[#fb5457] text-transparent bg-clip-text"
                >
                  Intelligent
                </span>
              </>,
              <>
                <span
                  className="bg-gradient-to-r from-[#9c34f0] via-[#5857f9] to-[#fb5457] text-transparent bg-clip-text"
                >
                  Systems
                </span>
              </>,
            ].map((content, i) => (
              <span key={i} style={{ overflow: "hidden", display: "block" }}>
                <span className="h-line" style={{ display: "block" }}>
                  {content}
                </span>
              </span>
            ))}
          </h1>

          {/* SUBTEXT */}
          <p
            ref={subRef}
            id="hero-dot-target-1"
            className="text-base md:text-lg text-black-400 max-w-md mb-10 leading-relaxed"
          >
            Designing AI platforms, automation infrastructure, and scalable
            digital products for companies building the future.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex gap-3 mb-14">
            <button
              id="hero-dot-target-3"
              className="px-7 py-3.5 bg-black text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              Start a Project →
            </button>

            <button className="relative overflow-hidden px-7 py-3.5 border border-gray-200 rounded-full text-sm font-medium transition-colors duration-300 group cursor-pointer">
              <span className="absolute inset-0 rounded-full bg-black scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                See How It Works
              </span>
            </button>
          </div>

          {/* STATS */}
          <div
            ref={statsRef}
            className="flex items-center gap-8 pt-8 border-t border-gray-100"
          >
            <Stat number="50+" label="Projects" />
            <div className="stat-divider w-px h-7 bg-gray-200" />
            <Stat number="30+" label="Companies" />
            <div className="stat-divider w-px h-7 bg-gray-200" />
            <Stat number="96%" label="Retention" />
            <div className="stat-divider w-px h-7 bg-gray-200" />
            <Stat number="3x" label="ROI" />
          </div>
        </div>

        {/* RIGHT SIDE — sphere canvas injected here by StoryCanvas */}
        <div />
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="stat-block">
      <div className="stat-num text-xl font-bold mb-0.5" data-value={number}>
        {number}
      </div>
      <div className="text-xs text-gray-400 tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
}