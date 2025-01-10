import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 8000,
  db_url: process.env.MONGO_URI,
  bcrypt_salt: process.env.BCRYPT_SALT_ROUND,
};
