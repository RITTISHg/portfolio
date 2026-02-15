"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
    {
        icon: "⚡",
        label: "Programming",
        skills: [
            { name: "Embedded C / C++", sub: "Core · Advanced", level: 5 },
            { name: "Python", sub: "Scripting · ML", level: 4 },
            { name: "Visual Basic", sub: "Desktop · Apps", level: 3 },
        ],
    },
    {
        icon: "🔧",
        label: "Microcontrollers & IoT",
        skills: [
            { name: "ESP32 / ESP8266", sub: "WiFi MCU", level: 5 },
            { name: "Arduino", sub: "Uno / IDE", level: 5 },
            { name: "Node MCU", sub: "IoT Dev", level: 4 },
        ],
    },
    {
        icon: "⚙️",
        label: "Automation & Control",
        skills: [
            { name: "SCADA Systems", sub: "Industrial", level: 4 },
            { name: "PLC / Ladder Logic", sub: "Control", level: 4 },
            { name: "HMI Design", sub: "Interface", level: 3 },
        ],
    },
    {
        icon: "📐",
        label: "CAD & Design Tools",
        skills: [
            { name: "MATLAB", sub: "Simulation", level: 4 },
            { name: "Blender / CAD", sub: "3D Design", level: 4 },
            { name: "Firebase / Blynk", sub: "Cloud / IoT", level: 4 },
        ],
    },
];

function SkillCard({ skill, catIdx, skillIdx }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const delay = catIdx * 0.15 + skillIdx * 0.08;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
            className="skill-orb bento-card p-5 group relative overflow-hidden"
        >
            {/* Top scan line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Status dot */}
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[var(--accent3)] shadow-[0_0_6px_var(--accent3)]" style={{ animation: "pulse-glow 3s ease-in-out infinite" }} />

            <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[rgba(0,229,255,0.08)] to-[rgba(124,58,237,0.08)] border border-[var(--border)] flex items-center justify-center text-base group-hover:border-[rgba(0,229,255,0.2)] transition-colors duration-300">
                    {skill.name.includes("C++") ? "⚙" : skill.name.includes("Python") ? "🐍" : skill.name.includes("Visual") ? "💻" : skill.name.includes("ESP") ? "📡" : skill.name.includes("Arduino") ? "🔌" : skill.name.includes("Node") ? "📶" : skill.name.includes("SCADA") ? "🖥" : skill.name.includes("PLC") ? "🔄" : skill.name.includes("HMI") ? "🎛" : skill.name.includes("MATLAB") ? "📊" : skill.name.includes("Blender") ? "🧊" : "☁"}
                </div>
                <div>
                    <div className="font-[family-name:var(--font-orbitron)] text-[0.7rem] font-bold text-white tracking-wider">
                        {skill.name}
                    </div>
                    <div className="font-[family-name:var(--font-jetbrains)] text-[0.52rem] text-[var(--muted)] tracking-[0.12em] uppercase mt-0.5">
                        {skill.sub}
                    </div>
                </div>
            </div>

            {/* Signal wave SVG */}
            <svg className="w-full h-8 overflow-visible mb-3" viewBox="0 0 200 40" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 4" />
                <motion.polyline
                    points="0,20 10,20 18,6 26,34 34,8 42,32 50,10 58,30 66,12 74,28 82,14 90,26 98,20 110,20 120,8 130,32 140,10 150,30 160,12 170,28 180,16 190,20 200,20"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="url(#waveGrad)"
                    initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                    animate={inView ? { strokeDashoffset: 0 } : {}}
                    transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,0.3))" }}
                />
            </svg>

            {/* Level indicator */}
            <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((seg) => (
                    <motion.div
                        key={seg}
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ delay: delay + seg * 0.1, duration: 0.3 }}
                        className={`h-[3px] w-4 rounded-sm origin-left ${seg <= skill.level
                                ? seg >= 4
                                    ? "bg-[var(--accent3)] shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                                    : seg >= 3
                                        ? "bg-[var(--accent2)] shadow-[0_0_6px_rgba(124,58,237,0.4)]"
                                        : "bg-[var(--accent)] shadow-[0_0_6px_rgba(0,229,255,0.4)]"
                                : "bg-[rgba(255,255,255,0.06)]"
                            }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-24 md:py-32 relative bg-gradient-to-b from-[var(--surface)] via-[var(--bg)] to-[var(--surface)]">
            {/* SVG gradient for waves */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="40%" stopColor="#00e5ff" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-4 relative px-8">
                        <span className="absolute left-0 top-1/2 w-5 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]" />
                        Technical Arsenal
                        <span className="absolute right-0 top-1/2 w-5 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]" />
                    </span>
                    <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-2xl md:text-3xl lg:text-4xl text-white">
                        Core <span className="glow-accent">Skills</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-14">
                    {skillCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: catIdx * 0.15, duration: 0.6 }}
                        >
                            {/* Category header */}
                            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[var(--border)]">
                                <div className="w-9 h-9 bg-gradient-to-br from-[rgba(0,229,255,0.08)] to-[rgba(124,58,237,0.08)] border border-[var(--border)] flex items-center justify-center text-lg rounded-lg shrink-0">
                                    {cat.icon}
                                </div>
                                <span className="font-[family-name:var(--font-orbitron)] text-[0.72rem] font-bold text-[var(--accent)] tracking-[0.18em] uppercase">
                                    {cat.label}
                                </span>
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-[var(--border)] to-transparent" />
                            </div>

                            {/* Skills grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cat.skills.map((skill, skillIdx) => (
                                    <SkillCard
                                        key={skill.name}
                                        skill={skill}
                                        catIdx={catIdx}
                                        skillIdx={skillIdx}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
