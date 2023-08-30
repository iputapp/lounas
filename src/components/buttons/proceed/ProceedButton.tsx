"use client";

import "./ProceedButton.scss";

type ProceedProps = {
  text: string;
  size: string;
};

export function Proceed({ text, size }: ProceedProps) {
  const insize = Number(size) - Number(size) / 10;
  const textsize = Number(size) / 5;
  return (
    <button className="article" style={{ width: `${size}px`, height: `${size}px` }}>
      <div className="section" style={{ width: `${insize}px`, height: `${insize}px` }}>
        <div className="button" style={{ fontSize: `${textsize}px` }}>
          {text}
        </div>
      </div>
    </button>
  );
}
