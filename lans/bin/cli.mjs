#!/usr/bin/env node

import yargs from "yargs";
import pm from "./index.mjs";

yargs(process.argv)
  .usage("tiny-pm <command> [args]")
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .command(
    "install",
    "Install the dependencies.",
    (argv) => {
      argv.option("production", {
        type: "boolean",
        description: "Install production dependencies only.",
      });

      argv.boolean("save-dev");
      argv.boolean("dev");
      argv.alias("D", "dev");

      return argv;
    },
    pm
  )
  .command(
    "*",
    "Install the dependencies.",
    (argv) =>
      argv.option("production", {
        type: "boolean",
        description: "Install production dependencies only.",
      }),
    pm
  )
  .parse();
