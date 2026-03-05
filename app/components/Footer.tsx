"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {

    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (!textRef.current) return;

        gsap.to(textRef.current, {
            y: -120,
            scrollTrigger: {
                trigger: "#footer",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true
            }
        });

    }, []);

    return (
        <footer
            id="footer"
            className="relative bg-neutral-100 pt-36 pb-12 overflow-hidden"
        >

            {/* HUGE BACKGROUND WORD */}
            <div
                ref={textRef}
                className="
        absolute
        left-1/2
        top-20
        -translate-x-1/2
        text-[220px]
        font-semibold
        tracking-[-0.05em]
        text-black/[0.03]
        whitespace-nowrap
        pointer-events-none
      "
            >
                NEXOD
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* MAIN GRID */}
                <div className="grid md:grid-cols-4 gap-16 mb-24">

                    {/* BRAND */}
                    <div className="max-w-sm">

                        <div className="flex items-center gap-3 mb-8 font-semibold text-lg tracking-tight">
                            <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
                                N
                            </div>
                            Nexod
                        </div>

                        <p className="text-black/60 leading-relaxed mb-8">
                            AI-native product and growth studio building intelligent
                            platforms for companies shaping the future.
                        </p>

                        <div className="flex gap-5 text-black/60">
                            <span className="hover:text-black transition cursor-pointer">
                                LinkedIn
                            </span>
                            <span className="hover:text-black transition cursor-pointer">
                                Twitter
                            </span>
                        </div>

                    </div>

                    <FooterColumn
                        title="Services"
                        items={[
                            "AI Platforms",
                            "Automation Systems",
                            "Growth Infrastructure",
                            "Product Engineering"
                        ]}
                    />

                    <FooterColumn
                        title="Company"
                        items={[
                            "About",
                            "Careers",
                            "Case Studies",
                            "Contact"
                        ]}
                    />

                    <div>
                        <h4 className="font-semibold mb-8 tracking-tight">
                            Contact
                        </h4>

                        <ul className="space-y-4 text-black/60">
                            <li className="hover:text-black transition cursor-pointer">
                                hello@nexod.ai
                            </li>
                            <li>
                                San Francisco / Remote
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-black/50 gap-4">

                    <div>
                        © {new Date().getFullYear()} Nexod. All rights reserved.
                    </div>

                    <div className="flex gap-8">
                        <span className="hover:text-black transition cursor-pointer">
                            Privacy
                        </span>
                        <span className="hover:text-black transition cursor-pointer">
                            Terms
                        </span>
                        <span className="hover:text-black transition cursor-pointer">
                            Cookies
                        </span>
                    </div>

                </div>

            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    items
}: {
    title: string;
    items: string[];
}) {
    return (
        <div>

            <h4 className="font-semibold mb-8 tracking-tight">
                {title}
            </h4>

            <ul className="space-y-4 text-black/60">
                {items.map((item) => (
                    <li
                        key={item}
                        className="hover:text-black transition cursor-pointer"
                    >
                        {item}
                    </li>
                ))}
            </ul>

        </div>
    );
}