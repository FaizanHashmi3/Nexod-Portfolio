"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NAV_LINKS: { label: string; href: string }[] = [
    { label: "Services", href: "#services-section" },
    { label: "Why Us", href: "#why-section" },
    { label: "Clients", href: "#clients-section" },
    { label: "Partners", href: "#partners-section" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handle);
        return () => window.removeEventListener("scroll", handle);
    }, []);

    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href === "#") return;

        // If not on home page, go home first then scroll
        if (window.location.pathname !== "/") {
            router.push("/" + href);
            return;
        }

        const target = document.querySelector(href);
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

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
                    <div
                        className="flex items-center gap-3 font-semibold text-lg tracking-tight cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center">
                            N
                        </div>
                        Nexod
                    </div>

                    {/* Nav */}
                    <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                        {NAV_LINKS.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                onClick={(e) => handleNav(e, href)}
                                className="relative group"
                            >
                                {label}
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* CTA → /contact */}
                    <button
                        onClick={() => router.push("/contact")}
                        className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-300"
                    >
                        Contact
                    </button>

                </div>
            </div>
        </div>
    );
}