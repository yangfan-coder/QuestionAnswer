#!/usr/bin/env node

import * as lock from "./lock.mjs";
import resolve from './resolve.mjs'
import * as log from "./log.mjs";

const topLevel = Object.create(null);
const unsatisfied = {};

async function collectDeps(name, constraint, stack) {
  // 从锁中按名称检索单个清单。
  const fromLock = lock.getItem(name, constraint);

  /*
   *获取清单信息。
   *如果该清单不存在于锁中，
   *从网络中获取。
   */

  const manifest = fromLock || (await resolve(name));

  // 将当前解析模块添加到CLI
  log.logResolving(name)

}

/*
 *对于生产依赖性和开发依赖性，
 *如果返回包名称和语义版本，
 *我们应该将它们添加到“package.json”文件中。
 *添加新程序包时，这是必要的。
 */
export default async function (rootManifest) {
  if (rootManifest.dependencies) {
    (
      await Promise.all(
        Object.entries(rootManifest.dependencies).map((pair) =>
          collectDeps(...pair)
        )
      )
    )
      .filter(Boolean)
      .forEach((item) => (rootManifest.dependencies[item.name] = item.version));
  }

  if (rootManifest.devDependencies) {
    (
      await Promise.all(
        Object.entries(rootManifest.devDependencies).map((pair) =>
          collectDeps(...pair)
        )
      )
    )
      .filter(Boolean)
      .forEach(
        (item) => (rootManifest.devDependencies[item.name] = item.version)
      );
  }

  return { topLevel, unsatisfied };
}
