import "dotenv/config";
import { cleanEnv, host, num, port, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  JWT_ACCESS_SECRET: str(),
  JWT_ACCESS_LIFETIME: num(),
  JWT_REFRESH_SECRET: str(),
  JWT_REFRESH_LIFETIME: num(),
  BASE_URL: host(),
  ISSUER: str(),
});

export default env;
