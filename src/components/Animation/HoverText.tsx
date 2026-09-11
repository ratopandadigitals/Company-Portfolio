"use client";

import { cn } from "@/lib/utils";
import {
    type AnimationOptions,
    motion,
    stagger,
    useAnimate,
} from "framer-motion";
import { useCallback, useState } from "react";

interface LetterCascadeProps {
    /** The text to animate */
    text: string;
    /** Additional CSS classes for the container */
    className?: string;
    /** CSS classes applied to each individual letter */
    letterClassName?: string;
    /** Optional custom token/classes for the front face (defaults to text-heading) */
    frontClassName?: string;
    /** Optional custom token/classes for the echo face (defaults to text-primary brand crimson) */
    echoClassName?: string;
    /** Stagger delay between each letter in seconds */
    staggerDuration?: number;
    /** Where the stagger wave originates */
    staggerFrom?: "first" | "last" | "center" | number;
    /** Spring stiffness — higher = snappier */
    stiffness?: number;
    /** Spring damping — lower = bouncier */
    damping?: number;
    /** Trigger the animation on click instead of hover */
    triggerOnClick?: boolean;
    /** Callback when the full animation cycle completes */
    onComplete?: () => void;
}

export function LetterCascade({
    text,
    className,
    letterClassName,
    frontClassName,
    echoClassName,
    staggerDuration = 0.04,
    staggerFrom = "first",
    stiffness = 220,
    damping = 16,
    triggerOnClick = false,
    onComplete,
}: LetterCascadeProps) {
    const [scope, animate] = useAnimate();
    const [blocked, setBlocked] = useState(false);

    const trigger = useCallback(() => {
        if (blocked) return;
        setBlocked(true);

        const merge = (base: AnimationOptions): AnimationOptions => ({
            ...base,
            delay: stagger(staggerDuration, { from: staggerFrom }),
        });

        const spring: AnimationOptions = {
            type: "spring",
            stiffness,
            damping,
        };

        // ── Phase 1: front tilts back, echo flips in from below ──
        animate(
            ".cascade-front",
            {
                rotateX: 90,
                opacity: 0,
                y: -6,
                filter: "blur(4px)",
            },
            merge(spring)
        ).then(() => {
            // Instantly reset front
            animate(
                ".cascade-front",
                { rotateX: 0, opacity: 1, y: 0, filter: "blur(0px)" },
                { duration: 0 }
            ).then(() => {
                setBlocked(false);
                onComplete?.();
            });
        });

        animate(
            ".cascade-echo",
            {
                rotateX: 0,
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
            },
            merge(spring)
        ).then(() => {
            // Instantly reset echo
            animate(
                ".cascade-echo",
                {
                    rotateX: -90,
                    opacity: 0,
                    y: 6,
                    scale: 0.8,
                    filter: "blur(4px)",
                },
                { duration: 0 }
            );
        });
    }, [
        blocked,
        animate,
        staggerDuration,
        staggerFrom,
        stiffness,
        damping,
        onComplete,
    ]);

    return (
        <span
            ref={scope}
            className={cn(
                "inline-flex cursor-pointer select-none items-baseline justify-center font-secondary leading-none pointer-events-auto",
                className
            )}
            {...(triggerOnClick ? { onClick: trigger } : { onMouseEnter: trigger })}
            aria-label={text}
        >
            {text.split("").map((letter, i) => (
                <span
                    key={i}
                    className="relative inline-flex items-center justify-center whitespace-pre leading-none"
                    style={{ perspective: "500px" }}
                >
                    {/* Front face — dynamic inheritance */}
                    <motion.span
                        className={cn(
                            "cascade-front inline-block leading-none text-inherit",
                            letterClassName,
                            frontClassName
                        )}
                        style={{
                            rotateX: 0,
                            y: 0,
                            transformOrigin: "bottom center",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>

                    {/* Echo face — brand crimson */}
                    <motion.span
                        className={cn(
                            "cascade-echo absolute inset-0 inline-flex items-center justify-center leading-none text-primary",
                            letterClassName,
                            echoClassName
                        )}
                        style={{
                            rotateX: -90,
                            opacity: 0,
                            y: 6,
                            scale: 0.8,
                            filter: "blur(4px)",
                            transformOrigin: "top center",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}