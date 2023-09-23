"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CircleButton } from "@/components/buttons/CircleButton";

import { selections } from "../constants";

export default function Test() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** circle position */
  const positions = [
    {
      x: 30,
      y: 36,
    },
    {
      x: 35,
      y: 64,
    },
    {
      x: 75,
      y: 50,
    },
    {
      x: 75,
      y: 72,
    },
  ];

  const currentPathname = pathname.split("/").pop() as string; // ex. "quantity"
  const currentSelections = selections[currentPathname as keyof typeof selections];

  const clickHandler = (e: React.MouseEvent) => {
    if (!e.currentTarget.getAttribute("value")) return;
    const value = e.currentTarget.getAttribute("value");
    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); // ex. "size=medium&price=medium"
    currentParams.set(currentPathname, value as string); // set new query param (when exists, overwrite)
    console.log(currentParams.toString());
    router.push(`result/?${currentParams.toString()}`); // ex. "quantity?size=large&price=medium"
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
          Taste
        </h1>
      </motion.div>
      {/* main feature */}
      <motion.div className="fixed inset-0 h-full w-full overflow-clip">
        {currentSelections.map((selection, index) => (
          <CircleButton
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
          />
        ))}
      </motion.div>
    </div>
  );
}
