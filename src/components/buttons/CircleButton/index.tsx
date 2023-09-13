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
    // const windowSize = { width: window.innerWidth, height: window.innerHeight };

    // /**
    //  * circle size - convert `rem` to `px`
    //  */
    // const sizePixel = size * parseFloat(getComputedStyle(document.documentElement).fontSize);
    // /**
    //  * horizontal position
    //  * 0% to 50% - `left`
    //  * 50% to 100% - `right`
    //  * 50% is the center of the window width
    //  */
    // if ((x / 100) * windowSize.width < windowSize.width - sizePixel) {
    //   setStyle({ left: `calc(${x}% - ${size / 2}rem + ${size / 2}rem)` });
    // } else {
    //   setStyle({ right: `calc(${100 - x}% - ${size / 2}rem + ${size / 2}rem)` });
    // }
    // /**
    //  * vertical position
    //  * 0% to 50% - `top`
    //  * 50% to 100% - `bottom`
    //  * 50% is the center of the window height
    //  */
    // if ((y / 100) * windowSize.height < windowSize.height - sizePixel) {
    //   setStyle((prev) => ({ ...prev, top: `calc(${y}% - ${size / 2}rem + ${size / 2}rem)` }));
    // } else {
    //   setStyle((prev) => ({
    //     ...prev,
    //     bottom: `calc(${100 - y}% - ${size / 2}rem + ${size / 2}rem)`,
    //   }));
    // }

    /**
     * `prev` is the position of the circle that is set above
     * size, gradient, base font size
     */
    setStyle((prev) => ({
      // ...prev,
      width: `${size}rem`,
      background: `linear-gradient(${gradient.direction}deg, ${gradient.start}, ${gradient.end})`,
      fontSize: `${size / 4}rem`,
      transformOrigin: "center",
    }));
  }, [size, x, y, gradient]);

  return (
    <motion.button
      initial={{ scale: 0, x: "100%", y: "100%" }}
      animate={{ scale: 1, x: x, y: y }}
      exit={{ scale: 0 }}
      transition={{
        delay: Math.random(),
        type: "spring",
        stiffness: 50,
        damping: 8,
        power: 0.1,
      }}
      drag={true}
      dragConstraints={constraintsRef}
      dragTransition={{
        bounceStiffness: 100,
        bounceDamping: 10,
        power: 0.5,
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
