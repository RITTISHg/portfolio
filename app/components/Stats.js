"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
    { value: 7.84, label: "Current CGPA", decimal: true, suffix: "" },
    { value: 4, label: "Major Projects", decimal: false, suffix: "+" },
    { value: 5, label: "Achievements", decimal: false, suffix: "+" },
    { value: 2, label: "Industrial Trainings", decimal: false, suffix: "" },
];

function AnimatedCounter({ value, decimal, suffix, inView }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 2000;
        const start = performance.now();

        function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(value * eased);
            if (progress < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }, [inView, value]);

    return (
        <span className="font-[family-name:var(--font-orbitron)] font-black text-3xl md:text-4xl text-white">
            {decimal ? count.toFixed(2) : Math.floor(count)}
            {suffix && <span className="text-[var(--accent)] text-xl">{suffix}</span>}
        </span>
    );
}

export default function Stats() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="relative py-12 md:py-16 border-y border-[var(--border)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.02)] to-transparent" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`text-center flex flex-col items-center gap-2 ${i < stats.length - 1 ? "md:border-r md:border-[var(--border)]" : ""
                                }`}
                        >
                            <AnimatedCounter
                                value={s.value}
                                decimal={s.decimal}
                                suffix={s.suffix}
                                inView={inView}
                            />
                            <span className="font-[family-name:var(--font-jetbrains)] text-[0.62rem] tracking-[0.16em] uppercase text-[var(--muted)]">
                                {s.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
