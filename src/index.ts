#!/usr/bin/env node

import { fileURLToPath } from "url";
import { realpathSync } from "fs";
import { OomolConnectMcpServer } from "./server.js";
import { validateAndLoadConfig } from "./utils/env-validator.js";

// 导出主类和类型（用于编程式使用）
export { OomolConnectMcpServer } from "./server.js";
export type { ServerOptions, ToolResponse, FileInput } from "./types.js";

/**
 * CLI 入口主函数
 */
async function main() {
  try {
    // 验证并加载环境变量配置
    const config = validateAndLoadConfig();

    // 创建并启动 MCP Server
    const server = new OomolConnectMcpServer(config);

    // 优雅关闭处理
    process.on("SIGINT", async () => {
      console.error("\nShutting down gracefully...");
      await server.close();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.error("\nReceived SIGTERM, shutting down...");
      await server.close();
      process.exit(0);
    });

    // 启动服务
    await server.run();
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

/**
 * 检查是否是直接执行（支持符号链接）
 * 用于区分是作为 CLI 运行还是作为模块导入
 */
const isMainModule = () => {
  if (!process.argv[1]) return false;

  try {
    const scriptPath = fileURLToPath(import.meta.url);
    // 解析符号链接到真实路径（用于 npm 全局安装）
    const argv1Real = realpathSync(process.argv[1]);

    // 比较真实路径
    return scriptPath === argv1Real;
  } catch (error) {
    return false;
  }
};

// 如果是直接执行（非 import），则运行主函数
if (isMainModule()) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
