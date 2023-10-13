#!/usr/bin/env node

export function sortKeys(obj) {
    return Object.fromEntries(
      Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))
    )
  }
  