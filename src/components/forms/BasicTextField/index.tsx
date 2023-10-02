import Cancel from "@icons/cancel.svg";
import Check from "@icons/check.svg";
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
  inputProps,
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
        inputProps={inputProps}
      />
      <div className="flex items-center space-x-1 text-xs">
        {errorMessage ? (
          <span className="text-red-600">
            <Cancel />
          </span>
        ) : (
          field.value && (
            <span className="text-green-600">
              <Check />
            </span>
          )
        )}
        {errorMessage && <span className="text-red-600">{errorMessage}</span>}
      </div>
    </div>
  );
};

export { BasicTextField };
