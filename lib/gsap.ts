"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// register
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// IMPORTANT: export BOTH properly
export default gsap;
export { ScrollTrigger };