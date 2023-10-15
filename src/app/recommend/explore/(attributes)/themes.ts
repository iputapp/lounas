/** Type of Circle Button Theme */
type CircleTheme = {
  size: number;
  gradient: {
    direction: number;
    start: string;
    end: string;
  };
  position: {
    x: number;
    y: number;
  };
};

/** Theme of Circle Button */
const circleThemes: CircleTheme[] = [
  {
    size: 12,
    gradient: {
      direction: 180,
      start: "#f5576c",
      end: "#f093fb",
    },
    position: {
      x: 30,
      y: 36,
    },
  },
  {
    size: 10,
    gradient: {
      direction: 180,
      start: "#36ba64",
      end: "#04e67e",
    },
    position: {
      x: 35,
      y: 64,
    },
  },
  {
    size: 8,
    gradient: {
      direction: 0,
      start: "#0d32ff",
      end: "#667eea",
    },
    position: {
      x: 75,
      y: 50,
    },
  },
  {
    size: 5,
    gradient: {
      direction: 0,
      start: "#fff",
      end: "#fff",
    },
    position: {
      x: 75,
      y: 72,
    },
  },
];

export { circleThemes };
export type { CircleTheme };
