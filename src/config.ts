import { promises as fsPromises } from "fs";

interface IConfig {
  bearer_token: string,
  webhooks: [
    {
      tag: string
      id: string,
      token: string
    }
  ]
}

export async function loadConfig(path = "../config.json"): Promise<IConfig> {
  const configString = await fsPromises.readFile(path);
  return JSON.parse(configString.toString());
}
