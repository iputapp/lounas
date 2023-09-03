"use client";

import styles from "./styles.module.scss";

type CircleProps = {
  title: string;
  size: number;
  posX: "left" | "right";
  posY: "top" | "bottom";
  x: number;
  y: number;
  gradientColorStart?: string;
  gradientColorEnd?: string;
  gradientDirection?: number;
  onClick?: () => void;
};

/**
 *
 * @param {string} title Title of the circle
 * @param {number} size Size of the circle
 * @param {"left" | "right"} posX Position of the circle - `left` or `right`
 * @param {"top" | "bottom"} posY Position of the circle - `top` or `bottom`
 * @param {number} x Position from `posX`
 * @param {number} y Position from `posY`
 * @param {string} gradientColorStart Start color of the gradient - Default `#f5576c`
 * @param {string} gradientColorEnd End color of the gradient - Default `#f093fb`
 * @param {number} gradientDirection Direction of the gradient - Default `180deg`
 * @param {() => void} onClick Function to be called when the circle is clicked
 */
export function Circle({
  title,
  size,
  posX,
  posY,
  x = 0,
  y = 0,
  gradientColorStart = "#f5576c",
  gradientColorEnd = "#f093fb",
  gradientDirection = 180,
  onClick,
}: CircleProps) {
  const gradient = `linear-gradient(${gradientDirection}deg, ${gradientColorStart}, ${gradientColorEnd})`;

  let style;

  if (posY === "top" && posX === "left") {
    style = { top: `${y}rem`, left: `${x}rem`, width: `${size}rem`, background: gradient };
  }
  if (posY === "top" && posX === "right") {
    style = { top: `${y}rem`, right: `${x}rem`, width: `${size}rem`, background: gradient };
  }
  if (posY === "bottom" && posX === "left") {
    style = { bottom: `${y}rem`, left: `${x}rem`, width: `${size}rem`, background: gradient };
  }
  if (posY === "bottom" && posX === "right") {
    style = { bottom: `${y}rem`, right: `${x}rem`, width: `${size}rem`, background: gradient };
  }

  return (
    <button className={styles.circle} style={style} onClick={onClick}>
      <span className={styles.title} style={{ fontSize: `${size * 0.2}rem` }}>
        {title}
      </span>
    </button>
  );
}
