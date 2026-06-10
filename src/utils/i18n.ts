import type { Locale } from '../types';

type TranslationDict = Record<string, { es: string; en: string }>;

const translations: TranslationDict = {
  // App
  'app.title': { es: 'Prode Mundial 2026', en: 'World Cup 2026 PRODE' },
  'app.subtitle': {
    es: 'Pronosticá todos los partidos del Mundial',
    en: 'Predict every World Cup match',
  },
  'app.reset': { es: 'Reiniciar', en: 'Reset' },
  'app.reset.confirm': {
    es: '¿Estás seguro? Se borrarán todos tus pronósticos.',
    en: 'Are you sure? All predictions will be deleted.',
  },
  'app.loading': { es: 'Cargando...', en: 'Loading...' },

  // Username
  'username.placeholder': { es: 'Tu nombre', en: 'Your name' },
  'username.start': { es: 'Comenzar', en: 'Start' },
  'username.prompt': { es: '¿Cómo te llamás?', en: 'What is your name?' },

  // Group Stage
  'group.title': { es: 'Fase de Grupos', en: 'Group Stage' },
  'group.table': { es: 'Tabla', en: 'Table' },
  'group.matches': { es: 'Partidos', en: 'Matches' },
  'group.group': { es: 'Grupo', en: 'Group' },

  // Standings table headers
  'table.pos': { es: '#', en: '#' },
  'table.team': { es: 'Equipo', en: 'Team' },
  'table.pld': { es: 'PJ', en: 'P' },
  'table.w': { es: 'G', en: 'W' },
  'table.d': { es: 'E', en: 'D' },
  'table.l': { es: 'P', en: 'L' },
  'table.gf': { es: 'GF', en: 'GF' },
  'table.ga': { es: 'GC', en: 'GA' },
  'table.gd': { es: 'GD', en: 'GD' },
  'table.pts': { es: 'Pts', en: 'Pts' },

  // Knockout
  'knockout.title': { es: 'Fase Eliminatoria', en: 'Knockout Stage' },
  'knockout.no.matches': {
    es: 'Primero pronosticá la fase de grupos',
    en: 'Predict group stage first',
  },
  'knockout.r32': { es: 'Dieciseisavos de Final', en: 'Round of 32' },
  'knockout.r16': { es: 'Octavos de Final', en: 'Round of 16' },
  'knockout.qf': { es: 'Cuartos de Final', en: 'Quarter-finals' },
  'knockout.sf': { es: 'Semifinales', en: 'Semi-finals' },
  'knockout.third': { es: 'Partido por el 3er Puesto', en: 'Third Place' },
  'knockout.final': { es: 'Final', en: 'Final' },
  'knockout.champion': { es: '🏆 Campeón', en: '🏆 Champion' },
  'knockout.pending': { es: 'A definir', en: 'TBD' },

  // Match
  'match.home': { es: 'Local', en: 'Home' },
  'match.away': { es: 'Visitante', en: 'Away' },
  'match.score': { es: 'Goles', en: 'Goals' },
  'match.penalties': { es: 'Penales', en: 'Penalties' },
  'match.penalty.winner': { es: 'Ganador por penales', en: 'Penalty winner' },
  'match.penalty.home': { es: 'Local gana por penales', en: 'Home wins on pens' },
  'match.penalty.away': { es: 'Visitante gana por penales', en: 'Away wins on pens' },
  'match.select.winner': { es: 'Seleccioná quién avanza', en: 'Select who advances' },
  'match.prediction.required': { es: 'Completá el resultado', en: 'Enter the score' },

  // Share
  'share.button': { es: 'Compartir mi Prode', en: 'Share my PRODE' },
  'share.copied': { es: '¡Link copiado!', en: 'Link copied!' },
  'share.error': { es: 'Error al copiar el link', en: 'Failed to copy link' },

  // Theme
  'theme.light': { es: 'Modo Claro', en: 'Light Mode' },
  'theme.dark': { es: 'Modo Oscuro', en: 'Dark Mode' },

  // Language
  'lang.es': { es: 'Español', en: 'Spanish' },
  'lang.en': { es: 'Inglés', en: 'English' },

  // Status
  'status.all.predicted': {
    es: '¡Todos los partidos pronosticados!',
    en: 'All matches predicted!',
  },
  'status.missing': { es: 'Faltan {n} resultados', en: '{n} predictions missing' },

  // Validation
  'validation.enter.scores': { es: 'Ingresá los goles', en: 'Enter the scores' },
  'validation.select.penalty': {
    es: 'Seleccioná el ganador por penales',
    en: 'Select penalty winner',
  },
  'validation.name.required': {
    es: 'Por favor ingresá tu nombre',
    en: 'Please enter your name',
  },
};

/**
 * Translate a key to the given locale, with optional parameter substitution.
 */
export function t(key: string, locale: Locale, params?: Record<string, string | number>): string {
  const entry = translations[key];
  if (!entry) return key;

  let text = entry[locale];
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }

  return text;
}

/**
 * Detect locale from the `?lang=` query parameter.
 * Falls back to Spanish.
 */
export function getLocaleFromURL(): Locale {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  if (lang === 'en' || lang === 'es') return lang;
  return 'es';
}

/**
 * Read persisted locale from localStorage.
 * Falls back to Spanish.
 */
export function getLocaleFromStorage(): Locale {
  const stored = localStorage.getItem('prode-locale');
  if (stored === 'en' || stored === 'es') return stored;
  return 'es';
}
