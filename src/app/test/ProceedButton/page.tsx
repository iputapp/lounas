import "./page.scss";

import { Proceed } from "@/components/buttons/proceed/ProceedButton";

export default function Home() {
  return (
    <div>
      <div className="skipgo">
        <Proceed text="Skip" size="120" />
      </div>
      <div className="skipgo">
        <Proceed text="Go!!" size="210" />
      </div>
    </div>
  );
}
