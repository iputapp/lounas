"use client";

import { ThemeProvider } from "@mui/material/styles";
import Link from "next/link";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { LoadingLayer } from "@/components/overlays/LoadingLayer";
import { SignupHookForm } from "@/hooks/auth/otp/SignupHookForm";
import { theme } from "@/styles/mui";

import { BasicCheckbox } from "../../BasicCheckbox";
import { BasicTextField } from "../../BasicTextField";

type SignupFormProps = {
  className?: React.HTMLAttributes<HTMLFormElement>["className"];
};

const SignupForm = ({ className = "" }: SignupFormProps) => {
  const {
    form: { control, handleSubmit, onSubmit },
    status: { isProcessing },
  } = SignupHookForm();

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form noValidate onSubmit={handleSubmit(onSubmit)} className={className}>
          <div className="relative h-14 w-full">
            <BasicTextField
              name="email"
              control={control}
              label="メールアドレス"
              required
              inputProps={{ inputMode: "email", maxLength: 100 }}
            />
            {/* <span className="absolute inset-y-0 right-0 my-auto h-fit select-none text-neutral-800">
              @tks.iput.ac.jp
            </span> */}
          </div>
          <div className="hidden">
            <BasicCheckbox
              name="agreePolicy"
              control={control}
              label="利用規約に同意します。"
              required
              /** @todo 同意したとみなします (削除要検討) @see SignupHookForm */
              defaultChecked={true}
            />
          </div>
          <div className="grid gap-0.5 text-xs text-neutral-600">
            <span className="text-center">
              アカウントを登録することにより
              <Link
                className="text-blue-600"
                href={"/tos"}
                target="_blank"
                rel="noopener noreferrer"
              >
                利用規約
              </Link>
              に同意したとみなされます。
            </span>
          </div>
          <div className="mx-auto w-[88%]">
            <BorderRoundButton type="submit" fontSize="text-2xl">
              Sign Up / In
            </BorderRoundButton>
          </div>
        </form>
      </ThemeProvider>
      <LoadingLayer working={isProcessing} />
    </>
  );
};

export { SignupForm };
