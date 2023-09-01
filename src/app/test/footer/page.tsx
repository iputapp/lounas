"use client";

import { Footer } from "@/components/navigations/NavigationBar";

export default function Test() {
  const Push = () => {
    console.log("ここに行くわよ");
  };

  return <Footer onClick={Push} />;
}
