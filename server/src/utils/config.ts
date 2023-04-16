import configDevJson from "./config-dev.json";
import configContainerizedJson from "./config-containerized.json";

interface Config {
  db: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
}

let config: Config;

if (process.env.NODE_ENV === "containerized") {
  config = configContainerizedJson as Config;
} else {
  config = configDevJson as Config;
}

export { config };
