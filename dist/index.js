#!/usr/bin/env node
import{runCli}from"./cli.js";(async()=>{const s=await runCli(process.argv.slice(2));process.exit(s)})();