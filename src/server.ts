import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OomolConnectClient } from "oomol-connect-sdk";
import { registerTools } from "./tools/index.js";
import type { ServerOptions } from "./types.js";

/**
 * Oomol Connect MCP Server
 * 提供 MCP 协议接口，封装 oomol-connect-sdk 的功能
 */
export class OomolConnectMcpServer {
  private mcpServer: McpServer;
  private connectClient: OomolConnectClient;

  constructor(options: ServerOptions) {
    // 初始化 Oomol Connect Client
    this.connectClient = new OomolConnectClient({
      baseUrl: options.baseUrl,
      defaultHeaders: {
        Authorization: options.authHeader,
      },
    });

    // 初始化 MCP Server
    this.mcpServer = new McpServer(
      {
        name: options.name ?? "oomol-connect",
        version: options.version ?? "1.0.0",
      },
      {
        capabilities: {
          tools: {}, // 声明支持 tools 能力
        },
      }
    );

    // 注册所有 Tools
    registerTools(this.mcpServer, this.connectClient, options);
  }

  /**
   * 启动 MCP Server（通过 stdio 通信）
   */
  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.mcpServer.connect(transport);

    // 使用 stderr 输出，不影响 MCP 协议的 stdout 通信
    console.error("Oomol Connect MCP Server started on stdio");
    console.error(`Base URL: ${this.connectClient["baseUrl"] || "N/A"}`);
  }

  /**
   * 优雅关闭 Server
   */
  async close(): Promise<void> {
    await this.mcpServer.close();
    console.error("Oomol Connect MCP Server closed");
  }
}
