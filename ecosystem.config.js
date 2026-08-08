const fs = require("fs");

const ENV_PATH = "/home/opc/apps/.env";

function loadEnv() {
  const env = {};

  if (!fs.existsSync(ENV_PATH)) {
    console.warn("⚠️ .env file not found at", ENV_PATH);
    return env;
  }

  const lines = fs.readFileSync(ENV_PATH, "utf-8").split("\n");

  for (const line of lines) {
    if (!line || line.startsWith("#")) continue;

    const [key, ...rest] = line.split("=");
    env[key.trim()] = rest.join("=").trim().replace(/^"|"$/g, "");
  }

  return env;
}

module.exports = {
  apps: [
    {
      name: "online-tool-base",
      script: "npm",
      args: "start",
      cwd: "/home/opc/apps/current",

      env: {
        ...loadEnv(),
        NODE_ENV: "production",
      },
    },
  ],
};
