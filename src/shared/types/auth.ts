import { User } from "../../entities/user";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}
