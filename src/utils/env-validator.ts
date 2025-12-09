import type { ServerOptions } from "../types.js";

/**
 * 验证并加载环境变量配置
 */
export function validateAndLoadConfig(): ServerOptions {
  const baseUrl = process.env.OOMOL_CONNECT_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      "OOMOL_CONNECT_BASE_URL environment variable is required\n" +
      "Example: export OOMOL_CONNECT_BASE_URL=http://localhost:3000/api"
    );
  }

  const apiToken = process.env.OOMOL_CONNECT_API_TOKEN;

  if (!apiToken) {
    throw new Error(
      "OOMOL_CONNECT_API_TOKEN environment variable is required\n" +
      "Example: export OOMOL_CONNECT_API_TOKEN=api-your-token-here"
    );
  }

  return {
    baseUrl,
    authHeader: apiToken,
    name: process.env.MCP_SERVER_NAME,
    version: process.env.MCP_SERVER_VERSION,
    defaultTimeoutMs: parseInt(
      process.env.OOMOL_CONNECT_DEFAULT_TIMEOUT || "300000"
    ),
    maxPollIntervalMs: 10000, // 固定为 10 秒
  };
}
