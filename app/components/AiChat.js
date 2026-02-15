"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   RITTISH G — AI KNOWLEDGE BASE
   Complete profile data for the chatbot
   ═══════════════════════════════════════════════════════ */

const PROFILE = {
    name: "Rittish G",
    role: "EEE Engineer & IoT Innovator",
    college: "Sri Eshwar College of Engineering (SECE)",
    degree: "B.E in Electrical & Electronics Engineering",
    batch: "2023–2027",
    year: "3rd Year (5th Semester)",
    cgpa: "7.84",
    hsc: "92%",
    sslc: "90%",
    email: "rittish.g2023eee@sece.ac.in",
    linkedin: "linkedin.com/in/rittishg",
    github: "github.com/rittishg",
    location: "Tamil Nadu, India",
    interests: [
        "Embedded Systems",
        "IoT Solutions",
        "Industrial Automation",
        "Aerospace Design",
        "Smart Energy Systems",
        "Power Systems",
    ],
    bio: "I am a 3rd year Electrical & Electronics Engineering student at Sri Eshwar College of Engineering. I build intelligent embedded systems, IoT solutions, and bridge the gap between hardware and software to create tomorrow's automation.",
};

const SKILLS = {
    programming: [
        { name: "Embedded C / C++", level: "Advanced", detail: "Core programming language for microcontrollers and embedded systems development" },
        { name: "Python", level: "Intermediate-Advanced", detail: "Used for scripting, automation, and machine learning applications" },
        { name: "Visual Basic", level: "Intermediate", detail: "Desktop application development" },
    ],
    microcontrollers: [
        { name: "ESP32 / ESP8266", level: "Expert", detail: "WiFi-enabled microcontrollers for IoT applications" },
        { name: "Arduino (Uno / IDE)", level: "Expert", detail: "Prototyping and embedded systems development" },
        { name: "Node MCU", level: "Advanced", detail: "IoT development platform" },
    ],
    automation: [
        { name: "SCADA Systems", level: "Advanced", detail: "Industrial supervisory control and data acquisition" },
        { name: "PLC / Ladder Logic", level: "Advanced", detail: "Programmable Logic Controller programming for industrial control" },
        { name: "HMI Design", level: "Intermediate", detail: "Human-Machine Interface design for industrial systems" },
    ],
    design: [
        { name: "MATLAB", level: "Advanced", detail: "Simulation and mathematical computing" },
        { name: "Blender / CAD", level: "Advanced", detail: "3D modeling and computer-aided design" },
        { name: "Firebase / Blynk", level: "Advanced", detail: "Cloud platforms and IoT dashboards" },
    ],
};

const PROJECTS = [
    {
        name: "Smart Cloud Control",
        description: "Interactive web-dashboard for real-time device monitoring & control. ESP8266 WiFi module integrated with sensors for automated device triggering. Firebase backend with ThinkSpeak analytics.",
        tech: ["ESP8266", "Firebase", "IoT", "Embedded C", "ThinkSpeak"],
        type: "Embedded Systems & IoT Development",
    },
    {
        name: "ESP8266 Two Way Communication",
        description: "Bidirectional communication system between multiple ESP8266 microcontroller boards. Custom data transfer protocol for reliable inter-board communication and autonomous automation control.",
        tech: ["ESP8266", "Firmware", "Embedded C", "Automation"],
        type: "Embedded Systems & Automation",
    },
    {
        name: "Shore Energy",
        description: "Led cross-functional team designing eco-friendly energy systems. Achieved 60% reduction in energy costs through novel mechanical methods. Integrated real-time sensor monitoring systems.",
        tech: ["Sustainability", "Mechanical Design", "Sensors"],
        type: "Sustainable Energy Development & Mechanical",
        role: "Team Lead",
    },
    {
        name: "Night Hawack F-117",
        description: "Engineered RC airplane using MATLAB simulation and Blender CAD modeling. Optimized aeronautical design achieving 30 km/hr top speed with 5 kg payload capacity and autonomous flight control.",
        tech: ["MATLAB", "CAD/Blender", "Aerospace", "Payload Design"],
        type: "AeroSpace Design & Mechanical Engineering",
        role: "Designer",
    },
];

