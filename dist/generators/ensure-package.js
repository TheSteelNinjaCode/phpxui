"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePackageInstalled = ensurePackageInstalled;
const fs_extra_1 = __importDefault(require("fs-extra"));
const child_process_1 = require("child_process");
/**
 * Ensures a package is present in dependencies/devDependencies.
 * Installs it with `npm i -D <pkg>` if missing.
 *
 * @param pkg   Package name, e.g. "tw-animate-css"
 * @param quiet If true, suppress install output.
 * @returns     true  → package was installed now
 *              false → package already present
 */
function ensurePackageInstalled(pkg, quiet = false) {
    const pkgJsonPath = "package.json";
    if (!fs_extra_1.default.existsSync(pkgJsonPath))
        return false;
    const pkgJson = fs_extra_1.default.readJsonSync(pkgJsonPath);
    const hasIt = (pkgJson.dependencies && pkgJson.dependencies[pkg]) ||
        (pkgJson.devDependencies && pkgJson.devDependencies[pkg]);
    if (hasIt)
        return false;
    const cmd = `npm i -D ${pkg}`;
    if (!quiet)
        console.log(`⬇ Installing missing package: ${pkg} …`);
    (0, child_process_1.execSync)(cmd, { stdio: quiet ? "ignore" : "inherit" });
    return true;
}
