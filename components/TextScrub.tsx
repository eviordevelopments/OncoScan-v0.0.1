"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextScrubProps {
  text: string;
  className?: string;
  theme?: "dark" | "light";
}

export function TextScrub({ text, className = "", theme = "dark" }: TextScrubProps) {
  const elementRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <p ref={elementRef} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + 1.2 / words.length, 1);
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            theme={theme}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  theme,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  theme: "dark" | "light";
}) {
  const minOpacity = theme === "dark" ? 0.18 : 0.15;
  const opacity = useTransform(progress, range, [minOpacity, 1.0]);
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block transition-opacity duration-75 ${textColor}`}
    >
      {word}
    </motion.span>
  );
}
