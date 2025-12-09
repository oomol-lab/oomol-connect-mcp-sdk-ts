/**
 * MCP Server 配置选项
 */
export interface ServerOptions {
  /** API 基础 URL */
  baseUrl: string;
  /** Authorization 头内容 */
  authHeader: string;
  /** MCP Server 名称 */
  name?: string;
  /** MCP Server 版本 */
  version?: string;
  /** 默认超时时间（毫秒） */
  defaultTimeoutMs?: number;
  /** 最大轮询间隔（毫秒） */
  maxPollIntervalMs?: number;
}

/**
 * MCP Tool 响应格式
 */
export interface ToolResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  isError?: boolean;
  [key: string]: unknown; // 允许任意额外属性以满足 MCP SDK 要求
}

/**
 * 文件输入格式（支持路径和 base64 两种方式）
 */
export interface FileInput {
  /** 文件路径（绝对路径） */
  path?: string;
  /** base64 编码的文件内容 */
  base64?: string;
  /** 文件名（base64 模式必需） */
  filename?: string;
  /** MIME 类型（可选） */
  mimeType?: string;
}
