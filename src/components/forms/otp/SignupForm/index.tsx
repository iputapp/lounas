import { ThemeProvider } from "@mui/material/styles";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
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
  } = SignupHookForm();

  return (
    <ThemeProvider theme={theme}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={className}>
        <BasicTextField name="email" control={control} label="メールアドレス" required />
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
  );
};

export { SignupForm };
