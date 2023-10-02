import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

/** form schema */
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください。" })
    .email({ message: "メールアドレスを入力してください。" })
    .regex(/^.+(tks\.iput\.ac\.jp)$/, { message: "不正なメールアドレスです。" }),
  agreePolicy: z.literal(true, { errorMap: () => ({ message: "同意が必要です。" }) }),
});
/** type of form schema */
type FormSchema = z.infer<typeof formSchema>;

/** sign-up hook form */
const SignupHookForm = () => {
  /** hook form */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(formSchema),
  });

  // const watchedInput = useWatch({ control });

  // console.log("errors", errors);
  // console.log("watchedInput", watchedInput);

  /** called only when the value conversion and type checking for zod pass */
  const onSubmit = (data: FormSchema): void => {
    console.log("data", data);
  };

  return {
    form: {
      control,
      handleSubmit,
      onSubmit,
      errors,
    },
  };
};

export { SignupHookForm };
