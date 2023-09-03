"use client";

import { useState } from "react";

import { Circle } from "@/components/buttons/CircleButton";

export default function Test() {
  const [title, setTitle] = useState("がっつり");
  const clickHandler = () => {
    if (title === "がっつり") {
      setTitle("ふつう");
    } else {
      setTitle("がっつり");
    }
  };

  return (
    <div className="relative h-screen w-full">
      <Circle
        title={title}
        size={10}
        posX="right"
        posY="top"
        x={5}
        y={0}
        gradientColorStart="#f5576c"
        gradientColorEnd="#f093fb"
        gradientDirection={180}
        onClick={() => clickHandler()}
      />
    </div>
  );
}
