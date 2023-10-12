import { z } from "zod";

export const visitsCountSchema = z.number();

export type VisitsCount = z.infer<typeof visitsCountSchema>;
