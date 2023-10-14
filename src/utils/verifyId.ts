import { z } from "zod";

const uriIdSchema = z
  .string()
  .length(8)
  .regex(/^[0-9A-F]+$/);

const uuidSchema = z.string().uuid();

export function verifyUrlId(id: string) {
  if (!uriIdSchema.safeParse(id).success) return returnErrorMessage();
  return true;
}

export function verifyUuid(id: string) {
  if (!uuidSchema.safeParse(id).success) return returnErrorMessage();
  return true;
}

function returnErrorMessage() {
  return new Response("Invalid ID", {
    status: 404,
    statusText: "Bad Request",
  });
}
