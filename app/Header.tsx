"use client";

import { useEffect, useState } from "react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handle);
        return () => window.removeEventListener("scroll", handle);
    }, []);

    return (
        <div className="fixed top-5 w-[85%] z-[99999] flex justify-center">
            <div
                className={`
          w-full max-w-7xl
          rounded-full
          transition-all duration-500
          backdrop-blur-2xl
          border border-black/10
          ${scrolled
                        ? "bg-white/50 shadow-[0_15px_50px_rgba(0,0,0,0.08)]"
                        : "bg-white/60"}
        `}
            >
                <div className="flex items-center justify-between px-10 py-4">

                    {/* Logo */}
                    <div className="flex items-center gap-3 font-semibold text-lg tracking-tight">
                        <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center">
                            N
                        </div>
                        Nexod
                    </div>

                    {/* Nav */}
                    <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                        {["Work", "Services", "Clients", "About", "Knowledge"].map((item) => (
                            <a key={item} href="#" className="relative group">
                                {item}
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <button className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-300">
                        Contact
                    </button>

                </div>
            </div>
        </div>
    );
}