export type TimerType = 'countdown' | 'stopwatch' | 'pomodoro';

export interface Tag {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  isHighValue: boolean;
  xpMultiplier: number;
}

export interface TimerPreset {
  id: string;
  title: string;
  description: string;
  tagId: string;
  defaultDurationMinutes: number;
  timerType: TimerType;
  pomodoroBreakMinutes?: number;
  targetHighValue: boolean;
}

export interface TimerSession {
  id: string;
  title: string;
  tagId: string;
  startTime: string;
  endTime: string;
  durationSeconds: number;
  xpEarned: number;
  date: string;
  isHighValue: boolean;
  completed: boolean;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  targetType: 'focus_minutes' | 'high_value_minutes' | 'completed_timers' | 'specific_tag';
  targetAmount: number;
  currentAmount: number;
  rewardXp: number;
  rewardStatPoints: number;
  rewardShadowId?: string;
  completed: boolean;
  claimed: boolean;
}

export interface ShadowArmy {
  id: string;
  name: string;
  title: string;
  rankRequired: string;
  levelRequired: number;
  unlocked: boolean;
  quote: string;
  icon: string;
  bonusEffect: string;
  highValueRequiredHours?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
  xpBonus: number;
  category: 'timer' | 'high_value' | 'level' | 'streak';
}

export interface PlayerStats {
  focus: number;
  learning: number;
  execution: number;
  rest: number;
  consistency: number;
}

export type PlayerRank = 
  | 'Rango E'
  | 'Rango D'
  | 'Rango C'
  | 'Rango B'
  | 'Rango A'
  | 'Rango S'
  | 'Cazador Rango Nacional'
  | 'Monarca de las Sombras';

export interface PlayerProfile {
  name: string;
  title: string;
  rank: PlayerRank;
  level: number;
  xp: number;
  xpToNextLevel: number;
  stats: PlayerStats;
  availableStatPoints: number;
  currentStreakDays: number;
  lastActiveDate: string;
  totalHighValueHours: number;
  totalFocusHours: number;
  totalSessions: number;
  soundEnabled: boolean;
}

export interface DayRecap {
  date: string;
  totalFocusSeconds: number;
  highValueSeconds: number;
  sessionsCount: number;
}

export interface MotivationalQuote {
  id: string;
  quote: string;
  author: string;
  category: 'Enfoque' | 'Disciplina' | 'Perseverancia' | 'Alto Valor' | 'Monarca';
  levelRequired: number;
  unlocked: boolean;
  active: boolean;
  xpCostToUnlock: number;
}

export interface BubbleConfig {
  enabled: boolean;
  displayMode: 'day_reset' | 'active_timer' | 'auto';
  dockPosition: 'right' | 'left';
  autoHidePeek: boolean;
  theme: 'cyan' | 'purple' | 'emerald' | 'amber';
  opacity: number;
}

export type AppThemeId = 
  | 'monarch_purple' 
  | 'cyber_cyan' 
  | 'gold_rank' 
  | 'shadow_emerald' 
  | 'crimson_blood' 
  | 'midnight_abyss';

export interface AppThemeConfig {
  id: AppThemeId;
  name: string;
  subtitle: string;
  description: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  glowRgb: string;
  badgeBg: string;
  borderClass: string;
  textClass: string;
  gradientClass: string;
  previewColors: string[];
}
