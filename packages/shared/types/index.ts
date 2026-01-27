export * from "./api";
export * from "./global/query";
export interface JwtTokenData {
  _id: string;
  email: string;
  active: boolean;
  user_type: string | null;
  iat: number;
  exp: number;
}
