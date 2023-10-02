import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import { FieldValues, useController } from "react-hook-form";

import type { ReactHookFormProps } from "@/types";

type BasicTextFieldProps<T extends FieldValues> = ReactHookFormProps<T> & TextFieldProps;

const BasicTextField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  variant = "standard",
  autoComplete = "off",
}: BasicTextFieldProps<T>) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const errorMessage = errors[name]?.message as string;

  return (
    <div className="grid w-full gap-2">
      <TextField
        inputRef={field.ref}
        value={field.value ?? ""}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        label={label}
        fullWidth
        required={required}
        variant={variant}
        autoComplete={autoComplete}
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};

export { BasicTextField };
