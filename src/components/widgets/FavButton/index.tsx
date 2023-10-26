"use client";

import CheckCircle from "@icons/check-circle.svg";
import Star from "@icons/star.svg";
import WarningCircle from "@icons/warning-circle.svg";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useState } from "react";

type FavButtonState = {
  open: boolean;
  message: string | null;
  origin: SnackbarOrigin;
  error: {
    message: string;
  } | null;
};

export function FavButton() {
  const [state, setState] = useState<FavButtonState>({
    open: false,
    message: null,
    origin: {
      vertical: "bottom",
      horizontal: "center",
    },
    error: null,
  });

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    origin: SnackbarOrigin
  ) => {
    await navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setState({
          open: true,
          message: "お気に入りに登録しました！✨",
          origin: origin,
          error: null,
        });
        console.log("Saved to favorites successfully!");
      })
      .catch((err) => {
        console.error("Failed to save to favorites!", err);
        setState({
          open: true,
          message: null,
          origin: origin,
          error: { message: "お気に入りに登録に失敗しました...😭" },
        });
      })
      .finally(() => {
        setTimeout(
          () => setState({ open: false, message: null, origin: origin, error: null }),
          3000
        );
      });
  };

  return (
    <>
      {/* delete `relative`, `blur-[3px]`, `span` element (※開発中🚀 with absolute class) in final ver. */}
      <div className="relative mt-2 grid w-fit justify-items-center gap-1.5">
        <button
          className="select-none rounded-full border border-neutral-500 p-1.5 blur-[3px]"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={(e) => handleClick(e, { vertical: "bottom", horizontal: "center" })}
          disabled={true}
        >
          <span className="text-xl text-[#07f]">
            <Star />
          </span>
        </button>
        <span className="text-xs text-neutral-700">お気に入り</span>
        <span className="absolute m-3 text-xs text-neutral-700">※開発中🚀</span>
      </div>
      <Snackbar
        key={state.origin.vertical + state.origin.horizontal}
        anchorOrigin={state.origin}
        open={state.open}
        message={
          <div className="flex h-full w-full items-center space-x-2.5">
            <span>{state.error ? <WarningCircle /> : <CheckCircle />}</span>
            <span>{state.error ? state.error.message : state.message}</span>
          </div>
        }
      />
    </>
  );
}
