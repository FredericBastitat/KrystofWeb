---
description: Jak nasadit web na GitHub Pages
---

# Jak nasadit web na GitHub Pages

Tento projekt je nakonfigurován pro automatické nasazení pomocí GitHub Actions. Stačí váš kód nahrát na GitHub.

## Kroky pro první nasazení:

1. **Vytvořte repositář na GitHubu** s názvem `KrystofWeb`.
2. **Nahrajte svůj kód** do tohoto repositáře:
   ```bash
   git remote add origin https://github.com/VASE_UZIVATELSKE_JMENO/KrystofWeb.git
   git add .
   git commit -m "Initial commit with deployment config"
   git push -u origin main
   ```
3. **Povolte GitHub Pages** v nastavení repositáře:
   - Jděte na GitHubu do **Settings** -> **Pages**.
   - V sekci **Build and deployment** u **Source** vyberte **GitHub Actions**.

Po každém dalším `git push` se web automaticky přebuduje a nasadí.

## Web bude dostupný na:
`https://VASE_UZIVATELSKE_JMENO.github.io/KrystofWeb/`

// turbo
4. Spustit build lokálně pro kontrolu:
   ```bash
   npm run build
   ```
