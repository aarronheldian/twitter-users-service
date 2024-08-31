import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});

export default env;
