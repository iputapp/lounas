"use client";

import LogoFill from "@icons/logo-fill.svg";
import { notFound, usePathname, useRouter, useSearchParams } from "next/navigation";

import { BackButton } from "@/components/buttons/BackButton";
import { CircleButton } from "@/components/buttons/CircleButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

import { dishTraits, DishTraitType } from "../attributes";
import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** 特性の名前 */
  const currentPathname = pathname.split("/").pop() as string;
  /** このページの特性すべて */
  const currentTraits = dishTraits[currentPathname as DishTraitType];
  if (!currentTraits) return notFound();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget.getAttribute("value");
    if (!value) return;

    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); // all current params
    currentParams.set(currentPathname, value); // set new query param (when exists, overwrite)

    router.push(`price/?${currentParams.toString()}`); // next section
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton
          title={
            <span className={styles.icon}>
              <LogoFill />
            </span>
          }
          onClick={() => router.push("/webapp/home")}
          className={styles.button}
        />
        <BorderTitle fontSize="text-4xl" fontWeight="font-semibold" className={styles.title}>
          <h1>Amount</h1>
        </BorderTitle>
      </div>
      <div className={styles.circles}>
        {currentTraits?.map((item, index) => (
          <CircleButton
            key={index}
            title={item.name}
            value={item.value}
            size={item.theme.size}
            x={item.theme.position.x}
            y={item.theme.position.y}
            gradient={item.theme.gradient}
            onClick={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}
