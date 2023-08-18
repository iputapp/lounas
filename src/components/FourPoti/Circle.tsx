import React from "react";

interface CircleProps {
  size: number; // 円の大きさ
  position: { x: number; y: number }; // 円の位置
  color1: string; // 円の色
  color2: string;
  label?: string; // 円のラベル（オプション）
  angle?: number; // 円のグラデーション角度（オプション）
}

const Circle = (props: CircleProps) => {
  const { size, position, color1, color2, label, angle = 0 } = props;

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `linear-gradient(${angle}deg, ${color1}, ${color2})`, // backgroundプロパティを使用
        borderRadius: "50%",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {label}
    </div>
  );
};

export { Circle };
