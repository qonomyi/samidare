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

export function loadConfig(): Config {
  const configPath = root + "/config.yml";
  return yaml.load(fs.readFileSync(configPath, "utf-8")) as Config;
}
