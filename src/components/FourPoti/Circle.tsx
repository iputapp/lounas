import "./Circle.scss";

import Link from "next/link";

type CircleProps = {
  title: string;
  size: number;
  href: string;
  gradientStart?: string;
  gradientEnd?: string;
  gradientDirection?: string;
};

export function Circle({
  title,
  size,
  href,
  gradientStart = "transparent",
  gradientEnd = "transparent",
  gradientDirection = "to bottom",
}: CircleProps) {
  const gradient = `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`;

  return (
    <Link href={href}>
      <div
        className="circle clickable"
        style={{ width: `${size}px`, height: `${size}px`, background: gradient }}
      >
        <div className="title" style={{ fontSize: `${size * 0.2}px` }}>
          {title}
        </div>
      </div>
    </Link>
  );
}
