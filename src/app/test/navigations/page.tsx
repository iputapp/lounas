import React from "react";

import { Circle as FourPotiCircle } from "@/components/FourPoti/Circle";

export default function SomeComponent() {
  return (
    <FourPotiCircle
      title="95円"
      size={100}
      gradientStart="red"
      gradientEnd="transparent"
      gradientDirection="to right"
      href="/"
    />
  );
}
