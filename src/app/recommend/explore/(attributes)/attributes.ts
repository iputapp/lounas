import { RecommendRequest } from "@/app/api/v-beta/recommend";

import { CircleTheme, circleThemes } from "./themes";

/** 特性のカテゴリ */
type DishTraitType = keyof RecommendRequest;

/** カテゴリ別特性 */
type DishTrait = {
  value: RecommendRequest[DishTraitType];
  name: string;
  theme: CircleTheme;
};

/** カテゴリ別特性すべて */
type DishTraits = {
  [key in DishTraitType]?: {
    value: RecommendRequest[key];
    name: string;
    theme: CircleTheme;
  }[];
};

/** 特性の値 */
const dishTraits: DishTraits = {
  amount: [
    {
      value: "large",
      name: "がっつり",
      theme: circleThemes[0],
    },
    {
      value: "medium",
      name: "普通",
      theme: circleThemes[1],
    },
    {
      value: "small",
      name: "少なめ",
      theme: circleThemes[2],
    },
    {
      value: "any",
      name: "おまかせ",
      theme: circleThemes[circleThemes.length - 1],
    },
  ],
  price: [
    {
      value: 1000,
      name: "~1000円",
      theme: circleThemes[0],
    },
    {
      value: 850,
      name: "~850円",
      theme: circleThemes[1],
    },
    {
      value: 650,
      name: "~650円",
      theme: circleThemes[2],
    },
    {
      value: 999999,
      name: "おまかせ",
      theme: circleThemes[circleThemes.length - 1],
    },
  ],
  commonality: [
    {
      value: "common",
      name: "定番",
      theme: circleThemes[0],
    },
    {
      value: "unique",
      name: "個性",
      theme: circleThemes[1],
    },
    {
      value: "any",
      name: "おまかせ",
      theme: circleThemes[circleThemes.length - 1],
    },
  ],
};

export { dishTraits };
export type { DishTrait, DishTraits, DishTraitType };
