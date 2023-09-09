"use client";
import "./style.scss";

import LogoFill from "@icons/logo-fill.svg";

export function Thisapp({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <LogoFill />
        </div>
        <div className="title">IMAP</div>
      </div>
      <div>
        <div className="main">{children}</div>
      </div>
      <div className="footer">
        <div className="developer">PROJECT RIPLUP アプリ開発サークル</div>
      </div>
    </div>
  );
}
