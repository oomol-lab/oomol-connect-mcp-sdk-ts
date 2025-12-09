import type { ToolResponse } from "../types.js";

/**
 * 格式化成功响应
 */
export function formatSuccessResponse(data: unknown): ToolResponse {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * 格式化错误响应
 */
export function formatErrorResponse(error: unknown): ToolResponse {
  let errorMessage = "Unknown error";
  let errorDetails: unknown;

  if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      // 保留任何额外的错误属性
      ...(error as any),
    };
  } else {
    errorDetails = error;
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            error: errorMessage,
            details: errorDetails,
          },
          null,
          2
        ),
      },
    ],
    isError: true,
  };
}
