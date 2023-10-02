import { z } from "zod";

/** allowed domains */
const allowedDomains = ["tks.iput.ac.jp", "iput.ac.jp"] as readonly string[];

/** signup schema */
const signupSchema = z.object({
  email: z
    .string()
    .email({ message: "メールアドレスを入力してください。" })
    .refine((value) => allowedDomains.some((domain) => value.endsWith(`@${domain}`)), {
      message: "学内のメールアドレスを入力してください。",
    }),
  agreePolicy: z.literal(true, { errorMap: () => ({ message: "同意が必要です。" }) }),
});
/** type of signup schema */
type Signup = z.infer<typeof signupSchema>;

export { signupSchema };
export type { Signup };
