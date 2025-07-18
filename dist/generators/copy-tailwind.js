"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTailwindCss = copyTailwindCss;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * Copy dist/css/tailwind.css into src/app/css/tailwind.css.
 *
 * @param force  Overwrite even if the target exists.
 * @returns      true  → file was copied / overwritten
 *               false → skipped (already exists and !force)
 */
function copyTailwindCss(force = false) {
    // Path to the CSS bundled with the CLI
    const source = path_1.default.resolve(__dirname, "../dist/css/tailwind.css");
    // Path inside the user’s project
    const target = path_1.default.resolve(process.cwd(), "src/app/css/tailwind.css");
    if (!force && fs_extra_1.default.existsSync(target)) {
        return false; // skip quietly
    }
    fs_extra_1.default.ensureDirSync(path_1.default.dirname(target));
    fs_extra_1.default.copyFileSync(source, target);
    return true;
}
