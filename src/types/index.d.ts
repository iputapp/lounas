import { FieldValues, UseControllerProps } from "react-hook-form";

type ReactHookFormProps<T extends FieldValues = FieldValues> = Pick<
  UseControllerProps<T>,
  "name" | "control"
> & {
  label: string;
};

export type { ReactHookFormProps };
