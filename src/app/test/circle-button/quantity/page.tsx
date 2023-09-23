"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

import { Circle } from "@/components/buttons/CircleButton";

import { selections } from "../constants";

type Position = {
  x: number;
  y: number;
};

export default function Test() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const constraintsRef = useRef(null);
  const [positions, setPositions] = useState<Position[]>([]);

  const currentPathname = pathname.split("/").pop() as string; // ex. "quantity"
  const currentSelections = selections[currentPathname as keyof typeof selections];

  useLayoutEffect(() => {
    for (let i = 0; i < currentSelections.length; i++) {
      setPositions((prev) => [
        ...prev,
        {
          x: Math.random() * 0.6 * window.innerWidth,
          y: (Math.random() * 0.6 + 0.08) * window.innerHeight,
        },
      ]);
    }
  }, [currentSelections]);

  const clickHandler = (e: React.MouseEvent) => {
    if (!e.currentTarget.getAttribute("value")) return;
    const value = e.currentTarget.getAttribute("value");

    const currentPathname = pathname.split("/").pop() as string; // ex. "quantity"
    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); // ex. "size=medium&price=medium"
    currentParams.set(currentPathname, value as string); // set new query param (when exists, overwrite)
    console.log(currentParams.toString());
    router.push(`price/?${currentParams.toString()}`); // ex. "quantity?size=large&price=medium"
  };

  return (
    <div className="grid h-full w-full content-start">
      {/* title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="mx-auto w-fit border-b-2 border-blue-500 py-4 text-4xl font-semibold">
          Quantity
        </h1>
      </motion.div>
      {/* main feature */}
      <motion.div ref={constraintsRef} className="fixed inset-0 h-full w-full overflow-clip">
        {currentSelections.map((selection, index) => (
          <Circle
            key={index}
            title={selection.title}
            value={selection.value}
            size={selection.size}
            x={positions[index]?.x}
            y={positions[index]?.y}
            gradient={{
              start: selection.gradient.start,
              end: selection.gradient.end,
              direction: selection.gradient.direction,
            }}
            onClick={clickHandler}
            constraintsRef={constraintsRef}
          />
        ))}
      </motion.div>
    </div>
  );
}
