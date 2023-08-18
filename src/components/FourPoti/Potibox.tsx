import React from "react";

import Circle from "./Circle"; // CircleProps のインポートを追加

function BottomSelector() {
  return (
    <div style={{ position: "relative", height: "900px", width: "900px" }}>
      <Circle size={300} position={{ x: 0, y: 0 }} color="red" label="950円~" />
      <Circle size={100} position={{ x: 320, y: 0 }} color="blue" label="750~950円" />
      <Circle size={400} position={{ x: 0, y: 320 }} color="pink" label="~750円" />
      <Circle size={50} position={{ x: 430, y: 350 }} color="green" label="skip" />
    </div>
  );
}

export { BottomSelector };
