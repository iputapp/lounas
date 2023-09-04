"use client";

import { useLayoutEffect, useState } from "react";

import styles from "./styles.module.scss";

type CircleProps = {
  title: string;
  size: number;
  x: number;
  y: number;
  gradientColorStart?: string;
  gradientColorEnd?: string;
  gradientDirection?: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/**
 *
 * @param {string} title Title of the circle
 * @param {number} size Size of the circle in `rem`
 * @param {number} x Horizontal position of the circle `0` to `100` (converted to `%`)
 * @param {number} y Vertical position of the circle `0` to `100` (converted to `%`)
 * @param {string} gradientColorStart Start color of the gradient (default `#f5576c`)
 * @param {string} gradientColorEnd End color of the gradient (default `#f093fb`)
 * @param {number} gradientDirection Direction of the gradient in degrees (default `180`)
 * @param {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void} onClick Function to be called when the circle is clicked
 *    `(React.MouseEvent<HTMLButtonElement, MouseEvent>) => void`
 */
export function Circle({
  title,
  size,
  x = 0,
  y = 0,
  gradientColorStart = "#f5576c",
  gradientColorEnd = "#f093fb",
  gradientDirection = 180,
  onClick,
}: CircleProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    const windowSize = { width: window.innerWidth, height: window.innerHeight };

    /**
     * circle size - convert `rem` to `px`
     */
    const sizePixel = size * parseFloat(getComputedStyle(document.documentElement).fontSize);
    /**
     * horizontal position
     * 0% to 50% - `left`
     * 50% to 100% - `right`
     * 50% is the center of the window width
     */
    if ((x / 100) * windowSize.width < windowSize.width - sizePixel) {
      setStyle({ left: `calc(${x}% - ${size / 2}rem)` });
    } else {
      setStyle({ right: `calc(${100 - x}% - ${size / 2}rem)` });
    }
    /**
     * vertical position
     * 0% to 50% - `top`
     * 50% to 100% - `bottom`
     * 50% is the center of the window height
     */
    if ((y / 100) * windowSize.height < windowSize.height - sizePixel) {
      setStyle((prev) => ({ ...prev, top: `calc(${y}% - ${size / 2}rem)` }));
    } else {
      setStyle((prev) => ({ ...prev, bottom: `calc(${100 - y}% - ${size / 2}rem)` }));
    }

    /**
     * `prev` is the position of the circle that is set above
     * size, gradient, base font size
     */
    setStyle((prev) => ({
      ...prev,
      width: `${size}rem`,
      background: `linear-gradient(${gradientDirection}deg, ${gradientColorStart}, ${gradientColorEnd})`,
      fontSize: `${size / 4}rem`,
    }));
  }, [size, x, y, gradientColorStart, gradientColorEnd, gradientDirection]);

  return (
    <button className={styles.circle} style={style} onClick={(e) => onClick(e)}>
      <span className={styles.title}>{title}</span>
    </button>
  );
}
