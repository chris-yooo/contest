# Taschenrechner

Ein moderner Taschenrechner, gebaut mit **Next.js 15**, **TypeScript**, **Tailwind CSS** und **shadcn/ui**.

![Taschenrechner](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8)
![React](https://img.shields.io/badge/React-19-61DAFB)

## Features

- ✅ Grundrechenarten: Addition, Subtraktion, Multiplikation, Division
- ✅ Prozentrechnung
- ✅ Vorzeichen wechseln (±)
- ✅ Dezimalzahlen
- ✅ Tastaturunterstützung
- ✅ Dunkles Design mit orangefarbenen Akzenten
- ✅ Responsive Schriftgröße im Display
- ✅ Operation-History im Display
- ✅ SSR-kompatibel

## Projektstruktur

```
contest/
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind CSS + Design Tokens
│   │   ├── layout.tsx        # Root Layout mit Inter Font
│   │   └── page.tsx          # Hauptseite
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx    # shadcn/ui Button Komponente
│   │   └── calculator.tsx    # Taschenrechner Komponente
│   └── lib/
│       └── utils.ts          # cn() Helper Funktion
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
└── .gitignore
```

## Installation

```bash
# Abhängigkeiten installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Server starten
npm start
```

## Technologien

- **Next.js 15** - App Router, Server Components
- **React 19** - Hooks, Client Components
- **TypeScript 5.7** - Type Safety
- **Tailwind CSS 3.4** - Utility-first CSS
- **shadcn/ui** - UI Komponenten
- **clsx + tailwind-merge** - Conditionale Klassen

## Tastaturkürzel

| Taste | Aktion |
|-------|--------|
| `0-9` | Ziffer eingeben |
| `.` | Dezimalpunkt |
| `+` | Addition |
| `-` | Subtraktion |
| `*` | Multiplikation |
| `/` | Division |
| `Enter` oder `=` | Ergebnis berechnen |
| `Escape` | Zurücksetzen |
| `Backspace` | Letztes Zeichen löschen |

## Entwicklung

```bash
# Development Server mit Hot Reload
npm run dev

# Linting
npm run lint
```

## Lizenz

MIT
