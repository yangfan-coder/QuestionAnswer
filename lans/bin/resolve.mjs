#!/usr/bin/env node

import fetch from "node-fetch";

/*
 *使用缓存来防止重复的网络请求，
 *当询问相同的包裹时。
 */
const cache = Object.create(null);

// 这允许我们使用自定义的npm注册表。
const REGISTRY = process.env.REGISTRY || "https://registry.npmjs.org/";

export default async function (name) {
  /*
   *如果所请求的包清单存在于高速缓存中，
   *直接退回即可。
   */

  const cached = cache[name];

  if (cached) return cached;

  const response = await fetch(`${REGISTRY}${name}`);

  const json = await response.json();

  if ("error" in json) {
    throw new ReferenceError(`No such package: ${name}`);
  }

  // 将清单信息添加到缓存并返回。
  return (cache[name] = json.versions);
}
