"use client";
import "./decidedbutton.module.scss";

import Link from "next/link";
import * as React from "react";

type ButtonProps = {
  id: string;
  text: string;
  color: string;
};

export function Button({ id, text, color }: ButtonProps) {
  return (
    <article className={color}>
      <Link className="text" href={`/${id}`}>
        {text}
      </Link>
    </article>
  );
}
