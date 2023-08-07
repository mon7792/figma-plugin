export type Options = {
  apiJwtKey: string;
  apiPortNo: number;
  feOriginUrl: string;
  dbHostName: string;
  dbName: string;
  dbUserName: string;
  dbPassword: string;
  dbPortNo: number;
  dbSsl: boolean;
  cronInterval: string;
  sessionName: string;
  sessionSecret: string;
  sessionMaxAge: number;
  outhClientID: string;
  outhClientSecret: string;
  outhCallbackUrl: string;
};

const defOption: Options = {
  apiJwtKey: "",
  apiPortNo: 8080,
  feOriginUrl: "",
  dbHostName: "127.0.0.1",
  dbName: "wf",
  dbUserName: "postgres",
  dbPassword: "docker",
  dbPortNo: 5432,
  dbSsl: false,
  cronInterval: "*/5 * * * * *",
  sessionName: "sid",
  sessionSecret: "keyboard cat",
  sessionMaxAge: 60 * 60 * 1000 * 8,
  outhClientID: "6142976f939897fe33a5",
  outhClientSecret: "4e556615fa3c32c6f58d57e34af7808e247d6b43",
  outhCallbackUrl: "http://localhost:8080/auth/github/callback",
};

// getAppOpts returns all the environment variables.
export const getAppOpts = (): Options => {
  const appOpts = defOption;

  // appOpts.apiJwtKey = checkEnvVariable(
  //   "RINN_API_JWT_KEY",
  //   process.env.RINN_API_JWT_KEY || ""
  // );

  // appOpts.apiPortNo = parseInt(
  //   checkEnvVariable("RINN_API_PORT_NO", process.env.RINN_API_PORT_NO || "8080")
  // );

  // appOpts.feOriginUrl = checkEnvVariable(
  //   "RINN_FE_ORIGIN_URL",
  //   process.env.RINN_FE_ORIGIN_URL || ""
  // );

  // appOpts.dbHostName = checkEnvVariable(
  //   "RINN_DB_HOST",
  //   process.env.RINN_DB_HOST || ""
  // );

  // appOpts.dbName = checkEnvVariable(
  //   "RINN_DB_NAME",
  //   process.env.RINN_DB_NAME || ""
  // );

  // appOpts.dbUserName = checkEnvVariable(
  //   "RINN_DB_USER",
  //   process.env.RINN_DB_USER || ""
  // );

  // appOpts.dbPassword = checkEnvVariable(
  //   "RINN_DB_PASSWORD",
  //   process.env.RINN_DB_PASSWORD || ""
  // );

  // appOpts.dbPortNo = parseInt(
  //   checkEnvVariable("RINN_DB_PORT", process.env.RINN_DB_PORT || "5432")
  // );

  // appOpts.dbSsl =
  //   checkEnvVariable("RINN_DB_SSL", process.env.RINN_DB_SSL || "true") ===
  //   "true";

  // appOpts.cronInterval = checkEnvVariable(
  //   "RINN_CRON_INTERVAL",
  //   process.env.RINN_CRON_INTERVAL || ""
  // );

  return appOpts;
};

// checkEnvVariable check if the key is defined and return the value else throw error.
function checkEnvVariable(key: string, value: string): string {
  if (value.trim() === "") {
    throw Error(`Environment Variable ${key} not defined`);
  }

  return value.trim();
}
