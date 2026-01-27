import { QueryObject } from "shared/types";

export default function flattenObject(
  obj: QueryObject,
  final: QueryObject = {},
  str: string = ""
): Record<string, string | number | Array<number | string>> {
  return Object.keys(obj).reduce((acc, curr) => {
    const k = `${str}${str ? `[${curr}]` : curr}`;
    if (obj[curr] instanceof Object && !Array.isArray(obj[curr])) {
      return flattenObject(obj[curr], acc, k);
    }
    acc[k] = obj[curr];

    return acc;
  }, final);
}
