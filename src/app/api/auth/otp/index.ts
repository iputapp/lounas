import { z } from "zod";

/** signup schema */
const signupSchema = z.object({
  email: z.string().email({ message: "正しいメールアドレスを入力してください。" }),
  agreePolicy: z.literal(true, { errorMap: () => ({ message: "同意が必要です。" }) }),
});

/** type of signup schema */
type Signup = z.infer<typeof signupSchema>;

export { signupSchema };
export type { Signup };
