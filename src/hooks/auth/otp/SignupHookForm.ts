import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Signup } from "@/app/api/auth/otp";
import { signupSchema } from "@/app/api/auth/otp";

/** sign-up hook form */
const SignupHookForm = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

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
    /** set status */
    setIsProcessing(true);

    /** fetch to api route */
    await fetch("/api/auth/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Error!", res.status);
          control.setError("email", {
            type: "manual",
            message: "メールの送信に失敗しました。メールアドレスを確認してください。",
          });
          throw new Error(res.statusText);
        }

        router.push("/signup/verify");
      })
      .catch((err) => {
        control.setError("email", { type: "manual", message: "通信に失敗しました。" });
        console.error("Error!", err);
      })
      .finally(() => {
        /** set status */
        setIsProcessing(false);
      });
  };

  return {
    form: {
      control,
      handleSubmit,
      onSubmit,
      errors,
    },
    status: {
      isProcessing: isProcessing,
    },
  };
};

export { SignupHookForm };
