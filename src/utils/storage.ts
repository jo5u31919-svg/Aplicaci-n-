import { 
  Tag, 
  TimerPreset, 
  TimerSession, 
  DailyQuest, 
  ShadowArmy, 
  Achievement, 
  PlayerProfile, 
  DayRecap,
  MotivationalQuote,
  BubbleConfig
} from '../types';
import { 
  INITIAL_TAGS, 
  INITIAL_PRESETS, 
  INITIAL_PROFILE, 
  INITIAL_QUESTS, 
  INITIAL_SHADOWS, 
  INITIAL_ACHIEVEMENTS,
  INITIAL_QUOTES,
  DEFAULT_BUBBLE_CONFIG
} from './initialData';

const KEYS = {
  TAGS: 'chronos_tags_v1',
  PRESETS: 'chronos_presets_v1',
  SESSIONS: 'chronos_sessions_v1',
  PROFILE: 'chronos_profile_v1',
  QUESTS: 'chronos_quests_v1',
  SHADOWS: 'chronos_shadows_v1',
  ACHIEVEMENTS: 'chronos_achievements_v1',
  RECAPS: 'chronos_recaps_v1',
  DAY_TITLE: 'chronos_day_title_v1',
  QUOTES: 'chronos_quotes_v1',
  BUBBLE_CONFIG: 'chronos_bubble_config_v1',
  APP_NAME: 'chronos_app_name_v1',
};

function getItem<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error loading ${key}:`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
  }
}

export const loadTags = (): Tag[] => getItem(KEYS.TAGS, INITIAL_TAGS);
export const saveTags = (tags: Tag[]): void => setItem(KEYS.TAGS, tags);

export const loadPresets = (): TimerPreset[] => getItem(KEYS.PRESETS, INITIAL_PRESETS);
export const savePresets = (presets: TimerPreset[]): void => setItem(KEYS.PRESETS, presets);

export const loadSessions = (): TimerSession[] => getItem(KEYS.SESSIONS, []);
export const saveSessions = (sessions: TimerSession[]): void => setItem(KEYS.SESSIONS, sessions);

export const loadProfile = (): PlayerProfile => getItem(KEYS.PROFILE, INITIAL_PROFILE);
export const saveProfile = (profile: PlayerProfile): void => setItem(KEYS.PROFILE, profile);

export const loadQuests = (): DailyQuest[] => getItem(KEYS.QUESTS, INITIAL_QUESTS);
export const saveQuests = (quests: DailyQuest[]): void => setItem(KEYS.QUESTS, quests);

export const loadShadows = (): ShadowArmy[] => getItem(KEYS.SHADOWS, INITIAL_SHADOWS);
export const saveShadows = (shadows: ShadowArmy[]): void => setItem(KEYS.SHADOWS, shadows);

export const loadAchievements = (): Achievement[] => getItem(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
export const saveAchievements = (achievements: Achievement[]): void => setItem(KEYS.ACHIEVEMENTS, achievements);

export const loadRecaps = (): DayRecap[] => getItem(KEYS.RECAPS, []);
export const saveRecaps = (recaps: DayRecap[]): void => setItem(KEYS.RECAPS, recaps);

export const loadDayTitle = (): string => getItem(KEYS.DAY_TITLE, 'Día de la Cacería del Monarca');
export const saveDayTitle = (title: string): void => setItem(KEYS.DAY_TITLE, title);

export const loadQuotes = (): MotivationalQuote[] => getItem(KEYS.QUOTES, INITIAL_QUOTES);
export const saveQuotes = (quotes: MotivationalQuote[]): void => setItem(KEYS.QUOTES, quotes);

export const loadBubbleConfig = (): BubbleConfig => getItem(KEYS.BUBBLE_CONFIG, DEFAULT_BUBBLE_CONFIG);
export const saveBubbleConfig = (config: BubbleConfig): void => setItem(KEYS.BUBBLE_CONFIG, config);

export const loadAppName = (): string => getItem(KEYS.APP_NAME, 'Chronos System');
export const saveAppName = (name: string): void => setItem(KEYS.APP_NAME, name);
