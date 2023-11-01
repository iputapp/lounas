"use client";

import CheckCircle from "@icons/check-circle.svg";
import ShareAndroid from "@icons/share-android.svg";
import WarningCircle from "@icons/warning-circle.svg";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useState } from "react";

type ShareButtonState = {
  open: boolean;
  message: string | null;
  origin: SnackbarOrigin;
  error: {
    message: string;
  } | null;
};

export function ShareButton() {
  const [state, setState] = useState<ShareButtonState>({
    open: false,
    message: null,
    origin: {
      vertical: "bottom",
      horizontal: "left",
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
        setState({ open: true, message: "コピーしました！📋", origin: origin, error: null });
        console.log("Copied to clipboard successfully!");
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
        setState({
          open: true,
          message: null,
          origin: origin,
          error: { message: "コピーに失敗しました...😭" },
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
      <div className="mt-2 grid w-fit justify-items-center gap-1.5">
        <button
          className="select-none rounded-full border border-neutral-500 py-1.5 pe-2 ps-1"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={(e) => handleClick(e, { vertical: "bottom", horizontal: "left" })}
        >
          <span className="text-xl text-[#07f]">
            <ShareAndroid />
          </span>
        </button>
        <span className="text-xs text-neutral-700">リンクをコピー</span>
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
