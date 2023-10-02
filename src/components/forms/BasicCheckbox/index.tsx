import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FieldValues, useController } from "react-hook-form";

import type { ReactHookFormProps } from "@/types";

type BasicCheckboxProps<T extends FieldValues> = ReactHookFormProps<T> & {
  required?: boolean;
};

const BasicCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
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
    <FormControl required={required} className="ms-4 grid w-fit gap-2" sx={{ color: "#525252" }}>
      <FormControlLabel
        control={
          <Checkbox
            inputRef={field.ref}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        }
        label={label}
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </FormControl>
  );
};

export { BasicCheckbox };
