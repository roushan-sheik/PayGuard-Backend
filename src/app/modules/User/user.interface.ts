import { USER_ROLE } from "./user.constant";

export type TUser = {
  email: string;
  password: string;
  role?: keyof typeof USER_ROLE;
  refreshToken?: string;
};
