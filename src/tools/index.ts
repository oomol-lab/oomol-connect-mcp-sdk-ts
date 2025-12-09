import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import type { OomolConnectClient } from "oomol-connect-sdk";
import { handleListFlows } from "./flows.js";
import { handleListBlocks } from "./blocks.js";
import {
  handleListTasks,
  handleExecuteTask,
  handleExecuteTaskWithFiles,
  handleCreateTask,
  handleGetTask,
  handleStopTask,
} from "./tasks.js";
import { handleListPackages, handleInstallPackage } from "./packages.js";
import type { ServerOptions } from "../types.js";

/**
 * 获取所有工具的定义列表
 */
export function getToolsList() {
  return [
    {
      name: "list_flows",
      description: "List all available Oomol Connect flows with their metadata",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "list_blocks",
      description: "List all available Oomol Connect blocks with their metadata",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "list_tasks",
      description: "List all Oomol Connect tasks and their current status",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "execute_task",
      description:
        "Execute an Oomol Connect task and wait for completion (recommended for most use cases)",
      inputSchema: {
        type: "object",
        properties: {
          manifest: {
            type: "string",
            description: "Task manifest path (e.g., 'flows/my-flow.yaml')",
          },
          inputValues: {
            type: "object",
            description: "Input values for the task",
          },
          pollIntervalMs: {
            type: "number",
            description: "Polling interval in milliseconds (default: 2000)",
            default: 2000,
          },
          timeoutMs: {
            type: "number",
            description:
              "Maximum wait time in milliseconds (default: 300000, 5 minutes)",
          },
          maxIntervalMs: {
            type: "number",
            description:
              "Maximum polling interval for exponential backoff (default: 10000)",
            default: 10000,
          },
        },
        required: ["manifest", "inputValues"],
      },
    },
    {
      name: "execute_task_with_files",
      description:
        "Execute an Oomol Connect task with file uploads and wait for completion",
      inputSchema: {
        type: "object",
        properties: {
          manifest: {
            type: "string",
            description: "Task manifest path",
          },
          inputValues: {
            type: "object",
            description: "Input values for the task",
          },
          files: {
            type: "array",
            description:
              "Files to upload (supports path or base64 encoding)",
            items: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                  description: "Absolute file path (local files)",
                },
                base64: {
                  type: "string",
                  description: "Base64-encoded file content",
                },
                filename: {
                  type: "string",
                  description: "File name (required for base64)",
                },
                mimeType: {
                  type: "string",
                  description: "MIME type (optional)",
                },
              },
            },
          },
          pollIntervalMs: {
            type: "number",
            default: 2000,
          },
          timeoutMs: {
            type: "number",
          },
          maxIntervalMs: {
            type: "number",
            default: 10000,
          },
        },
        required: ["manifest", "inputValues", "files"],
      },
    },
    {
      name: "list_packages",
      description: "List all installed Oomol Connect packages",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "install_package",
      description: "Install an Oomol Connect package and wait for completion",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Package name",
          },
          version: {
            type: "string",
            description: "Package version",
          },
          pollIntervalMs: {
            type: "number",
            description: "Polling interval in milliseconds (default: 3000)",
            default: 3000,
          },
          timeoutMs: {
            type: "number",
            description: "Maximum wait time in milliseconds",
          },
        },
        required: ["name", "version"],
      },
    },
    {
      name: "create_task",
      description:
        "Create an Oomol Connect task without waiting for completion (async mode)",
      inputSchema: {
        type: "object",
        properties: {
          manifest: {
            type: "string",
            description: "Task manifest path",
          },
          inputValues: {
            type: "object",
            description: "Input values for the task",
          },
        },
        required: ["manifest", "inputValues"],
      },
    },
    {
      name: "get_task",
      description: "Get the current status and details of a specific task",
      inputSchema: {
        type: "object",
        properties: {
          taskId: {
            type: "string",
            description: "Task ID",
          },
        },
        required: ["taskId"],
      },
    },
    {
      name: "stop_task",
      description: "Stop a running task",
      inputSchema: {
        type: "object",
        properties: {
          taskId: {
            type: "string",
            description: "Task ID to stop",
          },
        },
        required: ["taskId"],
      },
    },
  ];
}

/**
 * 注册所有工具的处理器
 */
export function registerTools(
  server: Server,
  connectClient: OomolConnectClient,
  options: ServerOptions
): void {
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const args = request.params.arguments as any;

    switch (toolName) {
      case "list_flows":
        return await handleListFlows(connectClient);

      case "list_blocks":
        return await handleListBlocks(connectClient);

      case "list_tasks":
        return await handleListTasks(connectClient);

      case "execute_task":
        return await handleExecuteTask(args, connectClient, options);

      case "execute_task_with_files":
        return await handleExecuteTaskWithFiles(args, connectClient, options);

      case "list_packages":
        return await handleListPackages(connectClient);

      case "install_package":
        return await handleInstallPackage(args, connectClient, options);

      case "create_task":
        return await handleCreateTask(args, connectClient);

      case "get_task":
        return await handleGetTask(args, connectClient);

      case "stop_task":
        return await handleStopTask(args, connectClient);

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  });
}