const ACHIEVEMENTS = [
    { title: "Makers Arena Winner", detail: "Won 24-Hour Hackathon at AIC Raise 2025. Demonstrated Engineering Design, System Integration, and Embedded C proficiency.", year: "2025" },
    { title: "NASA Global Nominee", detail: "Global Nominee in NASA Space Apps Challenge 2025 for IoT/IIoT and Smart Energy Systems project.", year: "2025" },
    { title: "Cipher Thon — Top 5", detail: "Top 5 Finalist out of 1500 participants in National Level Cipher Thon (2023). Showcased problem-solving and system integration skills.", year: "2023" },
    { title: "IIT Shastra Finalist", detail: "Top 30 Finalist in IIT Shastra Drone Modelling Competition (2023). Applied Mechanical Design, Payload Design, and Aeronautical Engineering.", year: "2023" },
    { title: "Garuda National Hackathon", detail: "Participant in Garuda National Hackathon (CAPE). National-level competition showcasing Automation Systems and Mechanical Design expertise.", year: "" },
    { title: "Academic Excellence", detail: "HSC 92% · SSLC 90% — Consistent academic performance with 7.84 CGPA through 5th semester.", year: "" },
];

const EXPERIENCE = [
    {
        title: "Industrial Automation & Electrical Maintenance",
        org: "TNEB — Tamil Nadu Electricity Board",
        year: "2025",
        detail: "Hands-on experience with power distribution infrastructure, SCADA systems, protective relays, distribution transformer testing, metering systems, and electrical safety protocols used in utility-grade power networks.",
    },
    {
        title: "Power Plant Operations & Maintenance Training",
        org: "TTPS — Tuticorin Thermal Power Plant",
        year: "2024",
        detail: "Studied thermal power generation processes, boiler operations, cooling systems, and preventive maintenance strategies. Gained deep exposure to mechanical systems and safety systems in large-scale industrial environments.",
    },
];

/* ═══════════════════════════════════════════════════════
   INTENT MATCHING ENGINE
   Pattern-based response system
   ═══════════════════════════════════════════════════════ */

