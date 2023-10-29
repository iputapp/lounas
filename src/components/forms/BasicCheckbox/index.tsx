import Cancel from "@icons/cancel.svg";
import Check from "@icons/check.svg";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FieldValues, useController } from "react-hook-form";

import type { ReactHookFormProps } from "@/types";

type BasicCheckboxProps<T extends FieldValues> = ReactHookFormProps<T> & {
  required?: boolean;
  defaultChecked?: boolean;
};

const BasicCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  defaultChecked,
}: BasicCheckboxProps<T>) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const errorMessage = errors[name]?.message as string;

  return (
    <FormControl required={required} className="ms-4 grid w-fit gap-0" sx={{ color: "#525252" }}>
      <FormControlLabel
        control={
          <Checkbox
            inputRef={field.ref}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            defaultChecked={defaultChecked}
          />
        }
        label={label}
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
    </FormControl>
  );
};

export { BasicCheckbox };
