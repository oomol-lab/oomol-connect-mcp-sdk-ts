import { OomolConnectMcpServer } from "../src/index.js";

async function main() {
  // 从环境变量读取配置
  const baseUrl = process.env.OOMOL_CONNECT_BASE_URL;
  const apiToken = process.env.OOMOL_CONNECT_API_TOKEN;

  if (!baseUrl) {
    console.error("Error: OOMOL_CONNECT_BASE_URL environment variable is required");
    process.exit(1);
  }

  if (!apiToken) {
    console.error("Error: OOMOL_CONNECT_API_TOKEN environment variable is required");
    process.exit(1);
  }

  // 创建 MCP Server
  const server = new OomolConnectMcpServer({
    baseUrl,
    authHeader: apiToken,
    name: "oomol-connect-example",
    version: "1.0.0",
  });

  // 优雅关闭
  process.on("SIGINT", async () => {
    console.error("\nShutting down...");
    await server.close();
    process.exit(0);
  });

  console.error("Starting Oomol Connect MCP Server...");
  await server.run();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
