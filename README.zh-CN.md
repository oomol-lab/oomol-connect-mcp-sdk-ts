# Oomol Connect MCP SDK

[English Documentation](./README.md)

用于 Oomol Connect 的 MCP (Model Context Protocol) SDK，支持集成到 Cherry Studio、VSCode 等 MCP 兼容客户端。

## 特性

- ✅ 基于官方 `@modelcontextprotocol/sdk` 的完整 MCP 协议支持
- ✅ 10 个工具覆盖 Oomol Connect 所有功能
- ✅ 完整的 TypeScript 类型支持
- ✅ 文件上传支持（本地路径和 base64 编码）
- ✅ 指数退避的智能轮询策略
- ✅ 实时进度监控
- ✅ 轻松集成 Cherry Studio、VSCode、Claude Desktop

## 安装

### 全局安装

```bash
npm install -g oomol-connect-mcp-sdk-ts
```

### 使用 npx（推荐）

```bash
npx -y oomol-connect-mcp-sdk-ts
```

### 本地开发

```bash
git clone <repository-url>
cd oomol-connect-mcp-sdk-ts
npm install
npm run build
```

## 配置

### 环境变量

| 变量名 | 说明 | 是否必需 | 默认值 |
|--------|------|---------|--------|
| `OOMOL_CONNECT_BASE_URL` | API 基础 URL | 是 | - |
| `OOMOL_CONNECT_API_TOKEN` | API Token（推荐） | 二选一 | - |
| `OOMOL_CONNECT_AUTH_HEADER` | 完整的 Authorization 头 | 二选一 | - |
| `MCP_SERVER_NAME` | MCP Server 名称 | 否 | "oomol-connect" |
| `MCP_SERVER_VERSION` | MCP Server 版本 | 否 | package.json 版本 |
| `OOMOL_CONNECT_DEFAULT_TIMEOUT` | 默认超时时间(毫秒) | 否 | 300000 (5分钟) |

### 配置示例

```bash
# 必需配置
export OOMOL_CONNECT_BASE_URL="http://localhost:3000/api"

# 认证方式（二选一）
export OOMOL_CONNECT_API_TOKEN="your-token-here"
# 或
export OOMOL_CONNECT_AUTH_HEADER="Bearer your-token-here"

# 可选配置
export OOMOL_CONNECT_DEFAULT_TIMEOUT="300000"
```

## MCP 客户端集成

### Cherry Studio

在 Cherry Studio 的 MCP 配置中添加：

```json
{
  "mcpServers": {
    "oomol-connect": {
      "command": "npx",
      "args": ["-y", "oomol-connect-mcp-sdk-ts"],
      "env": {
        "OOMOL_CONNECT_BASE_URL": "http://localhost:3000/api",
        "OOMOL_CONNECT_API_TOKEN": "your-token-here"
      }
    }
  }
}
```

### Claude Desktop

添加到 `~/Library/Application Support/Claude/claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "oomol-connect": {
      "command": "npx",
      "args": ["-y", "oomol-connect-mcp-sdk-ts"],
      "env": {
        "OOMOL_CONNECT_BASE_URL": "http://localhost:3000/api",
        "OOMOL_CONNECT_API_TOKEN": "your-token-here"
      }
    }
  }
}
```

### VSCode

在 VSCode 设置中配置或使用 MCP 扩展。

## 可用工具

### 高层工具（推荐，用户友好）

1. **list_flows** - 列出所有可用的 flows
2. **list_blocks** - 列出所有可用的 blocks
3. **list_tasks** - 列出任务历史
4. **execute_task** - 执行任务并等待结果（最常用）
5. **execute_task_with_files** - 执行任务（含文件上传）
6. **list_packages** - 列出已安装的包
7. **install_package** - 安装包并等待完成

### 低层工具（高级用户，精细控制）

8. **create_task** - 仅创建任务（异步，不等待）
9. **get_task** - 查询任务状态
10. **stop_task** - 停止运行中的任务

## 使用示例

### 执行任务

```json
{
  "tool": "execute_task",
  "arguments": {
    "manifest": "flows/my-flow.yaml",
    "inputValues": {
      "input1": "value1",
      "input2": 123
    },
    "pollIntervalMs": 2000,
    "timeoutMs": 300000
  }
}
```

### 执行任务（含文件上传）

```json
{
  "tool": "execute_task_with_files",
  "arguments": {
    "manifest": "flows/image-process.yaml",
    "inputValues": {
      "processType": "resize"
    },
    "files": [
      {
        "path": "/absolute/path/to/image.jpg"
      }
    ]
  }
}
```

### 安装包

```json
{
  "tool": "install_package",
  "arguments": {
    "name": "package-name",
    "version": "1.0.0"
  }
}
```

## 编程式使用

```typescript
import { OomolConnectMcpServer } from "oomol-connect-mcp-sdk-ts";

const server = new OomolConnectMcpServer({
  baseUrl: "http://localhost:3000/api",
  authHeader: "Bearer your-token",
  name: "my-server",
  version: "1.0.0",
});

await server.run();
```

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 开发模式（监听）
npm run dev

# 本地运行
npm start
```

## 架构

本 SDK 基于：
- `@modelcontextprotocol/sdk` - 官方 MCP SDK
- `oomol-connect-sdk` - Oomol Connect API 客户端

该 SDK 为 `oomol-connect-sdk` 提供零业务逻辑重复的 MCP 协议封装。

## 许可证

MIT

## 贡献

欢迎贡献！请提交 issue 或 pull request。

## 相关项目

- [oomol-connect-sdk-ts](../oomol-connect-sdk-ts) - 核心 Oomol Connect SDK
- [oomol-cloud-mcp-sdk-ts](../oomol-cloud-mcp-sdk-ts) - Oomol Cloud 的 MCP SDK

## 支持

问题和咨询：
- GitHub Issues: [创建 issue](https://github.com/your-org/oomol-connect-mcp-sdk-ts/issues)
- 文档：查看 examples 文件夹获取更多使用示例
