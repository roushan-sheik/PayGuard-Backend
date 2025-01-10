import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 8000,
  db_url: process.env.MONGO_URI,
  bcrypt_salt: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    access_token_expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refresh_token_expiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    reset_token_secret: process.env.JWT_RESET_PASSWORD_TOKEN_SECRET,
    reset_token_expiration:
      process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRATION_TIME,
  },
};
