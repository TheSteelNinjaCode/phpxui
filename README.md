# **phpxui‑cli** — Instant PHPXUI Component Generator 🚀

> **Generate fully‑typed PHPXUI components for Prisma PHP right from the terminal.**  
> ⚡ **Add one** → `npx phpxui add Alert` | 🌌 **Add all** → `npx phpxui add --all` | 🔁 **Update installed** → `npx phpxui update`

---

## ✨ Features

| Feature                | Details                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Bulk install**       | `--all` downloads every component in one shot.                                                                   |
| **Update in place**    | `update` scans your `outputDir` and re‑downloads every installed component (overwrite).                          |
| **Ready‑to‑use code**  | Each file already contains the `$class` merge logic and `{$attributes}` placeholder for **Wave** reactivity.     |
| **Clean paths**        | Files are written under `src/Lib/PHPXUI/FancyName.php` with OS‑agnostic separators.                              |
| **Friendly output**    | Clear green / red summary with relative paths only.                                                              |
| **Automatic icons**    | Core **PPIcons** (`x`, `chevron‑down`, `chevron‑right`, etc.) are installed on the very first run.               |
| **Tailwind bootstrap** | Ensures `tw-animate-css` and (on first run / missing file) writes `src/app/globals.css` for a sensible baseline. |

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
📦 Installing ppicons CLI…
✨ Installing default icons: x chevron-down chevron-right
✔ Icons installed in src/Lib/PPIcons

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

> **Note:** The CLI automatically installs a default set of core icons (such as `x`, `chevron-down`, `chevron-right`) on first use. Extra icons are not yet selectable via `phpxui` directly.

---

## 🧩 Configuration (phpxui.json)

On first run, **phpxui‑cli** creates a `phpxui.json` in your project root. The most important fields are:

- `outputDir`: where PHPXUI components are written (default: `src/Lib/PHPXUI`)
- `psr4`: mapping hints for components and icons
- `iconsInstalled`: internal flag to avoid reinstalling the default icon set
- `tailwind.css`: where the base CSS should live (default: `src/app/globals.css`)

Example:

```json
{
  "outputDir": "src/Lib/PHPXUI",
  "iconsInstalled": false,
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

## 🎨 Using Additional Icons

Need more icons? Use the **PPIcons** CLI directly:

```bash
npx ppicons add menu chevron-left arrow-right
```

This will place the requested icons under `src/Lib/PPIcons` with full PHPXUI typings.  
Browse the complete icon catalogue and usage docs at **https://ppicons.tsnc.tech/**.

---

## 📚 Documentation

Full guides and examples live at the PHPXUI documentation site: **https://phpxui.tsnc.tech/**

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
