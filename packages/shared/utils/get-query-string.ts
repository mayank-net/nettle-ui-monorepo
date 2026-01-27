import { QueryObject } from "shared/types";
import flattenObject from "./flatten-object";

export default function getQueryString(queryObject: QueryObject = {}): string {
  const flatQueryObject: QueryObject = flattenObject(queryObject);
  return Object.keys(flatQueryObject)
    .reduce((a: string[], k: string): string[] => {
      if (Array.isArray(flatQueryObject[k])) {
        a = a.concat(
          flatQueryObject[k].map(
            (arrItem: string | number | boolean): string =>
              `${k}[]=${encodeURIComponent(arrItem)}`
          )
        );
      } else if (encodeURIComponent(flatQueryObject[k]) !== "null") {
        a.push(`${k}=${encodeURIComponent(flatQueryObject[k])}`);
      }

      return a;
    }, [])
    .join("&");
}