const INTENTS = [
    {
        patterns: [/\b(who|tell).*(about|is|are).*(?:you|rittish|him)/i, /^who.*rittish/i, /introduce/i, /\babout\b/i, /\bwho\b.*\byou\b/i, /^hi$|^hello$|^hey$/i, /^about$/i],
        response: () =>
            `👋 Hi! I'm the AI assistant for **${PROFILE.name}** — ${PROFILE.role}.\n\n${PROFILE.bio}\n\n📍 Based in ${PROFILE.location}\n📧 ${PROFILE.email}\n🔗 [LinkedIn](https://${PROFILE.linkedin})`,
    },
    {
        patterns: [/\b(name)\b/i],
        response: () => `His name is **${PROFILE.name}**. He's an ${PROFILE.role} currently in his ${PROFILE.year} at ${PROFILE.college}.`,
    },
    {
        patterns: [/\b(college|university|school|institution|study|studying|education|degree|branch|department)\b/i, /where.*(study|learn|go)/i],
        response: () =>
            `🎓 **Education:**\n\n• **${PROFILE.degree}** at **${PROFILE.college}**\n• Batch: ${PROFILE.batch} (Currently ${PROFILE.year})\n• CGPA: **${PROFILE.cgpa}** (5th Semester)\n• HSC: ${PROFILE.hsc} | SSLC: ${PROFILE.sslc}`,
    },
    {
        patterns: [/\b(cgpa|gpa|grade|marks|score|percentage|academic)\b/i],
        response: () =>
            `📊 **Academic Performance:**\n\n• Current CGPA: **${PROFILE.cgpa}** (5th Semester)\n• HSC (12th): **${PROFILE.hsc}**\n• SSLC (10th): **${PROFILE.sslc}**\n\nRittish maintains consistent academic performance while actively participating in hackathons, competitions, and hands-on projects.`,
    },
    {
        patterns: [/\b(skill|tech|stack|know|proficien|expert|can.*do|capable|tools?)\b/i, /what.*(know|can|do)/i],
        response: () => {
            let msg = `🛠️ **Technical Skills:**\n\n`;
            msg += `**⚡ Programming:** ${SKILLS.programming.map((s) => `${s.name} (${s.level})`).join(", ")}\n\n`;
            msg += `**🔧 Microcontrollers & IoT:** ${SKILLS.microcontrollers.map((s) => `${s.name} (${s.level})`).join(", ")}\n\n`;
            msg += `**⚙️ Automation & Control:** ${SKILLS.automation.map((s) => `${s.name} (${s.level})`).join(", ")}\n\n`;
            msg += `**📐 CAD & Design:** ${SKILLS.design.map((s) => `${s.name} (${s.level})`).join(", ")}`;
            return msg;
        },
    },
    {
        patterns: [/\b(project|work|build|built|made|create|develop)\b/i, /what.*(built|made|done|worked)/i],
        response: () => {
            let msg = `🔬 **Rittish's Projects (${PROJECTS.length}):**\n\n`;
            PROJECTS.forEach((p, i) => {
                msg += `**${i + 1}. ${p.name}**\n${p.description}\n🏷 *${p.tech.join(", ")}*\n\n`;
            });
            return msg.trim();
        },
    },
    {
        patterns: [/\b(smart\s*cloud|cloud\s*control|dashboard|firebase|thinkspeak)\b/i],
        response: () => {
            const p = PROJECTS[0];
            return `📡 **${p.name}**\n*${p.type}*\n\n${p.description}\n\n🏷 Tech: ${p.tech.join(", ")}`;
        },
    },
    {
        patterns: [/\b(two\s*way|bidirection|esp.*comm|inter.*board)\b/i],
        response: () => {
            const p = PROJECTS[1];
            return `📡 **${p.name}**\n*${p.type}*\n\n${p.description}\n\n🏷 Tech: ${p.tech.join(", ")}`;
        },
    },
    {
        patterns: [/\b(shore|energy|sustainable|eco|green)\b/i],
        response: () => {
            const p = PROJECTS[2];
            return `🌿 **${p.name}** (Role: ${p.role})\n*${p.type}*\n\n${p.description}\n\n🏷 Tech: ${p.tech.join(", ")}`;
        },
    },
    {
        patterns: [/\b(f-?117|night\s*hawk|airplane|rc\s*plane|drone|aero|flight)\b/i],
        response: () => {
            const p = PROJECTS[3];
            return `✈️ **${p.name}** (Role: ${p.role})\n*${p.type}*\n\n${p.description}\n\n🏷 Tech: ${p.tech.join(", ")}`;
        },
    },
    {
        patterns: [/\b(achieve|award|win|won|prize|recognition|hackathon|competition|contest)\b/i],
        response: () => {
            let msg = `🏆 **Awards & Achievements:**\n\n`;
            ACHIEVEMENTS.forEach((a) => {
                msg += `• **${a.title}**${a.year ? ` (${a.year})` : ""} — ${a.detail}\n\n`;
            });
            return msg.trim();
        },
    },
    {
        patterns: [/\b(nasa)\b/i],
        response: () => `🚀 **NASA Space Apps Challenge 2025** — Rittish was a **Global Nominee** for his IoT/IIoT and Smart Energy Systems project. This is a prestigious international challenge organized by NASA.`,
    },
    {
        patterns: [/\b(maker|aic|raise)\b/i],
        response: () => `🏆 **Makers Arena Winner** — Rittish won the 24-Hour Hackathon at AIC Raise 2025, demonstrating Engineering Design, System Integration, and Embedded C proficiency.`,
    },
    {
        patterns: [/\b(cipher|thon)\b/i],
        response: () => `⚡ **Cipher Thon** — Rittish was a Top 5 Finalist out of 1500 participants in the National Level Cipher Thon (2023), showcasing problem-solving and system integration skills.`,
    },
    {
        patterns: [/\b(experience|training|internship|industrial|work\s*experience|tneb|ttps|power\s*plant)\b/i],
        response: () => {
            let msg = `💼 **Industrial Experience:**\n\n`;
            EXPERIENCE.forEach((e) => {
                msg += `**${e.title}** (${e.year})\n📍 ${e.org}\n${e.detail}\n\n`;
            });
            msg += `He currently holds **${EXPERIENCE.length} industrial training certifications**.`;
            return msg;
        },
    },
    {
        patterns: [/\b(contact|reach|email|mail|connect|phone|linkedin|github|social)\b/i, /how.*(reach|contact|connect)/i],
        response: () =>
            `📬 **Contact Rittish:**\n\n• ✉️ Email: **${PROFILE.email}**\n• 💼 LinkedIn: **[${PROFILE.linkedin}](https://${PROFILE.linkedin})**\n• 🔗 GitHub: **[${PROFILE.github}](https://${PROFILE.github})**\n\nFeel free to reach out for collaborations, projects, or opportunities!`,
    },
    {
        patterns: [/\b(interest|passion|love|enjoy|hobby|like)\b/i, /what.*(interest|passion|into)/i],
        response: () =>
            `💡 **Rittish's Interests & Passions:**\n\n${PROFILE.interests.map((i) => `• ${i}`).join("\n")}\n\nHe's particularly passionate about bridging hardware and software to create intelligent automation systems.`,
    },
    {
        patterns: [/\b(esp|esp8266|esp32|wifi|microcontroller|mcu)\b/i],
        response: () =>
            `📡 **ESP8266 / ESP32 Expertise:**\n\nRittish is an **Expert** in ESP32/ESP8266 WiFi microcontrollers. He has used them extensively in:\n\n• **Smart Cloud Control** — Real-time device monitoring via web dashboard\n• **Two Way Communication** — Bidirectional inter-board communication protocol\n• Various IoT projects integrating Firebase, Blynk, and ThinkSpeak\n\nHe's proficient in firmware development and wireless protocol implementation.`,
    },
    {
        patterns: [/\b(arduino)\b/i],
        response: () =>
            `🔌 **Arduino Expertise:**\n\nRittish is an **Expert** with Arduino platforms. He uses Arduino Uno and the Arduino IDE for rapid prototyping, embedded systems development, and sensor integration in his IoT projects.`,
    },
    {
        patterns: [/\b(python)\b/i],
        response: () =>
            `🐍 **Python Skills:**\n\nRittish has **Intermediate-Advanced** proficiency in Python. He uses it for:\n• Scripting and automation\n• Machine learning applications\n• Data analysis and rapid prototyping`,
    },
    {
        patterns: [/\b(matlab)\b/i],
        response: () =>
            `📊 **MATLAB:**\n\nRittish has **Advanced** MATLAB skills. He used it for simulation work on the Night Hawack F-117 RC airplane project — running aeronautical simulations to optimize the design for speed and payload capacity.`,
    },
    {
        patterns: [/\b(scada|plc|hmi|ladder)\b/i],
        response: () =>
            `⚙️ **Industrial Automation Skills:**\n\n• **SCADA Systems** (Advanced) — Industrial supervisory control learned during TNEB training\n• **PLC / Ladder Logic** (Advanced) — Programmable Logic Controller programming\n• **HMI Design** (Intermediate) — Human-Machine Interface design\n\nThese were strengthened during his industrial training at TNEB and TTPS.`,
    },
    {
        patterns: [/\b(iot|internet\s*of\s*things|smart|sensor|blynk|cloud)\b/i],
        response: () =>
            `🌐 **IoT & Smart Systems:**\n\nRittish specializes in IoT solutions including:\n• ESP8266/ESP32 WiFi microcontrollers\n• Firebase & Blynk cloud platforms\n• ThinkSpeak analytics\n• Real-time sensor monitoring\n• Automated device control via web dashboards\n\nHis Smart Cloud Control project is a prime example of end-to-end IoT implementation.`,
    },
    {
        patterns: [/\b(resume|cv|hire|hiring|job|opportunity|intern|collaborate)\b/i],
        response: () =>
            `📄 **Looking to connect with Rittish?**\n\nHe is open to:\n• Internship opportunities\n• Research collaborations\n• Project partnerships\n• Hackathon teams\n\n📧 Reach out: **${PROFILE.email}**\n💼 LinkedIn: **[${PROFILE.linkedin}](https://${PROFILE.linkedin})**\n\nHis strengths: Embedded Systems, IoT, Industrial Automation & Aerospace Design.`,
    },
    {
        patterns: [/\b(thank|thanks|thx)\b/i],
        response: () => `You're welcome! 😊 Feel free to ask me anything else about Rittish. I'm here to help!`,
    },
    {
        patterns: [/\b(bye|goodbye|see\s*you|later)\b/i],
        response: () => `Goodbye! 👋 Thanks for learning about Rittish. Feel free to come back anytime or reach out to him directly at **${PROFILE.email}**!`,
    },
    {
        patterns: [/\b(help|what.*can.*ask|what.*know)\b/i],
        response: () =>
            `🤖 **I can answer questions about Rittish G, such as:**\n\n• 🎓 Education & academics\n• 🛠️ Technical skills\n• 🔬 Projects (Smart Cloud, ESP Comm, Shore Energy, F-117)\n• 🏆 Awards & achievements\n• 💼 Industrial experience & training\n• 📬 Contact information\n• 💡 Interests & passions\n• And more!\n\nJust type your question and I'll help! 😊`,
    },
];

