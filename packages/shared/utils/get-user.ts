import jwt_decode from "jwt-decode";
import { JwtTokenData } from "shared/types";

export function getUser(): JwtTokenData | null {
  const access_token = localStorage.getItem("access_token") || "";
  try {
    const decoded: JwtTokenData = jwt_decode(access_token);
    return decoded;
  } catch (err) {
    return null;
  }
}
