import bcryptjs from "bcryptjs";

//   check password matched
export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(plainPassword, hashedPassword);
};
