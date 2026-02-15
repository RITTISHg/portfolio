"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import AiChat from "./components/AiChat";

const CustomCursor = dynamic(() => import("./components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative grain">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
      </div>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Achievements />
      <div className="section-divider" />
      <Contact />
      <Footer />
      <AiChat />
    </main>
  );
}
