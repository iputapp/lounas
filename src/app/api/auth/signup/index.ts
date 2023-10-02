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

export { formSchema };
export type { FormSchema };
