"use client";

import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Framer motion component for `Next.JS`
 * @description Use this component for transition pages.
 * @param {React.ReactNode} children Children `ReactNode`
 * @param {string} className HTML class attribute of `<motion.main>`
 * @param {AnimationProps} motionProps Animation settings of `<motion.main>`
 * @see {@link https://github.com/framer/motion/issues/1850#issuecomment-1445239322}
 */
export function AnimatePresenceLayer({
  children,
  className,
  motionProps,
}: {
  children: React.ReactNode;
  className?: string;
  motionProps: AnimationProps;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="sync">
      <motion.div className={className} key={pathname} {...motionProps}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
