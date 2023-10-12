import { z } from "zod";

import { UserSchema } from "@/lib/zod";

export const dataAgreementRequestSchema = UserSchema.pick({
  dataUsageAgreed: true,
});

export type DataAgreementRequest = z.infer<typeof dataAgreementRequestSchema>;
