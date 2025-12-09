import type { OomolConnectClient } from "oomol-connect-sdk";
import { BackoffStrategy } from "oomol-connect-sdk";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "../utils/response-formatter.js";
import { convertToFiles } from "../utils/file-converter.js";
import type { ServerOptions, FileInput } from "../types.js";

/**
 * 列出所有任务
 */
export async function handleListTasks(connectClient: OomolConnectClient) {
  try {
    const result = await connectClient.tasks.list();
    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}

/**
 * 执行任务并等待完成（推荐使用）
 */
export async function handleExecuteTask(
  args: {
    blockId: string;
    inputValues: any;
    pollIntervalMs?: number;
    timeoutMs?: number;
    maxIntervalMs?: number;
  },
  connectClient: OomolConnectClient,
  options: ServerOptions
) {
  try {
    const result = await connectClient.tasks.run(
      {
        blockId: args.blockId,
        inputValues: args.inputValues,
      },
      {
        intervalMs: args.pollIntervalMs ?? 2000,
        timeoutMs: args.timeoutMs ?? options.defaultTimeoutMs,
        maxIntervalMs: args.maxIntervalMs ?? options.maxPollIntervalMs ?? 10000,
        backoffStrategy: BackoffStrategy.Exponential,
        backoffFactor: 1.5,
        onProgress: (task) => {
          console.error(`[Task ${task.id}] status=${task.status}`);
        },
        onLog: (log) => {
          console.error(`[Task Log] ${log.type}: ${JSON.stringify(log.event)}`);
        },
      }
    );

    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}

/**
 * 执行任务（含文件上传）并等待完成
 */
export async function handleExecuteTaskWithFiles(
  args: {
    blockId: string;
    inputValues: any;
    files: FileInput[];
    pollIntervalMs?: number;
    timeoutMs?: number;
    maxIntervalMs?: number;
  },
  connectClient: OomolConnectClient,
  options: ServerOptions
) {
  try {
    // 转换文件输入
    const files = await convertToFiles(args.files);

    const result = await connectClient.tasks.runWithFiles(
      args.blockId,
      args.inputValues,
      files,
      {
        intervalMs: args.pollIntervalMs ?? 2000,
        timeoutMs: args.timeoutMs ?? options.defaultTimeoutMs,
        maxIntervalMs: args.maxIntervalMs ?? options.maxPollIntervalMs ?? 10000,
        backoffStrategy: BackoffStrategy.Exponential,
        backoffFactor: 1.5,
        onProgress: (task) => {
          console.error(`[Task ${task.id}] status=${task.status}`);
        },
        onLog: (log) => {
          console.error(`[Task Log] ${log.type}: ${JSON.stringify(log.event)}`);
        },
      }
    );

    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}

/**
 * 创建任务（异步，不等待）
 */
export async function handleCreateTask(
  args: {
    blockId: string;
    inputValues: any;
  },
  connectClient: OomolConnectClient
) {
  try {
    const result = await connectClient.tasks.create({
      blockId: args.blockId,
      inputValues: args.inputValues,
    });
    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}

/**
 * 获取任务详情
 */
export async function handleGetTask(
  args: {
    taskId: string;
  },
  connectClient: OomolConnectClient
) {
  try {
    const result = await connectClient.tasks.get(args.taskId);
    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}

/**
 * 停止运行中的任务
 */
export async function handleStopTask(
  args: {
    taskId: string;
  },
  connectClient: OomolConnectClient
) {
  try {
    const result = await connectClient.tasks.stop(args.taskId);
    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}
