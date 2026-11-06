import { AppThemeId, AppThemeConfig } from '../types';

export const APP_THEMES: Record<AppThemeId, AppThemeConfig> = {
  cyber_cyan: {
    id: 'cyber_cyan',
    name: 'Ciber Ciano del Sistema',
    subtitle: 'Interfaz Clásica de Solo Leveling',
    description: 'Neón azul brillante e interfaces holográficas limpias del Sistema.',
    primaryHex: '#06b6d4',
    secondaryHex: '#3b82f6',
    accentHex: '#38bdf8',
    glowRgb: '6, 182, 212',
    badgeBg: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/50',
    borderClass: 'border-cyan-500/40',
    textClass: 'text-cyan-400',
    gradientClass: 'from-cyan-500 to-blue-600',
    previewColors: ['#06b6d4', '#3b82f6', '#38bdf8'],
  },
  monarch_purple: {
    id: 'monarch_purple',
    name: 'Monarca de las Sombras',
    subtitle: 'Poder Oscuro Real de Sung Jin-Woo',
    description: 'Aura morada profunda y destellos púrpuras de energía sombría.',
    primaryHex: '#a855f7',
    secondaryHex: '#6366f1',
    accentHex: '#c084fc',
    glowRgb: '168, 85, 247',
    badgeBg: 'bg-purple-950/70 text-purple-300 border-purple-500/50',
    borderClass: 'border-purple-500/40',
    textClass: 'text-purple-400',
    gradientClass: 'from-purple-500 to-indigo-600',
    previewColors: ['#a855f7', '#6366f1', '#c084fc'],
  },
  gold_rank: {
    id: 'gold_rank',
    name: 'Rango S Dorado',
    subtitle: 'Aura Dorada de Cazador Supremo',
    description: 'Lujo, prestigio y resplandor de los cazadores más fuertes de la humanidad.',
    primaryHex: '#eab308',
    secondaryHex: '#f97316',
    accentHex: '#fde047',
    glowRgb: '234, 179, 8',
    badgeBg: 'bg-amber-950/70 text-amber-300 border-amber-500/50',
    borderClass: 'border-amber-500/40',
    textClass: 'text-amber-400',
    gradientClass: 'from-amber-400 to-orange-500',
    previewColors: ['#eab308', '#f97316', '#fde047'],
  },
  shadow_emerald: {
    id: 'shadow_emerald',
    name: 'Esmeralda Sombrío',
    subtitle: 'Energía de Resistencia Verde',
    description: 'Tono verde neón de vitalidad, concentración constante y crecimiento.',
    primaryHex: '#10b981',
    secondaryHex: '#14b8a6',
    accentHex: '#34d399',
    glowRgb: '16, 185, 129',
    badgeBg: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-400',
    gradientClass: 'from-emerald-400 to-teal-500',
    previewColors: ['#10b981', '#14b8a6', '#34d399'],
  },
  crimson_blood: {
    id: 'crimson_blood',
    name: 'Sangre Carmesí de Igris',
    subtitle: 'Furia de Combate Rojo',
    description: 'Energía carmesí de máxima intensidad y determinación inquebrantable.',
    primaryHex: '#ef4444',
    secondaryHex: '#f43f5e',
    accentHex: '#f87171',
    glowRgb: '239, 68, 68',
    badgeBg: 'bg-red-950/70 text-red-300 border-red-500/50',
    borderClass: 'border-red-500/40',
    textClass: 'text-red-400',
    gradientClass: 'from-red-500 to-rose-600',
    previewColors: ['#ef4444', '#f43f5e', '#f87171'],
  },
  midnight_abyss: {
    id: 'midnight_abyss',
    name: 'Abismo de la Medianoche',
    subtitle: 'Oscuridad Absoluta Minimalista',
    description: 'Gama de grises, plata e iluminación tenue para enfoque profundo sin distracciones.',
    primaryHex: '#64748b',
    secondaryHex: '#38bdf8',
    accentHex: '#94a3b8',
    glowRgb: '100, 116, 139',
    badgeBg: 'bg-slate-900/80 text-slate-300 border-slate-600/50',
    borderClass: 'border-slate-500/40',
    textClass: 'text-slate-300',
    gradientClass: 'from-slate-500 to-sky-600',
    previewColors: ['#64748b', '#38bdf8', '#94a3b8'],
  },
};

const THEME_KEY = 'chronos_app_theme';

export function loadAppTheme(): AppThemeId {
  const saved = localStorage.getItem(THEME_KEY) as AppThemeId;
  if (saved && APP_THEMES[saved]) {
    return saved;
  }
  return 'cyber_cyan';
}

export function saveAppTheme(themeId: AppThemeId): void {
  localStorage.setItem(THEME_KEY, themeId);
}

export function applyAppTheme(themeId: AppThemeId): void {
  const theme = APP_THEMES[themeId] || APP_THEMES.cyber_cyan;
  const root = document.documentElement;

  root.style.setProperty('--theme-primary', theme.primaryHex);
  root.style.setProperty('--theme-secondary', theme.secondaryHex);
  root.style.setProperty('--theme-accent', theme.accentHex);
  root.style.setProperty('--theme-glow-rgb', theme.glowRgb);
}
