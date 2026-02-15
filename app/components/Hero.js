"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const titles = [
    "Embedded Systems Engineer",
    "IoT Solutions Developer",
    "Industrial Automation",
    "Aerospace Design Enthusiast",
    "Smart Energy Innovator",
];

export default function Hero() {
    const [typed, setTyped] = useState("");
    const [titleIdx, setTitleIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const canvasRef = useRef(null);

    // Typing animation
    useEffect(() => {
        const full = titles[titleIdx];
        const timeout = setTimeout(() => {
            if (!deleting) {
                setTyped(full.slice(0, charIdx + 1));
                if (charIdx + 1 === full.length) {
                    setTimeout(() => setDeleting(true), 1800);
                } else {
                    setCharIdx(charIdx + 1);
                }
            } else {
                setTyped(full.slice(0, charIdx));
                if (charIdx === 0) {
                    setDeleting(false);
                    setTitleIdx((titleIdx + 1) % titles.length);
                } else {
                    setCharIdx(charIdx - 1);
                }
            }
        }, deleting ? 30 : 60);
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, titleIdx]);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let W, H, nodes = [], animId;
        const isMobile = window.innerWidth < 600;

        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        const count = isMobile ? 30 : 80;
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5,
                a: Math.random() * 0.5 + 0.1,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            nodes.forEach((n) => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,229,255,${n.a})`;
                ctx.fill();
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0,229,255,${(1 - d / 120) * 0.12})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        }
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
    };
    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-0 w-full">
                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                    {/* Left — Text */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-6 text-center md:text-left order-2 md:order-1"
                    >
                        <motion.div variants={item}>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] font-[family-name:var(--font-jetbrains)] tracking-[0.18em] uppercase text-[var(--accent)] border border-[var(--border)] bg-[rgba(0,229,255,0.04)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)] animate-pulse" />
                                EEE Engineer · IoT Innovator
                            </span>
                        </motion.div>

                        <motion.h1 variants={item} className="font-[family-name:var(--font-orbitron)] font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                            <span className="text-white">RITTISH</span>
                            <br />
                            <span
                                className="inline-block bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))",
                                    backgroundSize: "200% auto",
                                    animation: "shimmer 3s linear infinite",
                                }}
                            >
                                G.
                            </span>
                        </motion.h1>

                        <motion.div variants={item} className="font-[family-name:var(--font-jetbrains)] text-sm md:text-base tracking-[0.1em] text-[var(--accent)] h-7">
                            {typed}
                            <span className="inline-block w-[2px] h-[1.1em] bg-[var(--accent)] ml-0.5 align-text-bottom" style={{ animation: "blink 1s infinite" }} />
                        </motion.div>

                        <motion.p variants={item} className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
                            3rd Year Electrical & Electronics Engineering student at Sri Eshwar College of Engineering.
                            Building intelligent embedded systems, IoT solutions, and bridging the gap between hardware
                            and software to create tomorrow&apos;s automation.
                        </motion.p>

                        <motion.div variants={item} className="flex gap-4 justify-center md:justify-start flex-wrap">
                            <a
                                href="#projects"
                                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                                className="group relative px-6 py-3 text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-[0.18em] uppercase text-[var(--bg)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:-translate-y-0.5"
                            >
                                <span className="relative z-10">↘ View Projects</span>
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                                className="px-6 py-3 text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-[0.18em] uppercase text-white border border-[var(--border)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Get in Touch
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right — Avatar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="flex justify-center order-1 md:order-2"
                    >
                        <div className="relative w-56 h-56 md:w-64 md:h-64">
                            {/* Outer glow ring */}
                            <div className="absolute inset-[-20px] rounded-full border border-[rgba(0,229,255,0.08)]" style={{ animation: "spin-slow 30s linear infinite" }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                            </div>
                            <div className="absolute inset-[-40px] rounded-full border border-[rgba(124,58,237,0.06)]" style={{ animation: "spin-slow 45s linear infinite reverse" }}>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent2)] shadow-[0_0_8px_var(--accent2)]" />
                            </div>

                            {/* Main avatar */}
                            <div className="relative w-full h-full rounded-full glass-strong flex flex-col items-center justify-center border-[2px] border-[rgba(0,229,255,0.1)]">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgba(0,229,255,0.05)] to-[rgba(124,58,237,0.05)]" />
                                <span className="font-[family-name:var(--font-orbitron)] font-black text-4xl md:text-5xl tracking-wider text-white relative z-10">
                                    RG
                                </span>
                                <span className="font-[family-name:var(--font-jetbrains)] text-[0.6rem] tracking-[0.25em] text-[var(--muted)] mt-2 relative z-10 uppercase">
                                    EEE &apos;27 · SECE
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        </section>
    );
}
