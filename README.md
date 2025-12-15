# HAADE UI Builder – Gridstack + React

Ce dépôt **haade-ui-builder** contient :

- une **structure ESPHome / Home Assistant** existante dans `src/`
- un **UI Builder web** (React + Gridstack) permettant de construire des pages LVGL
- un **déploiement automatique sur GitHub Pages**

L’objectif est de **ne pas modifier la structure ESPHome**, tout en ajoutant un builder graphique moderne.

---

## 📁 Structure du dépôt

```text
haade-ui-builder/
├─ src/                      # ESPHome / Home Assistant (existant)
│
├─ ui-builder/               # UI Builder React + Gridstack
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.ts
│  ├─ src/
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  └─ styles.css
│  └─ public/
│
├─ .github/
│  └─ workflows/
│     └─ pages.yml           # Déploiement GitHub Pages
│
└─ README.md
```

---

## 🧱 Pré-requis

- Node.js **>= 18** (recommandé : 20)
- npm ou pnpm
- Un dépôt GitHub

Vérification :
```bash
node -v
npm -v
```

---

## 🚀 Installation du UI Builder (React + Gridstack)

### 1️⃣ Créer le projet React (Vite)

Depuis la racine du dépôt :

```bash
npm create vite@latest ui-builder -- --template react-ts
cd ui-builder
npm install
```

---

### 2️⃣ Installer Gridstack

```bash
npm install gridstack
npm install react-router-dom
npm i --save-dev @types/js-yaml
```

---

### 3️⃣ Configurer Vite pour GitHub Pages

📄 `ui-builder/vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/haade-ui-builder/', // ⚠️ nom exact du repo GitHub
})
```

> ⚠️ **Important** : le `base` doit correspondre exactement au nom du dépôt GitHub.

---

## 🧩 Exemple d’intégration Gridstack

📄 `ui-builder/src/App.tsx`

```tsx
import { useEffect } from 'react'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

export default function App() {
  useEffect(() => {
    GridStack.init({
      column: 8,
      cellHeight: 80,
      float: true,
    })
  }, [])

  return (
    <div>
      <h2>HAADE UI Builder</h2>
      <div className="grid-stack">
        <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="2" gs-h="1">
          <div className="grid-stack-item-content">Widget</div>
        </div>
      </div>
    </div>
  )
}
```

---

## 🧪 Lancer en local

```bash
cd ui-builder
npm run dev
```

Le builder est accessible sur :
```
http://localhost:5173
```

---

## 🌍 Déploiement sur GitHub Pages (GitHub Actions)

### 1️⃣ Workflow GitHub Pages

📄 `.github/workflows/pages.yml`

```yaml
name: Deploy UI Builder

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd ui-builder
          npm install

      - name: Build
        run: |
          cd ui-builder
          npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ui-builder/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

---

### 2️⃣ Activer GitHub Pages

Dans GitHub :

- **Settings → Pages**
- Source : **GitHub Actions**

URL finale :
```
https://<github_user>.github.io/haade-ui-builder/
```

---

## 🧠 Bonnes pratiques

- ✅ Ne **jamais modifier** `src/` depuis le builder
- ✅ Le builder **génère** du YAML, il ne flashe pas directement
- ✅ Séparer :
  - matériel (`src/`)
  - UI (`ui-builder/`)
- ✅ Utiliser des templates LVGL (pages fixes + dashboards libres)

---

## 🛣️ Évolutions prévues

- Import des profils écran ESPHome
- Pages LVGL (`home`, `dashboard`, `settings`)
- Templates de grilles fixes
- Génération YAML ESPHome
- Preview LVGL
- Export / partage de layouts

---

## 📜 Licence

MIT – projet communautaire
