import type { OomolConnectClient } from "oomol-connect-sdk";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "../utils/response-formatter.js";

/**
 * 列出已安装的包
 */
export async function handleListPackages(connectClient: OomolConnectClient) {
  try {
    const result = await connectClient.packages.list();
    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}

/**
 * 安装包并等待完成
 */
export async function handleInstallPackage(
  args: {
    name: string;
    version: string;
    pollIntervalMs?: number;
    timeoutMs?: number;
  },
  connectClient: OomolConnectClient,
  options: { defaultTimeoutMs?: number }
) {
  try {
    const result = await connectClient.packages.installAndWait(
      args.name,
      args.version,
      {
        intervalMs: args.pollIntervalMs ?? 3000,
        timeoutMs: args.timeoutMs ?? options.defaultTimeoutMs,
        onProgress: (installTask) => {
          console.error(
            `[Package ${args.name}@${args.version}] status=${installTask.status}`
          );
        },
      }
    );

    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}
