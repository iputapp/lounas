"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CircleButton } from "@/components/buttons/CircleButton";
import { SelectionStack } from "@/components/widgets/SelectionStack";

import { circleThemes, CircleThemeType } from "./constants";
import { DishTrait, dishTraits } from "./test";

type SelectionType = DishTrait & CircleThemeType;
type SelectionDict = { [key: string]: SelectionType };

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<SelectionDict>({});

  /** 全ての特性 */
  const traits = dishTraits.map((trait, index) => {
    /** 特性のカテゴリ数 */
    const typeCount = dishTraits.filter((t) => t.type === trait.type).length;
    return {
      ...trait,
      size: circleThemes[index % typeCount].size,
      gradient: circleThemes[index % typeCount].gradient,
      position: {
        x: circleThemes[index % typeCount].position.x,
        y: circleThemes[index % typeCount].position.y,
      },
    } as SelectionType;
  });

  useEffect(() => {
    /** ex. [["quantity", "60"], ["price", "750"], ["taste", "30"]] */
    const currentParams = Array.from(searchParams.entries());

    /** array of current selections */
    const currentSelection = currentParams.map((param) => {
      const key = param[0]; // ex. quantity, price, taste
      const value = Number(param[1]); // ex. 60, 750, 30
      const selection = traits.find(
        (trait) => trait.type === key && trait.threshold === value
      ) as SelectionType;
      if (!selection) console.warn(`Invalid param.\nkey: ${key}, value: ${value}`);
      return selection;
    });

    /** convert array to dict */
    const selectedDict = Object.fromEntries(
      currentSelection.map((obj) => [obj.type, obj])
    ) as SelectionDict;

    console.log(selectedDict);
    /** set current selections */
    setSelected(selectedDict);

    /** Warning: `React Hook useEffect has a missing dependency: 'traits'` | 本番は async-await を使うため、この Warning は無視 (`traits`がmappingされるたびにuseEffectが実行されてしまう) */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      {/* circles */}
      {children}
      {/* stack */}
      <SelectionStack>
        {Object.values(selected).map((item, index) => (
          <CircleButton
            key={index}
            title={item.name}
            value={String(item.threshold)}
            position="relative"
            gradient={item.gradient}
            animation={{ delay: index / 10, stiffness: 200, damping: 20 }}
            onClick={() =>
              router.push(
                `${item.type}?${new URLSearchParams(Array.from(searchParams.entries())).toString()}`
              )
            }
          />
        ))}
      </SelectionStack>
    </>
  );
}
