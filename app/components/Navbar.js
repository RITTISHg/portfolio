"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Awards", href: "#achievements" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("hero");
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = document.querySelectorAll("section[id]");
            let cur = "";
            sections.forEach((s) => {
                if (window.scrollY >= s.offsetTop - 200) cur = s.id;
            });
            if (cur) setActive(cur);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleClick = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                    ? "glass-strong py-3 shadow-lg shadow-black/20"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); handleClick("#hero"); }}
                    className="flex items-center gap-0.5"
                    whileHover={{ scale: 1.03 }}
                >
                    <span className="font-[family-name:var(--font-orbitron)] font-bold text-sm tracking-[0.25em] text-white">
                        R<span className="text-[var(--accent)]">ITTISH</span>
                    </span>
                    <span className="text-[var(--muted)] mx-0.5">.</span>
                    <span className="font-[family-name:var(--font-orbitron)] font-bold text-sm text-[var(--accent2)]">G</span>
                </motion.a>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
                                className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-jetbrains)] transition-colors duration-300 ${active === l.href.slice(1)
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--muted)] hover:text-white"
                                    }`}
                            >
                                {l.label}
                                {active === l.href.slice(1) && (
                                    <motion.span
                                        layoutId="navIndicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[var(--accent)] rounded-full"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-[110]"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-[1.5px] bg-white rounded-full origin-center"
                    />
                    <motion.span
                        animate={menuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                        className="block w-4 h-[1.5px] bg-white rounded-full"
                    />
                    <motion.span
                        animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-[1.5px] bg-white rounded-full origin-center"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[105] flex flex-col items-center justify-center gap-8"
                        style={{
                            background: "rgba(5,10,18,0.95)",
                            backdropFilter: "blur(30px)",
                        }}
                    >
                        {links.map((l, i) => (
                            <motion.a
                                key={l.href}
                                href={l.href}
                                onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: i * 0.06, duration: 0.3 }}
                                className={`text-lg tracking-[0.2em] uppercase font-[family-name:var(--font-orbitron)] font-semibold ${active === l.href.slice(1) ? "text-[var(--accent)]" : "text-white"
                                    }`}
                            >
                                {l.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
