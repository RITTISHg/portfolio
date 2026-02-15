"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const contactLinks = [
    {
        icon: "✉",
        label: "Email",
        value: "rittish.g2023eee@sece.ac.in",
        href: "mailto:rittish.g2023eee@sece.ac.in",
    },
    {
        icon: "in",
        label: "LinkedIn",
        value: "linkedin.com/in/rittishg",
        href: "https://www.linkedin.com/in/rittishg/",
    },
    {
        icon: "</>",
        label: "GitHub",
        value: "github.com/rittishg",
        href: "https://github.com/",
    },
];

export default function Contact() {
    const ref = useRef(null);
    const formRef = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [status, setStatus] = useState("idle"); // idle, sending, sent, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            await emailjs.sendForm(
                "service_f6l60ch",
                "template_w2qhpp",
                formRef.current,
                "zthpelV1k5lIP5d_Z"
            );
            setStatus("sent");
            formRef.current.reset();
            setTimeout(() => setStatus("idle"), 4000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <section id="contact" className="py-24 md:py-32 relative bg-gradient-to-b from-[var(--surface)] to-[var(--bg)]">
            <div className="max-w-6xl mx-auto px-6" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-4 relative px-8">
                        <span className="absolute left-0 top-1/2 w-5 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]" />
                        Let&apos;s Connect
                        <span className="absolute right-0 top-1/2 w-5 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]" />
                    </span>
                    <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-2xl md:text-3xl lg:text-4xl text-white">
                        Get in <span className="glow-accent">Touch</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                    {/* Left — Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="font-[family-name:var(--font-orbitron)] text-lg md:text-xl font-bold text-white mb-4 tracking-wider">
                            Open to Opportunities
                        </h3>
                        <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed mb-8">
                            I&apos;m always excited to connect with fellow engineers, collaborate on innovative projects,
                            or explore internship and research opportunities in embedded systems, IoT, and industrial automation.
                        </p>

                        <div className="flex flex-col gap-3">
                            {contactLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                                    className="group flex items-center gap-4 p-4 bento-card hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(0,229,255,0.08)] transition-all duration-300 hover:translate-x-1"
                                >
                                    <div className="w-11 h-11 shrink-0 rounded-lg bg-[rgba(0,229,255,0.06)] border border-[var(--border)] flex items-center justify-center text-base group-hover:border-[var(--accent)] transition-colors duration-300">
                                        <span className={link.icon === "</>" ? "font-[family-name:var(--font-jetbrains)] text-xs text-[var(--accent)]" : ""}>
                                            {link.icon}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-[family-name:var(--font-jetbrains)] text-[0.58rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-0.5">
                                            {link.label}
                                        </div>
                                        <div className="text-sm font-semibold text-white truncate">
                                            {link.value}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="block font-[family-name:var(--font-jetbrains)] text-[0.6rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="from_name"
                                    placeholder="John Doe"
                                    required
                                    className="w-full bg-[var(--card)] border border-[var(--border)] text-white px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08),0_0_20px_rgba(0,229,255,0.06)] transition-all duration-300 placeholder:text-[var(--muted)] backdrop-blur-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-[family-name:var(--font-jetbrains)] text-[0.6rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="from_email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full bg-[var(--card)] border border-[var(--border)] text-white px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08),0_0_20px_rgba(0,229,255,0.06)] transition-all duration-300 placeholder:text-[var(--muted)] backdrop-blur-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-[family-name:var(--font-jetbrains)] text-[0.6rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Your message here..."
                                    required
                                    rows={5}
                                    className="w-full bg-[var(--card)] border border-[var(--border)] text-white px-4 py-3 rounded-lg text-sm outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08),0_0_20px_rgba(0,229,255,0.06)] transition-all duration-300 resize-y placeholder:text-[var(--muted)] backdrop-blur-lg"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={status === "sending"}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full sm:w-auto self-start px-8 py-3.5 text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-[0.2em] uppercase rounded-lg border transition-all duration-300 ${status === "sent"
                                        ? "border-[var(--accent3)] text-[var(--accent3)] bg-[rgba(16,185,129,0.08)]"
                                        : status === "error"
                                            ? "border-red-500 text-red-400 bg-[rgba(255,0,0,0.06)]"
                                            : "border-[var(--accent)] text-[var(--accent)] hover:bg-[rgba(0,229,255,0.08)] hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
                                    } ${status === "sending" ? "opacity-60" : ""}`}
                            >
                                {status === "idle" && "⟶ Send Message"}
                                {status === "sending" && "⟶ Sending..."}
                                {status === "sent" && "✓ Message Sent!"}
                                {status === "error" && "✗ Failed — Try Again"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
