"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const [hovering, setHovering] = useState(false);
    const pos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const isTouchDevice = useRef(false);

    useEffect(() => {
        isTouchDevice.current = window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;
        if (isTouchDevice.current) return;

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + "px";
                cursorRef.current.style.top = e.clientY + "px";
            }
        };

        const animate = () => {
            ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
            ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.left = ringPos.current.x + "px";
                ringRef.current.style.top = ringPos.current.y + "px";
            }
            requestAnimationFrame(animate);
        };

        document.addEventListener("mousemove", onMove);
        requestAnimationFrame(animate);

        const interactives = document.querySelectorAll(
            "a, button, [role='button'], .bento-card, .skill-orb, .timeline-card"
        );
        const enter = () => setHovering(true);
        const leave = () => setHovering(false);
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);
        });

        return () => {
            document.removeEventListener("mousemove", onMove);
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
            });
        };
    }, []);

    if (typeof window !== "undefined" && window.matchMedia?.("(hover: none)").matches) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorRef}
                className={`custom-cursor ${hovering ? "hovering" : ""}`}
            />
            <div
                ref={ringRef}
                className={`cursor-ring ${hovering ? "hovering" : ""}`}
            />
        </>
    );
}
