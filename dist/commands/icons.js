"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installIcons = installIcons;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const load_config_1 = require("../utils/load-config");
async function installIcons(iconList, config) {
    try {
        console.log(chalk_1.default.blue("📦 Installing ppicons CLI..."));
        (0, child_process_1.execSync)("npm install -g ppicons", { stdio: "inherit" });
        const args = iconList.join(" ");
        console.log(chalk_1.default.blue(`✨ Installing default icons: ${args}`));
        (0, child_process_1.execSync)(`npx ppicons add ${args}`, { stdio: "inherit" });
        console.log(chalk_1.default.green("✔ Icons installed in src/Lib/PPIcons"));
        config.iconsInstalled = true;
        (0, load_config_1.savePhpXUIConfig)(config); // ⬅️ persist change
    }
    catch (err) {
        console.error(chalk_1.default.red("✖ Failed to install icons:"), err.message);
        process.exit(1);
    }
}
