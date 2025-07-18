"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeComponent = writeComponent;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * Writes a PHPXUI component file to disk.
 *
 * @param componentJson  { name: string; content: string }
 * @param targetDir      Destination folder
 * @param force          Overwrite if file exists
 * @returns              Path of the written file
 */
async function writeComponent(componentJson, targetDir, force = false) {
    const filePath = path_1.default.join(targetDir, `${componentJson.name}.php`);
    if (!force && (await fs_extra_1.default.pathExists(filePath))) {
        // Skip quietly
        return filePath;
    }
    await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
    await fs_extra_1.default.writeFile(filePath, componentJson.content, "utf8");
    return filePath;
}
