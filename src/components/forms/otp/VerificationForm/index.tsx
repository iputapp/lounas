import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { VerificationHookForm } from "@/hooks/auth/otp/VerificationHookForm";
import { theme } from "@/styles/mui";

import { BasicTextField } from "../../BasicTextField";

type VerificationFormProps = {
  className?: React.HTMLAttributes<HTMLFormElement>["className"];
};

const VerificationForm = ({ className = "" }: VerificationFormProps) => {
  const {
    form: { control, handleSubmit, onSubmit, resetField },
  } = VerificationHookForm();

  /** 確認コード再送ボタン */
  const time = 10; // 再送までの時間 (秒)
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(time);

  const timerResend = () => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setDisabled(false);
      setCount(time);
    }, 1000 * time);
  };

  /** 確認コード再送 */
  const handleResend = async () => {
    setDisabled(true);
    timerResend();

    await fetch("/api/auth/verification/resend", {
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
  );
};

export { VerificationForm };
