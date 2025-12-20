import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { OomolConnectClient } from "oomol-connect-sdk";
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
 * 注册所有工具的处理器
 */
export function registerTools(
  server: McpServer,
  connectClient: OomolConnectClient,
  options: ServerOptions
): void {
  // list_blocks tool
  server.registerTool(
    "list_blocks",
    {
      description: "List all available Oomol Connect blocks with their metadata. By default, returns only the latest version of each block. Use includeAllVersions=true to get all versions.",
      inputSchema: {
        includeAllVersions: z.boolean().optional().describe("Include all versions of each block (default: false, only returns latest version)"),
      },
    },
    async (args) => await handleListBlocks(connectClient, args)
  );

  // list_tasks tool
  server.registerTool(
    "list_tasks",
    {
      description: "List all Oomol Connect tasks and their current status",
    },
    async () => await handleListTasks(connectClient)
  );

  // execute_task tool
  server.registerTool(
    "execute_task",
    {
      description: "Execute an Oomol Connect task and wait for completion (recommended for most use cases)",
      inputSchema: {
        blockId: z.string().describe("Block ID in format 'package::block-name' (e.g., 'audio-lab::text-to-audio')"),
        inputValues: z.record(z.string(), z.any()).describe("Input values for the task"),
        pollIntervalMs: z.number().optional().describe("Polling interval in milliseconds (default: 2000)"),
        timeoutMs: z.number().optional().describe("Maximum wait time in milliseconds (default: 300000, 5 minutes)"),
        maxIntervalMs: z.number().optional().describe("Maximum polling interval for exponential backoff (default: 10000)"),
      },
    },
    async (args) => await handleExecuteTask(args, connectClient, options)
  );

  // execute_task_with_files tool
  server.registerTool(
    "execute_task_with_files",
    {
      description: "Execute an Oomol Connect task with file uploads and wait for completion",
      inputSchema: {
        blockId: z.string().describe("Block ID in format 'package::block-name'"),
        inputValues: z.record(z.string(), z.any()).describe("Input values for the task"),
        files: z.array(z.object({
          path: z.string().optional().describe("Absolute file path (local files)"),
          base64: z.string().optional().describe("Base64-encoded file content"),
          filename: z.string().optional().describe("File name (required for base64)"),
          mimeType: z.string().optional().describe("MIME type (optional)"),
        })).describe("Files to upload (supports path or base64 encoding)"),
        pollIntervalMs: z.number().optional(),
        timeoutMs: z.number().optional(),
        maxIntervalMs: z.number().optional(),
      },
    },
    async (args) => await handleExecuteTaskWithFiles(args, connectClient, options)
  );

  // list_packages tool
  server.registerTool(
    "list_packages",
    {
      description: "List all installed Oomol Connect packages",
    },
    async () => await handleListPackages(connectClient)
  );

  // install_package tool
  server.registerTool(
    "install_package",
    {
      description: "Install an Oomol Connect package and wait for completion",
      inputSchema: {
        name: z.string().describe("Package name"),
        version: z.string().describe("Package version"),
        pollIntervalMs: z.number().optional().describe("Polling interval in milliseconds (default: 3000)"),
        timeoutMs: z.number().optional().describe("Maximum wait time in milliseconds"),
      },
    },
    async (args) => await handleInstallPackage(args, connectClient, options)
  );

  // create_task tool
  server.registerTool(
    "create_task",
    {
      description: "Create an Oomol Connect task without waiting for completion (async mode)",
      inputSchema: {
        blockId: z.string().describe("Block ID in format 'package::block-name'"),
        inputValues: z.record(z.string(), z.any()).describe("Input values for the task"),
      },
    },
    async (args) => await handleCreateTask(args, connectClient)
  );

  // get_task tool
  server.registerTool(
    "get_task",
    {
      description: "Get the current status and details of a specific task",
      inputSchema: {
        taskId: z.string().describe("Task ID"),
      },
    },
    async (args) => await handleGetTask(args, connectClient)
  );

  // stop_task tool
  server.registerTool(
    "stop_task",
    {
      description: "Stop a running task",
      inputSchema: {
        taskId: z.string().describe("Task ID to stop"),
      },
    },
    async (args) => await handleStopTask(args, connectClient)
  );
}
