import { z } from "zod";

/** verification schema */
const verificationSchema = z.object({
  password: z
    .string()
    .length(6, { message: "6桁の数字を入力してください。" })
    .regex(/^[0-9]+$/, { message: "数字のみを入力してください。" }),
});

/** type of verification schema */
type Verification = z.infer<typeof verificationSchema>;

export { verificationSchema };
export type { Verification };
