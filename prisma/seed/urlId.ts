import { customAlphabet } from "nanoid";

import { URLID_CHARS, URLID_LENGTH } from "@/constants";

export function generateUrlId() {
  const nanoid = customAlphabet(URLID_CHARS, URLID_LENGTH);
  return nanoid();
}

export function generateRouteId(restaurantId: string, stepNumber: number) {
  return `${restaurantId}${("0000" + stepNumber).slice(-4)}${generateUrlId()}`;
}
