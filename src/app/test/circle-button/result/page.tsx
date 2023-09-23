"use client";

import { useSearchParams } from "next/navigation";

export default function Test() {
  const searchParams = useSearchParams();
  const currentParams = Array.from(searchParams.entries());

  return (
    <div className="grid h-full w-full content-center gap-6">
      <h1 className="mx-auto w-fit text-lg">あなたの候補をもとに検索しています...</h1>
      <ul className="mx-auto text-base text-neutral-700">
        {currentParams.map((param, index) => (
          <li key={index}>
            <span>{param[0].charAt(0).toUpperCase() + param[0].slice(1).toLowerCase()}: </span>
            <span>{param[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
