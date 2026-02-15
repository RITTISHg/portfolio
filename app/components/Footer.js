"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <motion.footer
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative py-10 text-center border-t border-[var(--border)]"
        >
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

            <p className="font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.12em] text-[var(--muted)]">
                Designed & Built with precision by{" "}
                <span className="text-[var(--accent)]">Rittish G</span> · EEE &apos;27 · Sri Eshwar College of Engineering
            </p>
            <p className="font-[family-name:var(--font-jetbrains)] text-[0.55rem] tracking-[0.1em] text-[rgba(90,114,144,0.5)] mt-2">
                Embedded Systems · IoT · Industrial Automation · Aerospace
            </p>
        </motion.footer>
    );
}
