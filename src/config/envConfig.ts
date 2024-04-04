// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config().parsed;

interface ENV {
  TRACKAPETS_TABLE_NAME: string | undefined;
  TRACKAPETS_MAIL_QUEUE_URL: string | undefined;
  TRACKAPETS_BUCKET: string | undefined;
}

interface Config {
  TRACKAPETS_TABLE_NAME: string;
  TRACKAPETS_MAIL_QUEUE_URL: string;
  TRACKAPETS_BUCKET: string;
}

export const getConfig = (): ENV => {
  return {
    TRACKAPETS_TABLE_NAME: process.env.TRACKAPETS_TABLE_NAME,
    TRACKAPETS_MAIL_QUEUE_URL: process.env.TRACKAPETS_MAIL_QUEUE_URL,
    TRACKAPETS_BUCKET: process.env.TRACKAPETS_BUCKET,
  };
};

const getSanitezedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitezedConfig(config);

export default sanitizedConfig;
