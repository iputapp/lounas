import "./styles.scss";

import { PreferenceSelection } from "@/app/test/selection-stack/page";

type SelectionStackProps = {
  selections: PreferenceSelection[];
};

export function SelectionStack({ selections }: SelectionStackProps) {
  return (
    <div className="page">
      <div className="main">
        <button className={`first circle ${selections[0].color}`}>{selections[0].text}</button>
        <button className={`circle ${selections[1].color}`}>{selections[1].text}</button>
        <button className={`third circle ${selections[2].color}`}>{selections[2].text}</button>
      </div>
    </div>
  );
}
