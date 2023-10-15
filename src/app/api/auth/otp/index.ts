import { z } from "zod";

/** signup schema */
const signupSchema = z.object({
  studentId: z.string().regex(/^(tk|TK)?\d{6}$/, { message: "学籍番号を入力してください。" }),
  agreePolicy: z.literal(true, { errorMap: () => ({ message: "同意が必要です。" }) }),
});

/** type of signup schema */
type Signup = z.infer<typeof signupSchema>;

export { signupSchema };
export type { Signup };
