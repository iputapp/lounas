"use client";

import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { LoadingLayer } from "@/components/overlays/LoadingLayer";
import { VerificationHookForm } from "@/hooks/auth/otp/VerificationHookForm";
import { theme } from "@/styles/mui";

import { BasicTextField } from "../../BasicTextField";

type VerificationFormProps = {
  className?: React.HTMLAttributes<HTMLFormElement>["className"];
};

const VerificationForm = ({ className = "" }: VerificationFormProps) => {
  const {
    form: { control, handleSubmit, onSubmit, resetField, clearErrors },
    status: { isProcessing },
  } = VerificationHookForm();

  /** 確認コード再送ボタン - status */
  const time = 20; // 再送までの時間 (秒)
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(time);

  /** 確認コード再送 - interval */
  const timerResend = () => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setDisabled(false);
      setCount(time);
    }, 1000 * time);

    return timer;
  };

  /** 確認コード再送 first-interval */
  useEffect(() => {
    const timer = timerResend();

    return () => clearInterval(timer);
  }, []);

  /** 確認コード再送 */
  const handleResend = async () => {
    clearErrors("password");
    setDisabled(true);
    timerResend();

    await fetch("/api/auth/otp/verification/resend", {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          control.setError("password", {
            type: "manual",
            message: "再送に失敗しました。しばらくしてから再度お試しください。",
          });
          resetField("password");
          console.error("Error!", res.status);
          throw new Error(res.statusText);
        }
      })
      .catch((err) => {
        control.setError("password", { type: "manual", message: "通信に失敗しました。" });
        console.error("Error!", err);
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form noValidate onSubmit={handleSubmit(onSubmit)} className={className}>
          <div className="grid gap-1">
            <BasicTextField
              name="password"
              control={control}
              label="確認コード"
              required
              variant="outlined"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 6,
              }}
            />
            <button
              className={`ms-1 justify-self-start text-sm ${
                disabled ? "text-neutral-400" : "text-blue-600"
              } transition-colors duration-300 ease-in-out`}
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleResend}
              disabled={disabled}
            >
              確認コードを再送する {disabled ? `(${count}秒後)` : ""}
            </button>
          </div>
          <div className="w-fit">
            <BorderRoundButton type="submit" fontSize="text-lg">
              次へ
            </BorderRoundButton>
          </div>
        </form>
      </ThemeProvider>
      <LoadingLayer working={isProcessing} />
    </>
  );
};

export { VerificationForm };
