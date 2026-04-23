# **phpxui‑cli** — Instant PHPXUI Component Generator 🚀

> **Generate fully‑typed PHPXUI components for Prisma PHP right from the terminal.**  
> ⚡ **Add one** → `npx phpxui add Alert` | 🌌 **Add all** → `npx phpxui add --all` | 🔁 **Update installed** → `npx phpxui update`

---

## ✨ Features

| Feature                | Details                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Bulk install**       | `--all` downloads every component in one shot.                                                                                        |
| **Update in place**    | `update` scans your `outputDir` and re‑downloads every installed component (overwrite).                                               |
| **Ready‑to‑use code**  | Each file already contains the `$class` merge logic and `{$attributes}` placeholder for **Wave** reactivity.                          |
| **Clean paths**        | Files are written under `src/Lib/PHPXUI/FancyName.php` with OS‑agnostic separators.                                                   |
| **Friendly output**    | Clear green / red summary with relative paths only.                                                                                   |
| **PPIcons bootstrap** | `add` and `update` install the required baseline `ppicons` set automatically, and still install any extra icons detected in generated files. |
| **Tailwind bootstrap** | Ensures `tw-animate-css` and (on first run / missing file) writes `src/app/globals.css` for a sensible baseline.                      |
| **AI project context** | Refreshes the `manifest` block inside `phpxui.json` and managed `AGENTS.md` / `.github/copilot-instructions.md` blocks after changes. |

`phpxui.json` is the CLI's own config file. In a Prisma PHP app, the framework config remains the root `prisma-php.json` file.

---

## 📦 Installation

```bash
# Global
npm install -g phpxui

# Or as a dev‑dependency
npm install -D phpxui
```

> Requires **Node 18+** and a Prisma PHP project (PHP 8.2+).

---

## 🚀 Quick Start

```bash
# Add a single component
npx phpxui add Alert

# Add multiple components at once
npx phpxui add Alert Dialog Badge

# Add the entire component set
npx phpxui add --all
```

CLI output example:

```bash
✔ Alert   → src/Lib/PHPXUI/Alert.php
✔ Dialog  → src/Lib/PHPXUI/Dialog.php
✔ Badge   → src/Lib/PHPXUI/Badge.php
```

Each generated file looks like this:

```php
<?php
namespace Lib\PHPXUI;

use Lib\PHPX\PHPX;

class Alert extends PHPX
{
    public function render(): string
    {
        $class      = $this->getMergeClasses();
        $attributes = $this->getAttributes([
            'class' => $class,
        ]);

        return <<<HTML
        <div {$attributes}>
            {$this->children}
        </div>
        HTML;
    }
}
```

---

## 🔁 Updating Components

### Update everything you already installed

```bash
npx phpxui update
```

What it does:

- Reads your `phpxui.json` (creates it if missing)
- Resolves your `outputDir` (default: `src/Lib/PHPXUI`)
- Scans that folder for `*.php` files (e.g. `Alert.php`, `Dialog.php`)
- Re-downloads each matching component from the PHPXUI catalogue
- **Overwrites files automatically** (no `--force` required)

If you have no generated components yet, it will report:

- `⚠ No components found to update.`

### Update a single component (targeted)

If you only want to refresh one component, use `add` with `--force`:

```bash
npx phpxui add Alert --force
```

---

## 🔧 CLI Usage and Options

```bash
phpxui <command> [--all] [--force] <component…>
```

### Commands

| Command  | Purpose                                                                      |
| -------- | ---------------------------------------------------------------------------- |
| `add`    | Generate one or more components by name, or the full catalogue with `--all`. |
| `update` | Update **all installed** components found in `outputDir` (overwrites).       |

### Flags / Arguments

| Flag / Argument | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `<component …>` | One or more component names separated by space (or comma). Applies to `add`. |
| `--all`         | Download the full catalogue in one request. Applies to `add`.                |
| `--force`       | Overwrite existing files. Applies to `add`.                                  |

> **Note:** `phpxui` installs the required baseline `ppicons` automatically. Install any extra icons separately with `npx ppicons add <icon-name>`.

---

## 🧩 Configuration (phpxui.json)

On first run, **phpxui‑cli** creates a `phpxui.json` in your project root. The most important fields are:

- `outputDir`: where PHPXUI components are written (default: `src/Lib/PHPXUI`)
- `psr4`: mapping hints for components and icons
- `tailwind.css`: where the base CSS should live (default: `src/app/globals.css`)
- `manifest`: auto-generated AI metadata and installed component inventory maintained by the CLI

This file is separate from the Prisma PHP framework config in `prisma-php.json` at the project root.

Example:

```json
{
  "outputDir": "src/Lib/PHPXUI",
  "tailwind": {
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "psr4": {
    "Components": "src/Lib/PHPXUI/",
    "Icons": "src/Lib/PPIcons/"
  },
  "iconLibrary": "ppicons"
}
```

---

## 🤖 AI Context

After `add` or `update`, **phpxui-cli** refreshes these files in your project root:

- `phpxui.json` (updates the `manifest` section)
- `AGENTS.md`
- `.github/copilot-instructions.md`

The markdown files receive a managed `phpxui` block that inventories installed components, records the component catalogue endpoints, and preserves any manual content outside that block.

---

## 🎨 Using Additional Icons

`phpxui add ...` and `phpxui update` already install the baseline icon set used across PHPXUI components.

Need more icons? Use the **PPIcons** CLI directly:

```bash
npx ppicons add menu chevron-left arrow-right
```

This will place the requested icons under `src/Lib/PPIcons` with full PHPXUI typings.  
Browse the complete icon catalogue and usage docs at **https://ppicons.tsnc.tech/**.

---

## 📚 Documentation

Full guides and examples live at the PHPXUI documentation site: [https://phpxui.tsnc.tech/](https://phpxui.tsnc.tech/)

---

## 💡 Contributing

We welcome contributions to improve **phpxui‑cli**. If you have ideas, find bugs, or want to add features, open an issue or submit a pull request.

---

## 📄 License

`phpxui‑cli` is released under the MIT License. See `LICENSE` for details.

---

## 👤 Author

This project is developed and maintained by **The Steel Ninja Code**, continuously pushing the boundaries of PHP development.

---

## 📧 Contact

Questions or feedback? Reach us at [thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com) — we’d love to hear from you!
