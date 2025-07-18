"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllComponents = generateAllComponents;
const node_fetch_1 = __importDefault(require("node-fetch"));
const write_component_1 = require("./write-component");
/** Endpoint that returns every PHPXUI component */
const BULK_URL = "https://phpxui.tsnc.tech/cli?component=all";
/**
 * Download all components and write them to disk.
 *
 * @param targetDir  Destination folder (e.g. "./src/Lib/PHPXUI")
 * @param force      Overwrite if file exists (default: false)
 */
async function generateAllComponents(targetDir, force = false) {
    const res = await (0, node_fetch_1.default)(BULK_URL);
    if (!res.ok) {
        throw new Error(`Could not fetch component list: ${res.status} – ${BULK_URL}`);
    }
    // Backend returns [{ name, content }]
    const components = (await res.json());
    console.log(`➡  Received ${components.length} components. Generating…`);
    const ok = [];
    const fail = [];
    /*  Small concurrency queue to avoid hammering the FS  */
    const BATCH = 10;
    let queue = [];
    for (const cmp of components) {
        const job = (0, write_component_1.writeComponent)(cmp, targetDir, force)
            .then((file) => ok.push(file))
            .catch((e) => fail.push(`${cmp.name}: ${e.message}`));
        queue.push(job);
        if (queue.length >= BATCH) {
            await Promise.allSettled(queue);
            queue = [];
        }
    }
    await Promise.allSettled(queue);
    return { ok, fail };
}
