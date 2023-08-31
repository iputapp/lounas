"use client";

import "./BorderdButton.scss";

type BorderdButtonProps = {
  text: string;
  size: string;
  outborderd: boolean;
  decide: () => void;
};

export function BorderdButton({ text, size, outborderd, decide }: BorderdButtonProps) {
  const insize = Number(size) - Number(size) / 10;
  const textsize = Number(size) / 5;
  const outsize = Number(size) + (Number(size) / 5) * Number(outborderd);
  return (
    <button
      className="circle main "
      style={{ width: `${outsize}px`, height: `${outsize}px` }}
      onClick={decide}
    >
      <div className="article main" style={{ width: `${size}px`, height: `${size}px` }}>
        <div className="section" style={{ width: `${insize}px`, height: `${insize}px` }}>
          <div className="text" style={{ fontSize: `${textsize}px` }}>
            {text}
          </div>
        </div>
      </div>
    </button>
  );
}
