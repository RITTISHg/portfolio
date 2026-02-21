"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const achievements = [
    { icon: "🏆", title: "Makers Arena Winner", desc: "Won 24-Hour Hackathon at AIC Raise 2025. Demonstrated Engineering Design, System Integration, and Embedded C proficiency.", badge: "AIC Raise 2025" },
    { icon: "🚀", title: "NASA Global Nominee", desc: "Global Nominee in NASA Space Apps Challenge 2025 for IoT/IIoT and Smart Energy Systems project.", badge: "NASA 2025" },
    { icon: "⚡", title: "Cipher Thon — Top 5", desc: "Top 5 Finalist out of 1500 participants in National Level Cipher Thon (2023). Showcased problem-solving and system integration skills.", badge: "Top 5 / 1500" },
    { icon: "✈️", title: "IIT Shastra Finalist", desc: "Top 30 Finalist in IIT Shastra Drone Modelling Competition (2023). Applied Mechanical Design, Payload Design, and Aeronautical Engineering.", badge: "Top 30 · IIT" },
    { icon: "🤖", title: "Garuda National Hackathon", desc: "Participant in Garuda National Hackathon (CAPE). National-level competition showcasing Automation Systems and Mechanical Design expertise.", badge: "National Level" },
    { icon: "📚", title: "Academic Excellence", desc: "HSC 92% · SSLC 90% — Consistent academic performance leading into engineering with a 7.84 CGPA through 5th semester.", badge: "CGPA 7.84" },
];

const images = [
    { src: "/img/highlights/img-1.png", alt: "Hackathon Win" },
    { src: "/img/highlights/img-2.png", alt: "NASA Challenge" },
    { src: "/img/highlights/img-3.png", alt: "Project Demo" },
    { src: "/img/highlights/img-4.png", alt: "Award Ceremony" },
];

function AchCard({ ach, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="bento-card p-6 text-center group relative overflow-hidden"
        >
            {/* Holographic sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div
                    className="absolute inset-[-50%] w-[200%] h-[200%]"
                    style={{
                        background: "conic-gradient(transparent, rgba(0,229,255,0.04), transparent, transparent)",
                        animation: "spin-slow 5s linear infinite",
                    }}
                />
            </div>

            <div className="relative z-10">
                <span className="text-3xl mb-3 block" style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.3))" }}>
                    {ach.icon}
                </span>
                <h3 className="font-[family-name:var(--font-orbitron)] text-[0.78rem] font-bold text-white mb-2 tracking-wider">
                    {ach.title}
                </h3>
                <p className="text-[var(--muted)] text-[0.82rem] leading-relaxed mb-4">
                    {ach.desc}
                </p>
                <span className="inline-block px-3 py-1 text-[0.58rem] font-[family-name:var(--font-jetbrains)] tracking-[0.12em] uppercase text-[var(--accent)] border border-[rgba(0,229,255,0.18)] bg-[rgba(0,229,255,0.05)] rounded">
                    {ach.badge}
                </span>
            </div>
        </motion.div>
    );
}

export default function Achievements() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    /* Each card is ~360px (340 + 20 gap). 4 images = 1440px per set. We duplicate 2x. */
    const scrollSet = [...images, ...images];

    return (
        <section id="achievements" className="py-24 md:py-32 relative bg-[var(--surface)]">
            <style jsx>{`
                @keyframes gallery-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .gallery-track {
                    display: flex;
                    gap: 1.25rem;
                    width: max-content;
                    animation: gallery-scroll 40s linear infinite;
                    will-change: transform;
                }
                .gallery-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-4 relative px-8">
                        <span className="absolute left-0 top-1/2 w-5 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]" />
                        Recognition
                        <span className="absolute right-0 top-1/2 w-5 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]" />
                    </span>
                    <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-2xl md:text-3xl lg:text-4xl text-white">
                        Awards & <span className="glow-accent">Achievements</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                    {achievements.map((ach, i) => (
                        <AchCard key={ach.title} ach={ach} index={i} />
                    ))}
                </div>

                {/* Image Gallery — Slow Smooth Infinite Scroll */}
                <div className="relative overflow-hidden py-6">
                    <div className="text-center mb-6">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[0.68rem] tracking-[0.2em] uppercase text-[var(--accent)]">
                            📷 Highlights Gallery
                        </span>
                    </div>

                    <div className="relative">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[var(--surface)] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[var(--surface)] to-transparent z-10 pointer-events-none" />

                        <div className="gallery-track">
                            {scrollSet.map((img, i) => (
                                <div
                                    key={i}
                                    className="shrink-0 w-[280px] md:w-[340px] h-[180px] md:h-[220px] rounded-xl overflow-hidden border border-[var(--border)] group relative"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="340px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,10,18,0.85)] via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                        <span className="font-[family-name:var(--font-orbitron)] text-[0.68rem] font-bold tracking-wider text-[var(--accent)]">
                                            {img.alt}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
