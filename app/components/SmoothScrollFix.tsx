"use client";

import { useEffect } from "react";

export default function SmoothScrollFix() {

    useEffect(() => {

        document.body.style.scrollBehavior = "smooth";

    }, []);

    return null;
}