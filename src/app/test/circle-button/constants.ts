type Selection = {
  title: string;
  value: string;
  size: number;
  gradient: {
    start: string;
    end: string;
    direction: number;
  };
  isSelected: boolean;
};

type SelectionType = {
  quantity?: Selection;
  price?: Selection;
  taste?: Selection;
};

export type { SelectionType };

/** 指定なし(おまかせ)は`random`として用意する */
const selections = {
  quantity: [
    {
      title: "がっつり",
      value: "large",
      size: 12,
      gradient: {
        direction: 180,
        start: "#f5576c",
        end: "#f093fb",
      },
    },
    {
      title: "普通",
      value: "medium",
      size: 10,
      gradient: {
        direction: 180,
        start: "#36ba64",
        end: "#04e67e",
      },
    },
    {
      title: "少なめ",
      value: "small",
      size: 8,
      gradient: {
        direction: 0,
        start: "#0d32ff",
        end: "#667eea",
      },
    },
    {
      title: "おまかせ",
      value: "random",
      size: 5,
      gradient: {
        direction: 0,
        start: "#fff",
        end: "#fff",
      },
    },
  ],
  price: [
    {
      title: "950円~",
      value: "high",
      size: 12,
      gradient: {
        direction: 180,
        start: "#f5576c",
        end: "#f093fb",
      },
    },
    {
      title: "750円",
      value: "medium",
      size: 10,
      gradient: {
        direction: 180,
        start: "#36ba64",
        end: "#04e67e",
      },
    },
    {
      title: "~500円",
      value: "low",
      size: 8,
      gradient: {
        direction: 0,
        start: "#0d32ff",
        end: "#667eea",
      },
    },
    {
      title: "おまかせ",
      value: "random",
      size: 5,
      gradient: {
        direction: 0,
        start: "#fff",
        end: "#fff",
      },
    },
  ],
  taste: [
    {
      title: "濃いめ",
      value: "rich",
      size: 12,
      gradient: {
        direction: 180,
        start: "#f5576c",
        end: "#f093fb",
      },
    },
    {
      title: "定番",
      value: "normal",
      size: 10,
      gradient: {
        direction: 180,
        start: "#36ba64",
        end: "#04e67e",
      },
    },
    {
      title: "個性的",
      value: "unique",
      size: 8,
      gradient: {
        direction: 0,
        start: "#0d32ff",
        end: "#667eea",
      },
    },
    {
      title: "おまかせ",
      value: "random",
      size: 5,
      gradient: {
        direction: 0,
        start: "#fff",
        end: "#fff",
      },
    },
  ],
};

export { selections };
