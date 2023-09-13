"use client";

import { useSearchParams } from "next/navigation";

export default function Test() {
  const searchParams = useSearchParams();
  const currentParams = Array.from(searchParams.entries());

  return (
    <div className="grid h-screen w-full grid-rows-6 place-items-center">
      <h1 className="row-start-3 text-xl">あなたの候補をもとに検索しています...</h1>
      <ul className="row-start-4 text-base text-gray-500">
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
