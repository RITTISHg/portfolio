"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
    {
        period: "2023 – 2027",
        title: "B.E — Electrical & Electronics Engineering",
        org: "Sri Eshwar College of Engineering · CGPA: 7.84 (5th Sem)",
        desc: "Pursuing core EEE with specialization in embedded systems, IoT, automation, and power systems. Active in hackathons, design competitions, and research projects.",
        tags: ["EEE", "Active"],
        color: "accent",
        active: true,
    },
    {
        period: "2025 · Certificate Awarded",
        title: "Industrial Automation & Electrical Maintenance",
        org: "TNEB — Tamil Nadu Electricity Board",
        desc: "Hands-on experience with power distribution infrastructure, SCADA systems, protective relays, distribution transformer testing, metering systems, and electrical safety protocols.",
        tags: ["SCADA", "Relay Protection", "Electrical Safety", "Power Systems"],
        color: "accent3",
    },
    {
        period: "2024 · Certificate Awarded",
        title: "Power Plant Operations & Maintenance Training",
        org: "TTPS — Tuticorin Thermal Power Plant",
        desc: "Studied thermal power generation processes, boiler operations, cooling systems, and preventive maintenance strategies in large-scale industrial environments.",
        tags: ["Thermal Systems", "Preventive Maintenance", "Power Generation"],
        color: "accent2",
    },
];

const tagColors = {
    accent: { bg: "rgba(0,229,255,0.06)", border: "rgba(0,229,255,0.15)", text: "var(--accent)" },
    accent2: { bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.18)", text: "#a78bfa" },
    accent3: { bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.18)", text: "#34d399" },
};

function TimelineCard({ exp, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const dotColor = exp.color === "accent" ? "var(--accent)" : exp.color === "accent2" ? "var(--accent2)" : "var(--accent3)";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="relative pl-8 md:pl-10 pb-12 last:pb-0 group timeline-card"
        >
            {/* Timeline line */}
            <div className="absolute left-0 top-2 bottom-0 w-[2px]">
                <motion.div
                    initial={{ height: 0 }}
                    animate={inView ? { height: "100%" } : {}}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="w-full"
                    style={{
                        background: `linear-gradient(to bottom, ${dotColor}, rgba(255,255,255,0.04))`,
                    }}
                />
            </div>

            {/* Timeline dot */}
            <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                className="absolute left-[-6px] top-1.5 w-3.5 h-3.5 rounded-full border-[2.5px] bg-[var(--bg)]"
                style={{
                    borderColor: dotColor,
                    boxShadow: `0 0 12px ${dotColor}40`,
                }}
            >
                {exp.active && (
                    <span className="absolute inset-0 rounded-full" style={{ animation: "pulse-glow 2s infinite", boxShadow: `0 0 0 0 ${dotColor}40` }} />
                )}
            </motion.div>

            {/* Card */}
            <div className="bento-card p-5 md:p-6">
                <span className="font-[family-name:var(--font-jetbrains)] text-[0.62rem] tracking-[0.14em] uppercase mb-2 block" style={{ color: dotColor }}>
                    {exp.period}
                </span>
                <h3 className="font-[family-name:var(--font-orbitron)] text-sm md:text-base font-bold text-white mb-1 tracking-wide">
                    {exp.title}
                </h3>
                <p className="text-[var(--muted)] text-xs md:text-sm font-medium mb-3">
                    {exp.org}
                </p>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                    {exp.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => {
                        const c = tagColors[exp.color];
                        return (
                            <span key={tag} className="tag-chip" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                                {tag}
                            </span>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="py-24 md:py-32 relative">
            <div className="max-w-4xl mx-auto px-6" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-4 relative px-8">
                        <span className="absolute left-0 top-1/2 w-5 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]" />
                        Industrial Exposure
                        <span className="absolute right-0 top-1/2 w-5 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]" />
                    </span>
                    <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-2xl md:text-3xl lg:text-4xl text-white">
                        Training & <span className="glow-accent">Experience</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {experiences.map((exp, i) => (
                        <TimelineCard key={exp.title} exp={exp} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
