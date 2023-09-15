"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Selections, selections } from "./constants";
import styles from "./template.module.scss";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Selections>();

  useEffect(() => {
    const currentParams = Array.from(searchParams.entries());

    if (!currentParams.length) return;

    currentParams.map((param) => {
      const key = param[0];
      const value = param[1];
      const target = selections[key as keyof Selections].find((item) => item.value === value);
      console.log(target);
      setSelected((prev) => ({ ...prev, [key as keyof Selections]: target }));
    });
  }, [pathname, searchParams]);

  return (
    <>
      {children}
      <div
        className={`fixed bottom-10 left-0 right-0 z-30 mx-auto aspect-[32/9] w-[75%] overflow-clip rounded-full bg-neutral-100/80 backdrop-blur ${styles.neumo}`}
      >
        <div className="grid h-full grid-cols-3 grid-rows-1 place-items-center content-center gap-2 px-0.5 py-1.5">
          {selected?.quantity ? (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="flex aspect-square h-full items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(${selected?.quantity.gradient.direction}deg, ${selected?.quantity.gradient.start}, ${selected?.quantity.gradient.end})`,
              }}
              onClick={() =>
                router.push(
                  `quantity?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`
                )
              }
            >
              <span className="font-semibold text-white">{selected?.quantity.title}</span>
            </motion.button>
          ) : (
            <button
              className="flex aspect-square h-full items-center justify-center rounded-full"
              onClick={() =>
                router.push(
                  `quantity?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`
                )
              }
            ></button>
          )}
          {selected?.price ? (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="flex aspect-square h-full items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(${selected?.price.gradient.direction}deg, ${selected?.price.gradient.start}, ${selected?.price.gradient.end})`,
              }}
              onClick={() =>
                router.push(
                  `price?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`
                )
              }
            >
              <span className="font-semibold text-white">{selected?.price.title}</span>
            </motion.button>
          ) : (
            <button
              className="flex aspect-square h-full items-center justify-center rounded-full"
              onClick={() =>
                router.push(
                  `price?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`
                )
              }
            ></button>
          )}
          {selected?.taste ? (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="flex aspect-square h-full items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(${selected?.taste.gradient.direction}deg, ${selected?.taste.gradient.start}, ${selected?.taste.gradient.end})`,
              }}
              onClick={() =>
                router.push(
                  `taste?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`
                )
              }
            >
              <span className="font-semibold text-white">{selected?.taste.title}</span>
            </motion.button>
          ) : (
            <button
              className="flex aspect-square h-full items-center justify-center rounded-full"
              onClick={() =>
                router.push(
                  `taste?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`
                )
              }
            ></button>
          )}
        </div>
      </div>
    </>
  );
}