"use client";

import "./styles.scss";

type RoundedRectangleButtonProps = {
  text: string;
  textsize: number;
  Xpadding: number;
  Ypadding: number;
  className?: string;
  onClick: () => void;
};

export function RoundedRectangleButton({
  text,
  Xpadding,
  Ypadding,
  className,
  textsize,
  onClick,
}: RoundedRectangleButtonProps) {
  return (
    <button className="button main" onClick={onClick}>
      <div className="inside">
        <div
          className={`text , ${className} `}
          style={{
            paddingTop: `${Ypadding}px`,
            paddingBottom: `${Ypadding}px`,
            paddingRight: `${Xpadding}px`,
            paddingLeft: `${Xpadding}px`,
            fontSize: `${textsize}px`,
          }}
        >
          {text}
        </div>
      </div>
    </button>
  );
}
