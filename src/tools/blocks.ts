import type { OomolConnectClient } from "oomol-connect-sdk";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "../utils/response-formatter.js";

/**
 * 列出所有可用的 blocks
 */
export async function handleListBlocks(connectClient: OomolConnectClient) {
  try {
    const result = await connectClient.blocks.list();
    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}
