import type { OomolConnectClient } from "oomol-connect-sdk";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "../utils/response-formatter.js";

/**
 * 列出所有可用的 flows
 */
export async function handleListFlows(connectClient: OomolConnectClient) {
  try {
    const result = await connectClient.flows.list();
    return formatSuccessResponse(result);
  } catch (error) {
    return formatErrorResponse(error);
  }
}
