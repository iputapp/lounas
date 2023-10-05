"use client";

import { motion } from "framer-motion";

import styles from "./styles.module.scss";

interface LoadingLayerProps {
  working?: boolean;
}

export function LoadingLayer({ working = true }: LoadingLayerProps) {
  return (
    <div
      className={styles.overlay + `${working ? " visible opacity-100" : " invisible opacity-0"}`}
    >
      <motion.svg
        width="227"
        height="256"
        viewBox="0 0 227 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="156"
          cy="185"
          r="68"
          stroke="url(#paint0_linear_21_12)"
          strokeWidth="6"
          strokeLinejoin="round"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
          }}
        />
        <motion.rect
          x="3"
          y="3"
          width="81"
          height="250"
          rx="40.5"
          stroke="#0014FF"
          strokeWidth="6"
          strokeLinejoin="round"
          initial={{ pathLength: 0, pathSpacing: 0.5 }}
          animate={{ pathLength: 1, pathSpacing: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
          }}
          style={{ rotate: 180, scaleX: -1 }}
        />
        <defs>
          <linearGradient
            id="paint0_linear_21_12"
            x1="127.5"
            y1="156.5"
            x2="227"
            y2="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0014FF" />
            <stop offset="1" stopColor="#2AF598" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
