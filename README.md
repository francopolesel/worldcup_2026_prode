# ⚽ World Cup 2026 PRODE

**Predict the entire 2026 FIFA World Cup** — from the group stage to the final.  
**Pronosticá todo el Mundial 2026** — desde la fase de grupos hasta la final.

[![Built with Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🇬🇧 English

### What is this?

A **single-page application** (SPA) to simulate and predict the full 2026 FIFA World Cup. It's a "PRODE" — a traditional South American prediction game where you fill in match results and see how the tournament unfolds.

**No backend. No database. No sign-up.** All your predictions live in the URL — just share the link with friends.

### Features

- **48 teams** in **12 groups** (A–L), following the real 2026 format
- **Group stage**: predict every match (72 games)
- **Auto-calculated standings**: points, goal difference, goals scored — with tiebreakers
- **Best third-placed qualification**: top 8 third-placed teams advance to R32
- **Full knockout bracket**: Round of 32 → Round of 16 → Quarter-finals → Semi-finals → Third Place → Final
- **Penalty shootouts**: if a knockout match ends in a draw, pick who advances on penalties
- **🏆 Champion display**: see who your predictions crowned as world champion
- **Group & round tabs**: navigate groups (A–L) and knockout rounds (R32–Final) easily
- **URL sharing**: all predictions are compressed into the URL — copy and share with anyone
- **LocalStorage**: predictions survive browser closes
- **🌙 Dark mode** / ☀️ Light mode — respects your system preference
- **🌐 Spanish & English** — switch anytime, default is Spanish
- **📱 Responsive**: works on mobile, tablet, and desktop
- **No account needed**: just enter your name and start predicting

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript 5.6 |
| Build | Vite 6 |
| Styling | TailwindCSS v4 |
| State | React Context + hooks |
| Persistence | lz-string (URL hash) + localStorage |

### How to Run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### How It Works

1. Enter your name
2. Predict the score for each **group stage match** (72 games across 12 groups)
3. Switch to the **table view** to see auto-calculated standings per group
4. Once all group predictions are in, move to the **knockout stage**
5. Predict each **knockout round** (R32 → R16 → QF → SF → 3rd → Final)
6. For knockout draws, select who advances on penalties
7. See your **champion** crowned at the end
8. Click **Share my PRODE** to copy the URL and send it to friends

### Project Structure

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Root layout with navigation
├── index.css                # TailwindCSS + custom styles
├── types/index.ts           # TypeScript interfaces
├── data/worldcup-2026.ts    # Static World Cup data (teams, groups, fixtures)
├── context/
│   ├── PredictionsContext   # Predictions state + URL sync
│   ├── ThemeContext         # Dark/light mode
│   └── I18nContext          # Language switching
├── utils/
│   ├── url-persistence.ts   # lz-string compress/decompress
│   ├── standings.ts         # Group standings engine
│   ├── bracket.ts           # Knockout bracket derivation
│   └── i18n.ts              # Translation dictionary
├── hooks/
│   └── useUrlSync.ts        # URL ↔ state sync hook
└── components/
    ├── UsernameModal.tsx     # Initial name prompt
    ├── MatchCard.tsx         # Match score input
    ├── GroupStage.tsx        # Group tabs + matches/table
    ├── GroupTable.tsx        # Group standings table
    ├── KnockoutStage.tsx     # Knockout wrapper
    ├── KnockoutBracket.tsx   # Bracket round navigation
    ├── BracketMatch.tsx      # Knockout match node
    ├── ShareButton.tsx       # Copy URL to clipboard
    ├── ThemeToggle.tsx       # Dark/light toggle
    └── LanguageToggle.tsx    # ES/EN toggle
```

### License

MIT

---

## 🇪🇸 Español

### ¿Qué es esto?

Una **aplicación de página única** (SPA) para simular y pronosticar el Mundial de Fútbol 2026. Es un **PRODE** — el clásico juego de predicciones sudamericano donde completás los resultados de los partidos y ves cómo se desarrolla el torneo.

**Sin backend. Sin base de datos. Sin registro.** Todos tus pronósticos viven en la URL — compartí el link con tus amigos y listo.

### Funcionalidades

- **48 selecciones** en **12 grupos** (A–L), siguiendo el formato real de 2026
- **Fase de grupos**: pronosticá cada partido (72 partidos)
- **Tabla de posiciones automática**: puntos, diferencia de gol, goles a favor — con desempates
- **Mejores terceros**: los 8 mejores terceros clasifican a 32vos
- **Bracket eliminatorio completo**: 32vos → 16vos → 4tos → Semis → 3er puesto → Final
- **Penales**: si un partido eliminatorio termina empatado, elegí quién avanza desde los 12 pasos
- **🏆 Campeón**: mirá a quién coronaron tus pronósticos como campeón del mundo
- **Pestañas de grupos y rondas**: navegá entre grupos (A–L) y rondas eliminatorias (32vos–Final)
- **Compartir por URL**: todos los pronósticos se comprimen en la URL — copiala y compartila
- **localStorage**: los pronósticos sobreviven al cierre del navegador
- **🌙 Modo oscuro** / ☀️ Modo claro — respeta tu preferencia del sistema
- **🌐 Español e Inglés** — cambiá cuando quieras, por defecto en español
- **📱 Responsive**: funciona en celular, tablet y desktop
- **Sin registro**: solo ingresá tu nombre y empezá a pronosticar

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 |
| Lenguaje | TypeScript 5.6 |
| Build | Vite 6 |
| Estilos | TailwindCSS v4 |
| Estado | React Context + hooks |
| Persistencia | lz-string (hash de URL) + localStorage |

### Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Build para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Cómo Funciona

1. Ingresá tu nombre
2. Pronosticá el resultado de cada **partido de grupos** (72 partidos en 12 grupos)
3. Cambiá a la **vista de tabla** para ver las posiciones calculadas automáticamente
4. Una vez que tengas todos los pronósticos de grupos, pasá a la **fase eliminatoria**
5. Pronosticá cada **ronda eliminatoria** (32vos → 16vos → 4tos → Semis → 3ro → Final)
6. Si un partido eliminatorio termina empatado, seleccioná quién avanza por penales
7. Mirá tu **campeón** coronado al final
8. Tocá **Compartir mi Prode** para copiar la URL y mandársela a tus amigos

### Estructura del Proyecto

```
src/
├── main.tsx                 # Punto de entrada
├── App.tsx                  # Layout principal con navegación
├── index.css                # TailwindCSS + estilos personalizados
├── types/index.ts           # Interfaces de TypeScript
├── data/worldcup-2026.ts    # Datos estáticos del Mundial (equipos, grupos, fixture)
├── context/
│   ├── PredictionsContext   # Estado de pronósticos + sincronización URL
│   ├── ThemeContext         # Modo oscuro/claro
│   └── I18nContext          # Cambio de idioma
├── utils/
│   ├── url-persistence.ts   # Compresión/descompresión lz-string
│   ├── standings.ts         # Motor de posiciones de grupo
│   ├── bracket.ts           # Derivación del bracket eliminatorio
│   └── i18n.ts              # Diccionario de traducciones
├── hooks/
│   └── useUrlSync.ts        # Hook de sincronización URL ↔ estado
└── components/
    ├── UsernameModal.tsx     # Pantalla de ingreso de nombre
    ├── MatchCard.tsx         # Input de resultado de partido
    ├── GroupStage.tsx        # Pestañas de grupos + partidos/tabla
    ├── GroupTable.tsx        # Tabla de posiciones de grupo
    ├── KnockoutStage.tsx     # Wrapper de eliminatorias
    ├── KnockoutBracket.tsx   # Navegación por rondas del bracket
    ├── BracketMatch.tsx      # Nodo de partido eliminatorio
    ├── ShareButton.tsx       # Copiar URL al portapapeles
    ├── ThemeToggle.tsx       # Alternar modo oscuro/claro
    └── LanguageToggle.tsx    # Alternar ES/EN
```

### Licencia

MIT

---

<p align="center">⚽ Hecho con ❤️ para el Mundial 2026 ⚽</p>
