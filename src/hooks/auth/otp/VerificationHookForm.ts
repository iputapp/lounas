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
        console.log("res", res);
        router.push("/webapp/privacy");
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

export { VerificationHookForm };
