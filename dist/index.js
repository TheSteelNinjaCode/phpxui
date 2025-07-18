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
(async () => {
    /* ─────────────────────────────────────────────
     * 1.  Parse command & flags
     * ──────────────────────────────────────────── */
    const args = process.argv.slice(2);
    const [command, ...rest] = args;
    if (command !== "add") {
        console.log(chalk_1.default.blue("Usage: phpxui add [--all] [--out <dir>] [--force] <component…>"));
        process.exit(0);
    }
    const flags = { all: false, force: false, out: null };
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
            case "--out":
                flags.out = rest[++i] || null;
                break;
            default:
                names.push(tok);
        }
    }
    /* ─────────────────────────────────────────────
     * 2.  Housekeeping steps (always run)
     * ──────────────────────────────────────────── */
    // 2.a Ensure tw-animate-css is installed
    (0, ensure_package_1.ensurePackageInstalled)("tw-animate-css");
    // 2.b Keep Tailwind theme up‑to‑date in the project
    const cssUpdated = (0, copy_tailwind_1.copyTailwindCss)(flags.force);
    if (cssUpdated) {
        const relCss = path_1.default
            .relative(process.cwd(), "src/app/css/tailwind.css")
            .replace(/\\/g, "/");
        console.log(chalk_1.default.green(`✔ Updated Tailwind CSS → ${relCss}`));
    }
    /* ─────────────────────────────────────────────
     * 3.  Destination directory for components
     * ──────────────────────────────────────────── */
    const targetDir = path_1.default.resolve(flags.out ?? "src/Lib/PHPXUI");
    try {
        /* ─────────────────────────────────────────
         * 4.  Bulk mode  (--all)
         * ───────────────────────────────────────── */
        if (flags.all) {
            const { ok, fail } = await (0, php_components_bulk_1.generateAllComponents)(targetDir, flags.force);
            console.log(chalk_1.default.green(`\n✔ Generated ${ok.length} components in ${path_1.default.relative(process.cwd(), targetDir)}`));
            if (fail.length) {
                console.log(chalk_1.default.red(`✖ ${fail.length} failures:`));
                fail.forEach((m) => console.log("  •", m));
            }
            process.exit(fail.length ? 1 : 0);
        }
        /* ─────────────────────────────────────────
         * 5.  Interactive prompt if no names given
         * ───────────────────────────────────────── */
        if (names.length === 0) {
            const { componentList } = await (0, prompts_1.default)({
                type: "text",
                name: "componentList",
                message: "Which components do you want to add? (space‑ or comma‑separated)",
                validate: (v) => (v.trim() ? true : "Enter at least one name"),
            });
            names.push(...componentList.split(/[\s,]+/));
        }
        /* ─────────────────────────────────────────
         * 6.  Generate each requested component
         * ───────────────────────────────────────── */
        for (const name of names) {
            const saved = await (0, php_component_1.generateComponent)(name, targetDir, flags.force);
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
