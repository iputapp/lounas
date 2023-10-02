import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import type { FormSchema } from "@/app/api/auth/signup";
import { formSchema } from "@/app/api/auth/signup";

/** sign-up hook form */
const SignupHookForm = () => {
  const router = useRouter();

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
  const onSubmit = async (data: FormSchema): Promise<void> => {
    /** fetch to api route */
    await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("res", res);
        router.push("/signup/otp");
      })
      .catch((err) => console.log("err", err));
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
