"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CircleButton } from "@/components/buttons/CircleButton";
import { SelectionStack } from "@/components/widgets/SelectionStack";

import { DishTrait, dishTraits, DishTraitType } from "./attributes";

type Selected = {
  type: DishTraitType;
  item: DishTrait;
};

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Selected[]>([]);

  useEffect(() => {
    /** ex. [["quantity", "60"], ["price", "750"], ["taste", "30"]] */
    const currentParams = Array.from(searchParams.entries());

    /** array of current selections */
    const currentSelections = currentParams.map((param) => {
      const key = param[0] as DishTraitType; // 特性のカテゴリ (ex. "quantity", "price", "taste")
      const value = param[1]; // 特性の値
      const selection = dishTraits[key]?.find((trait) => String(trait.value) === value);
      if (!selection) {
        console.error(`Invalid param.\nkey: ${key}, value: ${value}`);
      } else {
        return {
          type: key,
          item: {
            ...selection,
          },
        };
      }
    }) as Selected[];

    /** set current selections */
    setSelected(currentSelections);
  }, [searchParams]);

  return (
    <>
      {/* circles */}
      {children}
      {/* stack */}
      <SelectionStack>
        {Object.entries(selected).map(([key, value], index) => (
          <CircleButton
            key={key}
            title={value.item.name}
            value={value.item.value}
            position="relative"
            gradient={value.item.theme.gradient}
            animation={{ delay: index / 10, stiffness: 200, damping: 20 }}
            onClick={() =>
              router.push(
                `${value.type}?${new URLSearchParams(
                  Array.from(searchParams.entries())
                ).toString()}`
              )
            }
          />
        ))}
      </SelectionStack>
    </>
  );
}
