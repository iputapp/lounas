import React from "react";

interface CircleProps {
  size: number; // 円の大きさ
  position: { x: number; y: number }; // 円の位置
  color: string; // 円の色
  label?: string; // 円のラベル（オプション）
}

const Circle: React.FC<CircleProps> = ({ size, position, color, label }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {label}
    </div>
  );
};

export default Circle;
