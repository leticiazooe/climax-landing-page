"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "up" | "left" | "right";
  immediate?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 18,
  direction = "up",
  immediate = false,
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const hidden =
    direction === "left"
      ? { opacity: 0, x: -distance }
      : direction === "right"
        ? { opacity: 0, x: distance }
        : { opacity: 0, y: distance };
  const visible = { opacity: 1, x: 0, y: 0 };
  const transition = { duration: 0.55, delay, ease };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={reducedMotion ? false : hidden}
        animate={visible}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.24 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
