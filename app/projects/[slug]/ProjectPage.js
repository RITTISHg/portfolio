"use client";

import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { projectsData, projectSlugs } from "@/app/data/projects";

const tagColors = {
    accent: { bg: "rgba(0,229,255,0.06)", border: "rgba(0,229,255,0.15)", text: "var(--accent)" },
    accent2: { bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.18)", text: "#a78bfa" },
    accent3: { bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.18)", text: "#34d399" },
};

/* ─── Section wrapper with scroll reveal ─── */
function Section({ children, className = "", bg = false }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={`py-16 md:py-24 ${bg ? "bg-[var(--surface)]" : ""} ${className}`}
        >
            <div className="max-w-5xl mx-auto px-6">{children}</div>
        </motion.section>
    );
}

function SectionHeader({ label, title, glow }) {
    return (
        <div className="mb-10">
            <span className="inline-block font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.25em] uppercase text-[var(--accent)] mb-3 relative px-8">
                <span className="absolute left-0 top-1/2 w-5 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]" />
                {label}
                <span className="absolute right-0 top-1/2 w-5 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]" />
            </span>
            <h2 className="font-[family-name:var(--font-orbitron)] font-bold text-xl md:text-2xl lg:text-3xl text-white">
                {title} <span className="glow-accent">{glow}</span>
            </h2>
        </div>
    );
}

