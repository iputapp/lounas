import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import type { Verification } from "@/app/api/auth/otp/verification";
import { verificationSchema } from "@/app/api/auth/otp/verification";

/** sign-up hook form */
const VerificationHookForm = () => {
  const router = useRouter();

  /** hook form */
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
    clearErrors,
  } = useForm<Verification>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(verificationSchema),
  });

  // const watchedInput = useWatch({ control });
  // console.log("errors", errors);
  // console.log("watchedInput", watchedInput);

  /** called only when the value conversion and type checking for zod pass */
  const onSubmit = async (data: Verification): Promise<void> => {
    /** fetch to api route */
    await fetch("/api/auth/otp/verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          control.setError("password", {
            type: "manual",
            message: "認証に失敗しました。しばらくしてから再度お試しください。",
          });
          resetField("password");
          console.error("Error!", res.status);
          throw new Error(res.statusText);
        }

        router.replace("/privacy");
      })
      .catch((err) => {
        control.setError("password", { type: "manual", message: "通信に失敗しました。" });
        console.error("Error!", err);
      });
  };

  return {
    form: {
      control,
      handleSubmit,
      onSubmit,
      errors,
      resetField,
      clearErrors,
    },
  };
};

export { VerificationHookForm };
