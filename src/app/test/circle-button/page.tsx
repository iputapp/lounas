"use client";

import { Circle } from "@/components/buttons/CircleButton";

export default function Test() {
  const clickHandler = (e: React.MouseEvent) => {
    console.log(e.currentTarget.textContent);
  };

  return (
    <div className="relative h-screen w-full">
      <Circle
        title="がっつり"
        size={12}
        x={30}
        y={30}
        gradientColorStart="#f5576c"
        gradientColorEnd="#f093fb"
        gradientDirection={180}
        onClick={clickHandler}
      />
      <Circle
        title="普通"
        size={10}
        x={40}
        y={57.5}
        gradientColorStart="#36ba64"
        gradientColorEnd="#04e67e"
        gradientDirection={180}
        onClick={clickHandler}
      />
      <Circle
        title="少なめ"
        size={8}
        x={78.5}
        y={45}
        gradientColorStart="#0d32ff"
        gradientColorEnd="#667eea"
        gradientDirection={0}
        onClick={clickHandler}
      />
    </div>
  );
}
