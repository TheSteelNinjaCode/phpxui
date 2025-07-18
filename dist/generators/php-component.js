"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponent = generateComponent;
const node_fetch_1 = __importDefault(require("node-fetch"));
const write_component_1 = require("./write-component");
const path_1 = __importDefault(require("path"));
const SINGLE_URL = "https://phpxui.tsnc.tech/cli";
async function generateComponent(componentName, targetDir, force = false) {
    const url = `${SINGLE_URL}?component=${encodeURIComponent(componentName)}`;
    const res = await (0, node_fetch_1.default)(url);
    if (!res.ok) {
        throw new Error(`Could not fetch "${componentName}": ${res.status} – ${url}`);
    }
    // El endpoint puede devolver un objeto (uno) o un array (muchos)
    const json = await res.json();
    const components = Array.isArray(json) ? json : [json];
    const writtenPaths = [];
    for (const cmp of components) {
        // Cada objeto contiene { name, content }
        const filePath = await (0, write_component_1.writeComponent)(cmp, targetDir, force);
        writtenPaths.push(path_1.default.relative(process.cwd(), filePath));
    }
    return writtenPaths;
}
