import { ThemeProvider } from "@mui/material/styles";

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
          <div className="relative w-full">
            <BasicTextField
              name="studentId"
              control={control}
              label="学籍番号"
              required
              inputProps={{ inputMode: "text", maxLength: 8 }}
            />
            <span className="absolute inset-y-0 right-0 my-auto h-fit text-neutral-800">
              @tks.iput.ac.jp
            </span>
          </div>
          <BasicCheckbox
            name="agreePolicy"
            control={control}
            label="利用規約に同意します。"
            required
          />
          <div className="mx-auto w-[88%]">
            <BorderRoundButton type="submit" fontSize="text-2xl">
              Sign Up
            </BorderRoundButton>
          </div>
        </form>
      </ThemeProvider>
      <LoadingLayer working={isProcessing} />
    </>
  );
};

export { SignupForm };
