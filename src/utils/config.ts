import yaml from "js-yaml";
import fs from "fs";

export type Config = {
  private: {
    host: string;
    port: number;

    logging: {
      upload: boolean;
    };
  };

  public: {
    host: string;
    port: number;
  };

  logging: {
    webhookUrl: string;
  };
};

const root = process.cwd();

let config: Config | undefined = undefined;

export async function loadConfig() {
  const configPath = root + "/config.yml";

  config = yaml.load(fs.readFileSync(configPath, "utf-8")) as Config;
  //return yaml.load(fs.readFileSync(configPath, "utf-8")) as Config;
}

export function getConfig(): Config {
  if (!config) {
    throw new Error("Config has not been loaded. Call loadConfig() first.");
  }

  return config;
}
