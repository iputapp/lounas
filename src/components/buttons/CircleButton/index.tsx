"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";

import styles from "./styles.module.scss";

type CircleProps = {
  title: string;
  value: string;
  size: number;
  x: number;
  y: number;
  gradient?: {
    start: string;
    end: string;
    direction: number;
  };
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  constraintsRef: React.MutableRefObject<null>;
};

/**
 *
 * @param {string} title Title of the circle
 * @param {number} size Size of the circle in `rem`
 * @param {number} x Horizontal position of the circle `0` to `100` (converted to `%`)
 * @param {number} y Vertical position of the circle `0` to `100` (converted to `%`)
 * @param {string} gradient.start Start color of the gradient (default `#f5576c`)
 * @param {string} gradient.end End color of the gradient (default `#f093fb`)
 * @param {number} gradient.direction Direction of the gradient in degrees (default `180`)
 * @param {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void} onClick Function to be called when the circle is clicked
 *    `(React.MouseEvent<HTMLButtonElement, MouseEvent>) => void`
 */
export function Circle({
  title,
  value,
  size,
  x = 0,
  y = 0,
  gradient = {
    start: "#f5576c",
    end: "#f093fb",
    direction: 180,
  },
  onClick,
  constraintsRef,
}: CircleProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    /** set styles */
    setStyle({
      width: `${size}rem`,
      fontSize: `${size / 4}rem`,
      background: `linear-gradient(${gradient.direction}deg, ${gradient.start}, ${gradient.end})`,
    });
  }, [size, gradient]);

  return (
    <motion.button
      initial={{ scale: 0, x: `calc(100% - ${size / 2}rem)`, y: `calc(100% - ${size / 2}rem)` }}
      animate={{ scale: 1, x: `calc(100% - ${size / 2}rem)`, y: `calc(100% - ${size / 2}rem)` }}
      exit={{ scale: 0 }}
      transition={{
        delay: Math.random(),
        type: "spring",
        stiffness: 50,
        damping: 8,
      }}
      drag={true}
      dragConstraints={constraintsRef}
      dragTransition={{
        bounceStiffness: 100,
        bounceDamping: 10,
        power: 0.75,
      }}
      // onDrag={(event, info) => console.log(info.point.y, info.point.y)}
      className={styles.circle}
      style={style}
      onClick={(e) => onClick(e)}
      value={value}
    >
      <span className={styles.title}>{title}</span>
    </motion.button>
  );
}
