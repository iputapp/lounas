import { ThemeProvider } from "@mui/material/styles";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { VerificationHookForm } from "@/hooks/auth/otp/VerificationHookForm";
import { theme } from "@/styles/mui";

import { BasicTextField } from "../../BasicTextField";

type VerificationFormProps = {
  className?: React.HTMLAttributes<HTMLFormElement>["className"];
};

const VerificationForm = ({ className = "" }: VerificationFormProps) => {
  const {
    form: { control, handleSubmit, onSubmit },
  } = VerificationHookForm();

  return (
    <ThemeProvider theme={theme}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form noValidate onSubmit={handleSubmit(onSubmit)} className={className}>
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
