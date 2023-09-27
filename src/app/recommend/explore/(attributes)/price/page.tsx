"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CircleButton } from "@/components/buttons/CircleButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

import { circleThemes, CircleThemeType } from "../constants";
import { DishTrait, dishTraits } from "../test";
import styles from "./page.module.scss";

type SelectionType = DishTrait & CircleThemeType;

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** 特性 おまかせ */
  const random = "おまかせ";
  /** 全ての特性 */
  const traits = dishTraits.map((trait, index) => {
    /** 特性のカテゴリ数 */
    const typeCount = dishTraits.filter((t) => t.type === trait.type).length;
    return {
      ...trait,
      size:
        trait.name === random
          ? circleThemes[circleThemes.length - 1].size
          : circleThemes[index % typeCount].size,
      gradient:
        trait.name === random
          ? circleThemes[circleThemes.length - 1].gradient
          : circleThemes[index % typeCount].gradient,
      position: {
        x:
          trait.name === random
            ? circleThemes[circleThemes.length - 1].position.x
            : circleThemes[index % typeCount].position.x,
        y:
          trait.name === random
            ? circleThemes[circleThemes.length - 1].position.y
            : circleThemes[index % typeCount].position.y,
      },
    } as SelectionType;
  });

  /** 特性の名前 */
  const currentPathname = pathname.split("/").pop() as string;
  /** 特性の選択肢 */
  const currentSelections = traits.filter((trait) => trait.type === currentPathname);

  const clickHandler = (e: React.MouseEvent) => {
    const value = e.currentTarget.getAttribute("value"); // ex. 60, 750, 30
    if (!value) return;

    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); // all current params
    currentParams.set(currentPathname, value); // set new query param (when exists, overwrite)

    router.push(`taste/?${currentParams.toString()}`); // next section
  };

  return (
    <div className={styles.container}>
      <BorderTitle fontSize="text-4xl" fontWeight="font-semibold" className={styles.title}>
        <h1>Price</h1>
      </BorderTitle>
      <div className={styles.circles}>
        {currentSelections.map((item, index) => (
          <CircleButton
            key={index}
            title={item.name}
            value={String(item.threshold)}
            size={item.size}
            x={item.position.x}
            y={item.position.y}
            gradient={{
              start: item.gradient.start,
              end: item.gradient.end,
              direction: item.gradient.direction,
            }}
            onClick={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}
