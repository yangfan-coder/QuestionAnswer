#!/usr/bin/env node

import * as yaml from "js-yaml";
import * as fs from "fs-extra";
import * as utils from "./utils.mjs";

/*
 *这是旧锁。
 *旧锁仅用于从锁文件中读取，
 *所以除了读取锁文件之外，旧锁应该是只读的。
 */

const oldLock = Object.create(null);

/*
 *这是新锁。
 *新锁仅用于写入锁文件，
 *所以除了保存锁文件之外，应该只写入新的锁。
 */

const newLock = Object.create(null);

export function getItem(name, constraint) {
  /*
   *通过钥匙从锁中取出物品。
   *钥匙的格式与Yarn的“Yarn.lock”文件相似，并受到其启发。
   */
  const item = oldLock[`${name}@${constraint}`];

  // 如果找不到，则返回“null”而不是“undefined”。
  if (!item) return null;

  // 将数据结构转换为上面的注释。
  return {
    [item.version]: {
      dependencies: item.dependencies,
      dist: { shasum: item.shasum, tarball: item.url },
    },
  };
}

/**
 *只需读取锁定文件。
 *如果找不到锁定文件，请跳过它。
 */
export async function readLock() {
  if (await fs.pathExists("./fans.yml")) {
    Object.assign(
      oldLock,
      yaml.load(await fs.default.readFile("./fans.yml", "utf-8"))
    );
  } else {
    console.log("未加载lock文件");
  }
}

export async function writeLock() {
  /*
   *在保存之前对锁的钥匙进行排序。
   *这是必要的，因为每次使用包管理器时，
   *顺序将不相同。
   *排序使之对git diff有用。
   */
  await fs.default.writeFile(
    "./fans.yml",
    yaml.dump(utils.sortKeys(newLock), { noRefs: true })
  );
}
