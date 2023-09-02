import "./styles.scss";

import { PreferenceSelection } from "@/app/test/selection-stack/page";

type SelectionStackProps = {
  selections: PreferenceSelection[];
};

export function SelectionStack({ selections }: SelectionStackProps) {
  return (
    <div className="page">
      <div className="main">
        <button className="first circle" style="backgroundcolor">
          {selections[0].text}
        </button>
        <button className={`circle ${selections[1].color}`}>{selections[1].text}</button>
        <button className={`third circle ${selections[2].color}`}>{selections[2].text}</button>
      </div>
    </div>
  );
}

const SelectionStackButton = () => {
  <>
    {isSelected ? (
      <button className={`first circle ${selection.color}`}>{selection.text}</button>
    ) : (
      <></>
    )}
  </>;
};
