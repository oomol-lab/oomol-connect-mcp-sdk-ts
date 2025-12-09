# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-12-09

### Breaking Changes

- **移除 Flows 模块**: 完全移除了 `flows` 模块及其相关 API，简化了 SDK 结构
  - 移除 `list_flows` 工具
  - 用户现在只需关注 Blocks、Tasks 和 Packages 三个核心模块

- **字段重命名**: 将 `manifest` 字段重命名为 `blockId`，提升 API 易用性
  - `execute_task` 工具的 `manifest` 参数 → `blockId` 参数
  - `execute_task_with_files` 工具的 `manifest` 参数 → `blockId` 参数
  - `create_task` 工具的 `manifest` 参数 → `blockId` 参数

### Added

- **自动生成 blockId**: `list_blocks` 返回的每个 block 现在自动包含 `blockId` 字段（格式：`"package::name"`），用户无需手动拼接
- **版本号字段**: `list_blocks` 返回的每个 block 现在包含 `version` 字段，自动从安装路径中提取版本号（如 `"0.1.9"`）
- **智能版本过滤**: `list_blocks` 默认只返回每个 package 的最新版本，大幅减少返回数据量
  - 默认行为: 只返回最新版本（从 362 个减少到 132 个 blocks）
  - 可选参数: `list_blocks({ includeAllVersions: true })` 返回所有版本

### Changed

- 更新所有文档和示例代码以反映新的 API 结构
- 简化了 SDK 的概念模型，降低学习成本
- 工具数量从 10 个减少到 9 个（移除 `list_flows`）

### Migration Guide

#### 从 0.1.x 升级到 0.2.0

#### 1. 移除 Flows 相关代码

```json
// 旧版本 (0.1.x) - 不再支持
{
  "tool": "list_flows"
}

// 新版本 (0.2.0) - 使用 list_blocks 替代
{
  "tool": "list_blocks"
}
```

#### 2. 更新字段名称

```json
// 旧版本 (0.1.x)
{
  "tool": "execute_task",
  "arguments": {
    "manifest": "flows/my-flow.yaml",
    "inputValues": { "text": "你好" }
  }
}

// 新版本 (0.2.0)
{
  "tool": "execute_task",
  "arguments": {
    "blockId": "audio-lab::text-to-audio",
    "inputValues": { "text": "你好" }
  }
}
```

#### 3. 使用自动生成的 blockId 和版本号

```json
// 新版本 (0.2.0) - 推荐方式
{
  "tool": "list_blocks",
  "arguments": {
    "includeAllVersions": false
  }
}

// 返回的 block 自动包含 blockId 和 version 字段
// 例如: { "blockId": "ffmpeg::audio_video_separation", "version": "0.1.9", ... }

// 使用 blockId 创建任务
{
  "tool": "execute_task",
  "arguments": {
    "blockId": "ffmpeg::audio_video_separation",
    "inputValues": { ... }
  }
}
```

## [0.1.1] - 2024-XX-XX

### Added

- 初始版本发布
- 支持 Flows、Blocks、Tasks、Packages 四个模块
- 完整的任务轮询和错误处理机制
- 支持文件上传功能
