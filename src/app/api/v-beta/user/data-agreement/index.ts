import { z } from "zod";

export const dataAgreementRequestSchema = z.object({
  dataUsageAgreed: z.boolean(),
});

export type DataAgreementRequest = z.infer<typeof dataAgreementRequestSchema>;
