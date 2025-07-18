# **phpxui-cli** — Instant PHPXUI Component Generator 🚀

> **Generate fully‑typed PHPXUI components for Prisma PHP right from the terminal.**
> ⚡ **Single component** → `npx phpxui add Alert`   |   🌌 **Whole library** → `npx phpxui add --all`

---

## ✨ Features

| Feature               | Details                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| **Bulk install**      | `--all` downloads every component in a single compressed request.                                        |
| **Ready‑to‑use code** | Each file already contains the `$class` merge logic and `{$attributes}` placeholder for Wave reactivity. |
| **Clean paths**       | Files are written under `src/Lib/PHPXUI/FancyName.php` with OS‑agnostic separators.                      |
| **Friendly output**   | Clear green / red summary with relative paths only.                                                      |
| **Cross‑platform**    | Works equally on Windows, macOS and Linux.                                                               |

---

## 📦 Installation

```bash
# Global
npm install -g phpxui

# Or as a dev‑dependency
npm install -D phpxui
```

> Requires **Node 18+** and a Prisma PHP project (PHP 8.2+).

---

## 🚀 Quick Start

```bash
# Add a single component
npx phpxui add Alert

# Add multiple components at once
npx phpxui add Alert Dialog Badge

# Add the entire component set
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
        $attributes = $this->getAttributes();
        $class      = $this->getMergeClasses();

        return <<<HTML
        <div {$attributes} class="alert {$class}">
            {$this->children}
        </div>
        HTML;
    }
}
```

---

## 🔧 CLI Options

| Flag / Argument | Description                                              |
| --------------- | -------------------------------------------------------- |
| `<component …>` | One or more component names separated by space or comma. |
| `--all`         | Download the full catalogue in one request.              |
| `--out <dir>`   | Destination folder (default `src/Lib/PHPXUI`).           |
| `--force`       | Overwrite existing files.                                |

---

## 📚 Documentation

Full guides and examples live at the [PHPXUI documentation site](https://phpxui.tsnc.tech/).

---

## 💡 Contributing

We welcome contributions to improve **phpxui-cli**. If you have ideas, found bugs, or want to add features, open an issue or submit a pull request.

---

## 📄 License

`phpxui-cli` is released under the MIT License. See `LICENSE` for details.

---

## 👤 Author

This project is developed and maintained by [The Steel Ninja Code](https://thesteelninjacode.com/), continuously pushing the boundaries of PHP development.

---

## 📧 Contact

Questions or feedback? Reach us at [thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com) — we’d love to hear from you!
