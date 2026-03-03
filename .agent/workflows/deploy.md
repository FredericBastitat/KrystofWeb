name: Deploy Web to Pages

on:
  push:
    branches: [ main ] # Spustí se při pushi na main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install & Build
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm' # ZRYCHLENÍ: Cachuje knihovny
        env:
          # Tady se vloží ty tajné klíče pro Supabase při buildu
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - run: npm ci
      - run: npm run build

      - name: Deploy to GH Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist # Složka, kterou vygeneroval build
          branch: gh-pages # Kam se má nahrát výsledek
