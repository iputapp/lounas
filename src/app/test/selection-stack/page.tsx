"use client";

import { useState } from "react";

import { SelectionStack } from "@/components/widgets/SelectionStack/SelectionsStack";

// let text1 = "";
// let color1 = "";

// const button = () => {
//   text1 = "テキスト";
//   color1 = "red";
//   return [text1, color1];
// };

export type PreferenceSelection = {
  isSelected: boolean;
  text: string;
  color: string;
};

export default function Page() {
  const [selections, setSelections] = useState<PreferenceSelection[]>([
    { isSelected: false, text: "", color: "" },
    { isSelected: false, text: "", color: "" },
    { isSelected: false, text: "", color: "" },
  ]);

  const setPreference = (index: number, isSelected: boolean, text: string, color: string) => {
    const preferences = [...selections];

    preferences[index].isSelected = isSelected;
    preferences[index].text = text;
    preferences[index].color = color;

    console.log(preferences[0]);

    setSelections(preferences);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 border-b-4 border-indigo-500 p-5">
        <button
          onClick={(e) =>
            setPreference(0, false, e.currentTarget.textContent!, "background-color: red")
          }
        >
          がっつり
        </button>
        <button onClick={(e) => setPreference(0, true, e.currentTarget.textContent!, "green")}>
          普通
        </button>
        <button onClick={(e) => setPreference(0, true, e.currentTarget.textContent!, "blue")}>
          少なめ
        </button>
        <button onClick={(e) => setPreference(0, true, e.currentTarget.textContent!, "")}>
          指定なし
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6 border-b-4 border-indigo-500 p-5">
        <button
          onClick={(e) =>
            setPreference(1, true, e.currentTarget.textContent!, "background-color: red")
          }
        >
          950円~
        </button>
        <button
          onClick={(e) =>
            setPreference(1, true, e.currentTarget.textContent!, "background-color: green")
          }
        >
          750円
        </button>
        <button
          onClick={(e) =>
            setPreference(1, true, e.currentTarget.textContent!, "background-color: blue")
          }
        >
          ~500円
        </button>
        <button onClick={(e) => setPreference(1, true, e.currentTarget.textContent!, "")}>
          指定なし
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6 border-b-4 border-indigo-500 p-5">
        <button
          onClick={(e) =>
            setPreference(2, true, e.currentTarget.textContent!, "background-color: red")
          }
        >
          濃いめ
        </button>
        <button
          onClick={(e) =>
            setPreference(2, true, e.currentTarget.textContent!, "background-color: green")
          }
        >
          定番
        </button>
        <button
          onClick={(e) =>
            setPreference(2, true, e.currentTarget.textContent!, "background-color: blue")
          }
        >
          個性的
        </button>
        <button onClick={(e) => setPreference(2, true, e.currentTarget.textContent!, "")}>
          指定なし
        </button>
      </div>
      <div>
        <SelectionStack selections={selections} />
      </div>
    </div>
  );
}
