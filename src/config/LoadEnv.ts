import { config } from "dotenv";
import { cleanEnv, url, num, EnvError, EnvMissingError } from "envalid";

config();

const env = cleanEnv(
  process.env,
  {
    DATABASE_URL: url(),
    PORT: num(),
  },
  {
    reporter: ({ errors }) => {
      if (Object.keys(errors).length > 0) {
        for (const [key, value] of Object.entries(errors)) {
          if (value instanceof EnvMissingError) {
            console.log(`Environment variable ${key} is missing`);
          } else if (value instanceof EnvError) {
            console.log(`Environment variable ${key} is invalid`);
          } else {
            console.log(`Error: ${errors}`);
          }
          process.exit(1);
        }
      }
    },
  }
);

export default env;
