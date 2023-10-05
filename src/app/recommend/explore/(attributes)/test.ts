/** テスト用 料理特性データ */
type DishTrait = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  name: string;
  description?: string;
  threshold: number;
};
/** type: 特性のカテゴリ, name: 特性, threshold: 特性値 */
const dishTraits: DishTrait[] = [
  {
    id: "eeb3d8d0-6fbf-4ca5-975d-2b808dfc45de",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "quantity",
    name: "がっつり",
    threshold: 99,
  },
  {
    id: "8c1c72a3-418c-45aa-bd42-0ad387427812",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "quantity",
    name: "普通",
    threshold: 49,
  },
  {
    id: "3348c6a5-9b65-4165-93f8-5ef25f168f2d",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "quantity",
    name: "少なめ",
    threshold: 0,
  },
  {
    id: "f62dd85a-f560-4ab8-a83f-4232e64c4ffa",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "quantity",
    name: "おまかせ",
    threshold: 999999,
  },
  {
    id: "a09038fe-1edf-4ac8-a9bf-404f89e925ff",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "price",
    name: "950円~",
    threshold: 950,
  },
  {
    id: "194f3cde-dafa-4c11-b6b3-fbfa6d28b7e7",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "price",
    name: "750円",
    threshold: 750,
  },
  {
    id: "24a28bd5-a380-4374-aa36-874258483e22",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "price",
    name: "~500円",
    threshold: 500,
  },
  {
    id: "60213de0-b770-40df-8984-05a33f6379e3",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "price",
    name: "おまかせ",
    threshold: 999999,
  },
  {
    id: "b1b0b5a9-5b9a-4b7a-8b0a-5b0b5a9b9a5b",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "taste",
    name: "定番",
    threshold: 0,
  },
  {
    id: "70ef8650-60d6-40f3-8afe-f533a1ed7d43",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "taste",
    name: "個性",
    threshold: 99,
  },
  {
    id: "0b62b670-5707-4503-83be-5cc1b87de236",
    createdAt: new Date(),
    updatedAt: new Date(),
    type: "taste",
    name: "おまかせ",
    threshold: 999999,
  },
];

/** テスト用 料理特性スコアデータ */
type DishScore = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  score: number;
  dishId: string;
  traitId: string;
};
const dishScores: DishScore[] = [
  {
    id: "2819a35d-6bd9-4956-bda2-0cfa760865aa",
    createdAt: new Date(),
    updatedAt: new Date(),
    score: 50,
    dishId: "2819a35d-6bd9-4956-bda2-0cfa760865aa",
    traitId: "eeb3d8d0-6fbf-4ca5-975d-2b808dfc45de",
  },
  {
    id: "963a4e2e-1b96-4533-a501-33967df6f318",
    createdAt: new Date(),
    updatedAt: new Date(),
    score: 50,
    dishId: "2819a35d-6bd9-4956-bda2-0cfa760865aa",
    traitId: "3348c6a5-9b65-4165-93f8-5ef25f168f2d",
  },
  {
    id: "b99a9ba9-60b0-4092-bd72-e531b5af09ee",
    createdAt: new Date(),
    updatedAt: new Date(),
    score: 50,
    dishId: "2819a35d-6bd9-4956-bda2-0cfa760865aa",
    traitId: "a09038fe-1edf-4ac8-a9bf-404f89e925ff",
  },
];

export { dishScores, dishTraits };
export type { DishScore, DishTrait };
