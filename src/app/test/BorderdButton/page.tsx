import "./page.scss";

import { BorderdButton } from "@/components/buttons/BorderdButton/BorderdButton";

export default function Home() {
  const keep = () => {
    console.log("keep");
  };

  return (
    <div>
      <div className="skipgo">
        <BorderdButton text="Skip" size="100" outborderd={false} keep={keep} />
      </div>
      <div className="skipgo">
        <BorderdButton text="Go!!" size="200" outborderd={true} keep={keep} />
      </div>
    </div>
  );
}
