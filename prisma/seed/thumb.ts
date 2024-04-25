import { promises as fs } from "fs";

export const RESTAURANT_ID_NAME_OUTPUT = "./restaurantNameId.json";
export const DISH_ID_NAME_OUTPUT = "./dishNameId.json";

export function nameIdMapToJson(idNameMap: Map<string, string>) {
  const idName = Array.from(idNameMap).map(([name, id]) => ({ name, id }));
  return JSON.stringify(idName);
}

export async function writeJson(path: string, json: string) {
  console.log("writing...");
  await fs.writeFile(path, json);
  console.log("written");
}
