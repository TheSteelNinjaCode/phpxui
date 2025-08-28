#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const php_component_1 = require("./generators/php-component");
const php_components_bulk_1 = require("./generators/php-components-bulk");
const ensure_package_1 = require("./generators/ensure-package");
const copy_tailwind_1 = require("./generators/copy-tailwind");
const load_config_1 = require("./utils/load-config");
const icons_1 = require("./commands/icons");
const CORE_COMPONENTS = ["Slot", "Portal"];
(async () => {
    const args = process.argv.slice(2);
    const [command, ...rest] = args;
    if (command !== "add") {
        console.log(chalk_1.default.blue("Usage: phpxui add [--all] [--force] <component…>"));
        process.exit(0);
    }
    const flags = { all: false, force: false };
    const names = [];
    for (let i = 0; i < rest.length; i++) {
        const tok = rest[i];
        switch (tok) {
            case "--all":
                flags.all = true;
                break;
            case "--force":
                flags.force = true;
                break;
            default:
                names.push(tok);
        }
    }
    /* 2) Load config + detect first run */
    const { config, isFirstRun } = (0, load_config_1.loadPhpXUIConfig)();
    if (!config.iconsInstalled) {
        await (0, icons_1.installIcons)([
            "chevron-down",
            "x",
            "chevron-right",
            "ellipsis",
            "chevron-left",
            "arrow-left",
            "arrow-right",
            "check",
            "chevrons-up-down",
            "search",
            "circle",
            "calendar",
            "minus",
            "chevron-up",
            "panel-left",
        ], config);
    }
    /* 3) Housekeeping */
    (0, ensure_package_1.ensurePackageInstalled)("tw-animate-css");
    // Tailwind base CSS: only forced on first run
    const cssUpdated = (0, copy_tailwind_1.copyTailwindCss)(isFirstRun /* ignore flags.force here */);
    if (cssUpdated) {
        const relCss = path_1.default
            .relative(process.cwd(), "src/app/css/tailwind.css")
            .replace(/\\/g, "/");
        console.log(chalk_1.default.green(isFirstRun
            ? `✔ Installed base Tailwind CSS → ${relCss}`
            : `✔ Added Tailwind CSS (missing) → ${relCss}`));
    }
    /* 4) Resolve output directory */
    const targetDir = path_1.default.resolve(config.outputDir || "src/Lib/PHPXUI");
    try {
        // Overwrite policy
        const componentForce = isFirstRun || flags.force;
        /* 5) Bulk mode */
        if (flags.all) {
            const { ok, fail } = await (0, php_components_bulk_1.generateAllComponents)(targetDir, componentForce);
            console.log(chalk_1.default.green(`\n✔ Generated ${ok.length} components in ${path_1.default.relative(process.cwd(), targetDir)}`));
            if (fail.length) {
                console.log(chalk_1.default.red(`✖ ${fail.length} failures:`));
                fail.forEach((m) => console.log("  •", m));
            }
            process.exit(fail.length ? 1 : 0);
        }
        /* 6) Interactive prompt if no names given */
        if (names.length === 0) {
            const { componentList } = await (0, prompts_1.default)({
                type: "text",
                name: "componentList",
                message: "Which components do you want to add? (space- or comma-separated)",
                validate: (v) => (v.trim() ? true : "Enter at least one name"),
            });
            names.push(...componentList.split(/[\s,]+/));
        }
        /* 6.5) Ensure core components first on first-run (unless --all) */
        if (isFirstRun && !flags.all) {
            for (const core of CORE_COMPONENTS) {
                const hasCore = names.some((n) => n.toLowerCase() === core.toLowerCase());
                if (!hasCore) {
                    // Put each core at the front in the declared order:
                    names.unshift(core);
                }
            }
        }
        /* 7) Generate each requested component */
        for (const name of names) {
            const saved = await (0, php_component_1.generateComponent)(name, targetDir, componentForce);
            const paths = Array.isArray(saved) ? saved : [saved];
            for (const abs of paths) {
                const rel = path_1.default.relative(process.cwd(), abs).replace(/\\/g, "/");
                console.log(chalk_1.default.green(`✔ ${name} → ${rel}`));
            }
        }
    }
    catch (err) {
        console.error(chalk_1.default.red("✖ Error:"), err.message);
        process.exit(1);
    }
})();
