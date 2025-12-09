import { readFileSync, accessSync, constants } from "fs";
import { basename } from "path";
import type { FileInput } from "../types.js";

/**
 * 将文件输入转换为 File 对象
 * 支持从文件路径读取或从 base64 解码
 */
export async function convertToFiles(fileInputs: FileInput[]): Promise<File[]> {
  return Promise.all(
    fileInputs.map(async (input) => {
      if (input.path) {
        // 从路径读取文件
        validateFilePath(input.path);
        const buffer = readFileSync(input.path);
        const filename = input.filename || basename(input.path);
        return new File([buffer], filename);
      } else if (input.base64) {
        // 从 base64 解码
        if (!input.filename) {
          throw new Error(
            "filename is required when using base64 file input"
          );
        }
        const buffer = Buffer.from(input.base64, "base64");
        const options = input.mimeType ? { type: input.mimeType } : undefined;
        return new File([buffer], input.filename, options);
      }
      throw new Error(
        "File input must have either 'path' or 'base64' property"
      );
    })
  );
}

/**
 * 验证文件路径是否可读
 */
function validateFilePath(filePath: string): void {
  try {
    accessSync(filePath, constants.R_OK);
  } catch (error) {
    throw new Error(`Cannot read file at path: ${filePath}`);
  }
}