const FALLBACK_RESPONSES = [
    `🤔 I'm specifically designed to answer questions about **Rittish G** — his education, skills, projects, achievements, and experience. Could you rephrase your question about him?`,
    `I'm Rittish's personal AI assistant, so I can only help with questions about him! Try asking about his **skills**, **projects**, **achievements**, or **background**. 😊`,
    `That's outside my scope! I'm here to tell you all about **Rittish G**. Ask me about his **engineering projects**, **technical skills**, or **achievements**!`,
];

function getResponse(input) {
    const cleaned = input.toLowerCase().trim();
    if (!cleaned) return "Please type a question about Rittish! 😊";

    for (const intent of INTENTS) {
        for (const pattern of intent.patterns) {
            if (pattern.test(cleaned)) {
                return intent.response();
            }
        }
    }

    // Fuzzy keyword matching fallback
    const keywords = cleaned.split(/\s+/);
    const allSkillNames = [...SKILLS.programming, ...SKILLS.microcontrollers, ...SKILLS.automation, ...SKILLS.design].map(s => s.name.toLowerCase());
    const matchedSkill = allSkillNames.find(s => keywords.some(k => s.includes(k) && k.length > 2));
    if (matchedSkill) {
        const allSkills = [...SKILLS.programming, ...SKILLS.microcontrollers, ...SKILLS.automation, ...SKILLS.design];
        const skill = allSkills.find(s => s.name.toLowerCase() === matchedSkill);
        if (skill) return `**${skill.name}** (${skill.level})\n\n${skill.detail}`;
    }

    const projectMatch = PROJECTS.find(p => keywords.some(k => p.name.toLowerCase().includes(k) && k.length > 3));
    if (projectMatch) return `🔬 **${projectMatch.name}**\n*${projectMatch.type}*\n\n${projectMatch.description}\n\n🏷 Tech: ${projectMatch.tech.join(", ")}`;

    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

/* ═══════════════════════════════════════════════════════
   CHAT UI COMPONENT
   ═══════════════════════════════════════════════════════ */

function formatMessage(text) {
    // Simple markdown-like formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline underline-offset-2 hover:text-white transition-colors">$1</a>')
        .replace(/\n/g, '<br/>');
}

const SUGGESTIONS = [
    "Who is Rittish?",
    "What are his skills?",
    "Tell me about his projects",
    "Awards & achievements",
    "How to contact him?",
];

export default function AiChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "ai",
            text: `👋 Hi! I'm **Rittish's AI Assistant**. I know everything about his education, skills, projects, and achievements.\n\nAsk me anything about him!`,
        },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, typing, scrollToBottom]);

    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open]);

    const handleSend = (text) => {
        const msg = text || input.trim();
        if (!msg) return;

        setMessages((prev) => [...prev, { role: "user", text: msg }]);
        setInput("");
        setTyping(true);

        // Simulate AI thinking delay
        const delay = 400 + Math.random() * 800;
        setTimeout(() => {
            const response = getResponse(msg);
            setTyping(false);
            setMessages((prev) => [...prev, { role: "ai", text: response }]);
        }, delay);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/30 border border-[rgba(0,229,255,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:border-[rgba(0,229,255,0.4)] group"
                style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.15))",
                    backdropFilter: "blur(20px)",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open AI Chat"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            className="text-xl text-white"
                        >
                            ✕
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="text-2xl"
                        >
                            🤖
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Pulse ring when closed */}
                {!open && (
                    <span className="absolute inset-0 rounded-full border-2 border-[var(--accent)] opacity-30" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
                )}
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed bottom-24 right-6 z-[89] w-[calc(100vw-48px)] sm:w-[400px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] shadow-2xl shadow-black/40"
                        style={{
                            background: "rgba(8,14,28,0.92)",
                            backdropFilter: "blur(32px) saturate(1.4)",
                        }}
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-3 shrink-0">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center text-sm font-bold text-white">
                                    AI
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--accent3)] rounded-full border-2 border-[rgba(8,14,28,0.92)]" />
                            </div>
                            <div>
                                <div className="font-[family-name:var(--font-orbitron)] text-[0.7rem] font-bold text-white tracking-wider">
                                    RITTISH AI
                                </div>
                                <div className="text-[0.58rem] text-[var(--accent3)] font-[family-name:var(--font-jetbrains)] tracking-wider">
                                    ● Online — Ask about Rittish
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[200px] max-h-[45vh] scrollbar-thin">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 text-[0.82rem] leading-relaxed rounded-2xl ${msg.role === "user"
                                                ? "bg-gradient-to-r from-[rgba(0,229,255,0.12)] to-[rgba(124,58,237,0.12)] border border-[rgba(0,229,255,0.15)] text-white rounded-br-md"
                                                : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[var(--text)] rounded-bl-md"
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                                    />
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {typing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="px-4 py-3 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-2xl rounded-bl-md flex gap-1.5 items-center">
                                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Suggestions (show only initially) */}
                        {messages.length <= 1 && !typing && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => handleSend(s)}
                                        className="px-3 py-1.5 text-[0.62rem] font-[family-name:var(--font-jetbrains)] tracking-wider text-[var(--accent)] border border-[rgba(0,229,255,0.15)] rounded-full bg-[rgba(0,229,255,0.04)] hover:bg-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.3)] transition-all duration-200"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.06)] shrink-0">
                            <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-2.5 focus-within:border-[rgba(0,229,255,0.2)] transition-colors duration-300">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about Rittish..."
                                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[rgba(90,114,144,0.5)]"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || typing}
                                    className="w-8 h-8 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center text-white text-sm shrink-0 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    ↑
                                </button>
                            </div>
                            <p className="text-center text-[0.5rem] text-[rgba(90,114,144,0.4)] mt-2 font-[family-name:var(--font-jetbrains)]">
                                AI trained exclusively on Rittish G&apos;s profile data
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
