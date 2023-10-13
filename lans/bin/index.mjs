#!/usr/bin/env node

import * as fs from "fs-extra";
import findUp from "find-up";
import * as lock from "./lock.mjs";
import list from "./list.mjs";
import * as log from "./log.mjs";


export default async function (args) {
  const jsonPath = await findUp("package.json");

  if (!jsonPath) {
    throw Error("创建配置文件");
  }

  const root = await fs.default.readJson(jsonPath);
  const additionalPackages = args._.slice(2);

  if (additionalPackages.length) {
    root.dependencies = root.dependencies || {};
    additionalPackages.forEach((pkg) => (root.dependencies[pkg] = ""));
  }

  // 加载文件
  await lock.readLock();

  // 生成了依赖关系
  const info = await list(root);

  // 异步保存锁定文件。
  lock.writeLock();

  log.prepareInstall(
    Object.keys(info.topLevel).length + info.unsatisfied.length
  )
}
