"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPhpXUIConfig = loadPhpXUIConfig;
exports.savePhpXUIConfig = savePhpXUIConfig;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const defaultConfig = {
    style: "new-york",
    force: false,
    outputDir: "src/Lib/PHPXUI",
    iconsInstalled: false,
    tailwind: {
        css: "src/app/css/tailwind.css",
        baseColor: "neutral",
        cssVariables: true,
        prefix: "",
    },
    psr4: {
        Components: "src/Lib/PHPXUI/",
        Icons: "src/Lib/PPIcons/",
    },
    iconLibrary: "ppicons",
};
function loadPhpXUIConfig() {
    const configPath = path_1.default.resolve("phpxui.json");
    if (!fs_1.default.existsSync(configPath)) {
        fs_1.default.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
        console.log("📦 Created default phpxui.json");
    }
    const content = fs_1.default.readFileSync(configPath, "utf-8");
    return JSON.parse(content);
}
function savePhpXUIConfig(config) {
    const configPath = path_1.default.resolve("phpxui.json");
    fs_1.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
