"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
    {
        num: "01",
        title: "SMART CLOUD CONTROL",
        subtitle: "Embedded Systems & IoT Development",
        desc: "Interactive web-dashboard for real-time device monitoring & control. ESP8266 WiFi module integrated with sensors for automated device triggering. Firebase backend with ThinkSpeak analytics.",
        tags: [
            { label: "ESP8266", color: "accent" },
            { label: "Firebase", color: "accent" },
            { label: "IoT", color: "accent3" },
            { label: "Embedded C", color: "accent" },
            { label: "ThinkSpeak", color: "accent2" },
        ],
        link: "#",
    },
    {
        num: "02",
        title: "ESP8266 TWO WAY COMM",
        subtitle: "Embedded Systems & Automation",
        desc: "Bidirectional communication system between multiple ESP8266 microcontroller boards. Custom data transfer protocol for reliable inter-board communication and autonomous automation control.",
        tags: [
            { label: "ESP8266", color: "accent" },
            { label: "Firmware", color: "accent3" },
            { label: "Embedded C", color: "accent" },
            { label: "Automation", color: "accent2" },
        ],
        link: "#",
    },
    {
        num: "03",
        title: "SHORE ENERGY",
        subtitle: "Sustainable Energy Development & Mechanical · Team Lead",
        desc: "Led cross-functional team designing eco-friendly energy systems. Achieved 60% reduction in energy costs through novel mechanical methods. Integrated real-time sensor monitoring systems.",
        tags: [
            { label: "Sustainability", color: "accent3" },
            { label: "Mechanical Design", color: "accent" },
            { label: "Team Lead", color: "accent2" },
            { label: "Sensors", color: "accent" },
        ],
        link: "#",
    },
    {
        num: "04",
        title: "NIGHT HAWACK F-117",
        subtitle: "AeroSpace Design & Mechanical Engineering · Designer",
        desc: "Engineered RC airplane using MATLAB simulation and Blender CAD modeling. Optimized aeronautical design achieving 30 km/hr top speed with 5 kg payload capacity and autonomous flight control.",
        tags: [
            { label: "MATLAB", color: "accent" },
            { label: "CAD/Blender", color: "accent2" },
            { label: "Aerospace", color: "accent" },
            { label: "Payload Design", color: "accent3" },
        ],
        link: "#",
    },
];

const tagColors = {
    accent: {
        bg: "rgba(0,229,255,0.06)",
        border: "rgba(0,229,255,0.15)",
        text: "var(--accent)",
    },
    accent2: {
        bg: "rgba(124,58,237,0.06)",
        border: "rgba(124,58,237,0.18)",
        text: "#a78bfa",
    },
    accent3: {
        bg: "rgba(16,185,129,0.06)",
        border: "rgba(16,185,129,0.18)",
        text: "#34d399",
    },
};

function ProjectCard({ project, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="bento-card group p-6 md:p-8 relative"
        >
            {/* Spotlight glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(0,229,255,0.06),transparent_60%)]" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <span className="font-[family-name:var(--font-jetbrains)] text-[0.6rem] tracking-[0.2em] text-[var(--muted)] uppercase">
                        PROJECT_{project.num}
                    </span>
                    <span className="text-[var(--accent)] text-lg opacity-30 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300">
                        ↗
                    </span>
                </div>

                <h3 className="font-[family-name:var(--font-orbitron)] font-bold text-base md:text-lg text-white mb-1 tracking-wide">
                    {project.title}
                </h3>
                <p className="font-[family-name:var(--font-jetbrains)] text-[0.6rem] tracking-[0.12em] text-[var(--accent2)] uppercase mb-4">
                    {project.subtitle}
                </p>

                <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
                    {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => {
                        const c = tagColors[tag.color];
                        return (
                            <span
                                key={tag.label}
                                className="tag-chip"
                                style={{
                                    background: c.bg,
                                    borderColor: c.border,
                                    color: c.text,
                                }}
                            >
                                {tag.label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="py-24 md:py-32 relative">
            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-4 relative px-8">
                        <span className="absolute left-0 top-1/2 w-5 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]" />
                        Featured Work
                        <span className="absolute right-0 top-1/2 w-5 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]" />
                    </span>
                    <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-2xl md:text-3xl lg:text-4xl text-white">
                        Engineering{" "}
                        <span className="glow-accent">Projects</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.num} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
