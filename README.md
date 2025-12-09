# Oomol Connect MCP SDK

[中文文档](./README.zh-CN.md)

MCP (Model Context Protocol) SDK for Oomol Connect, enabling integration with Cherry Studio, VSCode, and other MCP-compatible clients.

## Features

- ✅ Full MCP protocol support based on official `@modelcontextprotocol/sdk`
- ✅ 10 tools covering all Oomol Connect functionality
- ✅ Complete TypeScript type support
- ✅ File upload support (local paths and base64 encoding)
- ✅ Intelligent polling with exponential backoff
- ✅ Real-time progress monitoring
- ✅ Easy integration with Cherry Studio, VSCode, Claude Desktop

## Installation

### Global Installation

```bash
npm install -g oomol-connect-mcp-sdk-ts
```

### Using npx (Recommended)

```bash
npx -y oomol-connect-mcp-sdk-ts
```

### Local Development

```bash
git clone <repository-url>
cd oomol-connect-mcp-sdk-ts
npm install
npm run build
```

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OOMOL_CONNECT_BASE_URL` | API base URL | Yes | - |
| `OOMOL_CONNECT_API_TOKEN` | API token | Yes | - |
| `MCP_SERVER_NAME` | MCP server name | No | "oomol-connect" |
| `MCP_SERVER_VERSION` | MCP server version | No | package.json version |
| `OOMOL_CONNECT_DEFAULT_TIMEOUT` | Default timeout (ms) | No | 300000 (5 min) |

### Example Configuration

```bash
# Required
export OOMOL_CONNECT_BASE_URL="http://localhost:3000/api"
export OOMOL_CONNECT_API_TOKEN="api-your-token-here"

# Optional
export OOMOL_CONNECT_DEFAULT_TIMEOUT="300000"
```

## MCP Client Integration

### Cherry Studio

Add to Cherry Studio's MCP configuration:

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

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

Configure in VSCode settings or use the MCP extension.

## Available Tools

### High-Level Tools (Recommended)

1. **list_flows** - List all available flows
2. **list_blocks** - List all available blocks
3. **list_tasks** - List task history
4. **execute_task** - Execute task and wait for completion (most common)
5. **execute_task_with_files** - Execute task with file uploads
6. **list_packages** - List installed packages
7. **install_package** - Install package and wait for completion

### Low-Level Tools (Advanced)

8. **create_task** - Create task without waiting (async)
9. **get_task** - Query task status
10. **stop_task** - Stop running task

## Usage Examples

### Execute a Task

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

### Execute Task with Files

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

### Install a Package

```json
{
  "tool": "install_package",
  "arguments": {
    "name": "package-name",
    "version": "1.0.0"
  }
}
```

## Programmatic Usage

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

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode (watch)
npm run dev

# Run locally
npm start
```

## Architecture

This SDK is built on:
- `@modelcontextprotocol/sdk` - Official MCP SDK
- `oomol-connect-sdk` - Oomol Connect API client

The SDK provides a zero-logic-duplication wrapper around `oomol-connect-sdk`, exposing its functionality through the MCP protocol.

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Related Projects

- [oomol-connect-sdk-ts](../oomol-connect-sdk-ts) - Core Oomol Connect SDK
- [oomol-cloud-mcp-sdk-ts](../oomol-cloud-mcp-sdk-ts) - MCP SDK for Oomol Cloud

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/your-org/oomol-connect-mcp-sdk-ts/issues)
- Documentation: See examples folder for more usage patterns
