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

type Selections = {
  quantity?: Selection;
  price?: Selection;
  taste?: Selection;
};

export type { Selection, Selections };

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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
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
      isSelected: false,
    },
  ],
};

export { selections };
