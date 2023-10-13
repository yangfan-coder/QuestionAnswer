#!/usr/bin/env node

import ProgressBar from "progress";
import logUpdate from "log-update";

let progress;

// 使用友好的进度条。
export function prepareInstall(count) {
  logUpdate("[1/2] Finished resolving.");
  progress = new ProgressBar("[2/2] Installing [:bar]", {
    complete: "#",
    total: count,
  });
}

/**
 *更新当前解析的模块。
 *这类似于yarn。
 */
export function logResolving(name) {
  logUpdate(`[1/2] Resolving: ${name}`);
}
