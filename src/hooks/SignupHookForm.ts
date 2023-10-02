import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import type { Signup } from "@/app/api/auth/otp";
import { signupSchema } from "@/app/api/auth/otp";

/** sign-up hook form */
const SignupHookForm = () => {
  const router = useRouter();

  /** hook form */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(signupSchema),
  });

  // const watchedInput = useWatch({ control });
  // console.log("errors", errors);
  // console.log("watchedInput", watchedInput);

  /** called only when the value conversion and type checking for zod pass */
  const onSubmit = async (data: Signup): Promise<void> => {
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
        router.push("/signup/confirm");
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