export default function ProjectPage() {
    const { slug } = useParams();
    const project = projectsData[slug];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-[family-name:var(--font-orbitron)] text-2xl text-white mb-4">Project Not Found</h1>
                    <Link href="/#projects" className="text-[var(--accent)] hover:underline">← Back to Portfolio</Link>
                </div>
            </div>
        );
    }

    const currentIdx = projectSlugs.indexOf(slug);
    const prevSlug = currentIdx > 0 ? projectSlugs[currentIdx - 1] : null;
    const nextSlug = currentIdx < projectSlugs.length - 1 ? projectSlugs[currentIdx + 1] : null;

    return (
        <div className="relative grain">
            {/* Aurora */}
            <div className="aurora-bg">
                <div className="aurora-blob" />
                <div className="aurora-blob" />
                <div className="aurora-blob" />
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-[100] glass-strong py-3 shadow-lg shadow-black/20">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-0.5">
                        <span className="font-[family-name:var(--font-orbitron)] font-bold text-sm tracking-[0.25em] text-white">
                            R<span className="text-[var(--accent)]">ITTISH</span>
                        </span>
                        <span className="text-[var(--muted)] mx-0.5">.</span>
                        <span className="font-[family-name:var(--font-orbitron)] font-bold text-sm text-[var(--accent2)]">G</span>
                    </Link>
                    <Link
                        href="/#projects"
                        className="font-[family-name:var(--font-jetbrains)] text-[0.7rem] tracking-[0.12em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                    >
                        ← Back to Portfolio
                    </Link>
                </div>
            </nav>

            {/* ═══ HERO ═══ */}
            <section className="min-h-[85vh] flex items-center pt-24 pb-12 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-[family-name:var(--font-jetbrains)] text-[0.7rem] tracking-[0.3em] text-[var(--muted)] uppercase mb-3"
                    >
                        PROJECT_{project.num}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.62rem] font-[family-name:var(--font-jetbrains)] tracking-[0.16em] uppercase text-[var(--accent)] border border-[var(--border)] bg-[rgba(0,229,255,0.04)] mb-5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)] animate-pulse" />
                        {project.category}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="font-[family-name:var(--font-orbitron)] font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white mb-4"
                    >
                        {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="glow-accent">{project.title.split(" ").pop()}</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="font-[family-name:var(--font-jetbrains)] text-[0.72rem] tracking-[0.14em] uppercase text-[var(--accent2)] mb-5"
                    >
                        {project.subtitle}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                        className="text-[var(--muted)] text-base md:text-lg leading-relaxed max-w-2xl mb-8"
                    >
                        {project.tagline}
                    </motion.p>

                    {/* Meta Chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex flex-wrap gap-3 mb-8"
                    >
                        {project.meta.map((m) => (
                            <div key={m.label} className="bento-card flex items-center gap-3 px-4 py-3">
                                <span className="text-xl">{m.icon}</span>
                                <div>
                                    <div className="font-[family-name:var(--font-jetbrains)] text-[0.55rem] tracking-[0.14em] uppercase text-[var(--muted)]">
                                        {m.label}
                                    </div>
                                    <div className="text-sm font-bold text-white">{m.value}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85 }}
                    >
                        <Link
                            href="/#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-[family-name:var(--font-orbitron)] font-bold tracking-[0.18em] uppercase text-white border border-[var(--border)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
                        >
                            ← All Projects
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══ OVERVIEW ═══ */}
            <Section>
                <SectionHeader label="System Overview" title="Project" glow="Overview" />
                <div className="grid md:grid-cols-[1.1fr_1fr] gap-12">
                    <div className="space-y-5">
                        {project.overview.map((p, i) => (
                            <p key={i} className="text-[var(--muted)] text-[0.95rem] leading-[1.85]">
                                {p}
                            </p>
                        ))}
                        <div className="flex flex-wrap gap-2 pt-4">
                            {project.tags.map((tag) => {
                                const c = tagColors[tag.color];
                                return (
                                    <span key={tag.label} className="tag-chip" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                                        {tag.label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {project.stats.map((s) => (
                            <div key={s.value} className="bento-card p-5 relative overflow-hidden">
                                <div
                                    className="font-[family-name:var(--font-orbitron)] font-black text-xl md:text-2xl mb-2"
                                    style={{
                                        color: s.color === "accent2" ? "#a78bfa" : s.color === "accent3" ? "#34d399" : "var(--accent)",
                                        textShadow: `0 0 20px ${s.color === "accent2" ? "rgba(124,58,237,0.3)" : s.color === "accent3" ? "rgba(16,185,129,0.3)" : "rgba(0,229,255,0.3)"}`,
                                    }}
                                >
                                    {s.value}
                                </div>
                                <div className="text-[var(--muted)] text-[0.82rem] leading-relaxed">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ═══ ARCHITECTURE ═══ */}
            <Section bg>
                <SectionHeader label="System Architecture" title="Data" glow="Flow" />
                <div className="flex items-center justify-center flex-wrap gap-0 py-8 px-4 md:px-8 bento-card">
                    {project.architecture.map((node, i) => (
                        <div key={node.name} className="flex items-center">
                            <div
                                className={`text-center px-4 py-4 min-w-[110px] border rounded-lg transition-all ${node.highlight
                                        ? "border-[var(--accent)] shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                                        : "border-[var(--border)]"
                                    } bg-[var(--card)]`}
                                style={
                                    node.color === "accent2"
                                        ? { borderColor: "rgba(124,58,237,0.3)", boxShadow: "0 0 20px rgba(124,58,237,0.1)" }
                                        : {}
                                }
                            >
                                <span className="text-2xl block mb-2">{node.icon}</span>
                                <div
                                    className="font-[family-name:var(--font-orbitron)] text-[0.62rem] font-bold tracking-[0.1em]"
                                    style={{ color: node.highlight ? (node.color === "accent2" ? "#a78bfa" : "var(--accent)") : "var(--text)" }}
                                >
                                    {node.name}
                                </div>
                                <div className="font-[family-name:var(--font-jetbrains)] text-[0.5rem] text-[var(--muted)] mt-1">
                                    {node.sub}
                                </div>
                            </div>
                            {i < project.architecture.length - 1 && (
                                <span className="text-[var(--accent)] text-lg px-3 opacity-50">→</span>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center font-[family-name:var(--font-jetbrains)] text-[0.65rem] text-[var(--muted)] tracking-[0.12em] mt-4">
                    {project.archNote}
                </p>
            </Section>

            {/* ═══ FEATURES ═══ */}
            <Section>
                <SectionHeader label="Core Capabilities" title="Key" glow="Features" />
                <div className="grid sm:grid-cols-2 gap-5">
                    {project.features.map((feat, i) => {
                        const ref = useRef(null);
                        const inView = useInView(ref, { once: true, margin: "-60px" });
                        return (
                            <motion.div
                                key={feat.title}
                                ref={ref}
                                initial={{ opacity: 0, y: 25 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bento-card p-6 group"
                            >
                                <span className="text-2xl block mb-3" style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.3))" }}>
                                    {feat.icon}
                                </span>
                                <h3 className="font-[family-name:var(--font-orbitron)] text-[0.78rem] font-bold tracking-[0.08em] text-white mb-3">
                                    {feat.title}
                                </h3>
                                <p className="text-[var(--muted)] text-[0.88rem] leading-[1.7]">{feat.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>

            {/* ═══ OUTCOMES ═══ */}
            <Section bg>
                <SectionHeader label="Results" title="Project" glow="Outcomes" />
                <div className="grid sm:grid-cols-2 gap-4">
                    {project.outcomes.map((outcome, i) => {
                        const ref = useRef(null);
                        const inView = useInView(ref, { once: true, margin: "-50px" });
                        return (
                            <motion.div
                                key={i}
                                ref={ref}
                                initial={{ opacity: 0, x: -15 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex gap-4 items-start p-5 bento-card"
                            >
                                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--accent)] shrink-0 shadow-[0_0_8px_var(--accent)]" />
                                <p className="text-[var(--muted)] text-[0.9rem] leading-[1.65]">{outcome}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>

            {/* ═══ NAVIGATION ═══ */}
            <section className="py-12 border-t border-[var(--border)]">
                <div className="max-w-5xl mx-auto px-6 flex justify-between items-center flex-wrap gap-4">
                    {prevSlug ? (
                        <Link
                            href={`/projects/${prevSlug}`}
                            className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                        >
                            ← {projectsData[prevSlug].title}
                        </Link>
                    ) : <div />}
                    <Link
                        href="/#projects"
                        className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.15em] text-[var(--accent)] hover:text-white transition-colors"
                    >
                        All Projects
                    </Link>
                    {nextSlug ? (
                        <Link
                            href={`/projects/${nextSlug}`}
                            className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                        >
                            {projectsData[nextSlug].title} →
                        </Link>
                    ) : <div />}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-10 text-center border-t border-[var(--border)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                <p className="font-[family-name:var(--font-jetbrains)] text-[0.65rem] tracking-[0.12em] text-[var(--muted)]">
                    <span className="text-[var(--accent)]">RITTISH G</span> · {project.title} · EEE &apos;27 · Sri Eshwar College of Engineering
                </p>
            </footer>
        </div>
    );
}
