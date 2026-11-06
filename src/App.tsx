import React, { useState, useEffect, useRef } from 'react';
import { 
  Tag, 
  TimerPreset, 
  TimerSession, 
  DailyQuest, 
  ShadowArmy, 
  Achievement, 
  PlayerProfile, 
  DayRecap,
  TimerType,
  MotivationalQuote,
  AppThemeId
} from './types';
import { getDayTimeStats, DayTimeStats, formatSecondsToHHMMSS } from './utils/dayTimer';
import { soundManager } from './utils/audio';
import { loadAppTheme, saveAppTheme, applyAppTheme } from './utils/theme';
import { 
  loadTags, saveTags,
  loadPresets, savePresets,
  loadSessions, saveSessions,
  loadProfile, saveProfile,
  loadQuests, saveQuests,
  loadShadows, saveShadows,
  loadAchievements, saveAchievements,
  loadRecaps, saveRecaps,
  loadDayTitle, saveDayTitle,
  loadQuotes, saveQuotes
} from './utils/storage';

import { Header } from './components/Header';
import { DayTimerWidget } from './components/DayTimerWidget';
import { TagsAndTimersTab } from './components/TagsAndTimersTab';
import { SoloLevelingTab } from './components/SoloLevelingTab';
import { ShadowsTab } from './components/ShadowsTab';
import { WeeklyStatsTab } from './components/WeeklyStatsTab';
import { BottomNav, TabType } from './components/BottomNav';
import { HighValueModal } from './components/HighValueModal';
import { MidnightResetModal } from './components/MidnightResetModal';
import { SystemAIModal } from './components/SystemAIModal';
import { ThemeSettingsModal } from './components/ThemeSettingsModal';
import { SystemStartupOverlay } from './components/SystemStartupOverlay';
import confetti from 'canvas-confetti';
import { Play, Pause, Check, X, Star } from 'lucide-react';

export default function App() {
  const [tags, setTags] = useState<Tag[]>(loadTags);
  const [presets, setPresets] = useState<TimerPreset[]>(loadPresets);
  const [sessions, setSessions] = useState<TimerSession[]>(loadSessions);
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);
  const [quests, setQuests] = useState<DailyQuest[]>(loadQuests);
  const [shadows, setShadows] = useState<ShadowArmy[]>(loadShadows);
  const [achievements, setAchievements] = useState<Achievement[]>(loadAchievements);
  const [recaps, setRecaps] = useState<DayRecap[]>(loadRecaps);
  const [dayTitle, setDayTitle] = useState<string>(loadDayTitle);
  const [quotes, setQuotes] = useState<MotivationalQuote[]>(loadQuotes);
  const [currentTheme, setCurrentTheme] = useState<AppThemeId>(loadAppTheme);

  const [showStartupOverlay, setShowStartupOverlay] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('day');

  const [showHighValueModal, setShowHighValueModal] = useState(false);
  const [showMidnightModal, setShowMidnightModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showEditDayTitle, setShowEditDayTitle] = useState(false);
  const [newDayTitleInput, setNewDayTitleInput] = useState(dayTitle);

  const [dayStats, setDayStats] = useState<DayTimeStats>(getDayTimeStats());
  const prevDateKeyRef = useRef<string>(dayStats.dateKey);

  const [activeSession, setActiveSession] = useState<{
    title: string;
    tagId: string;
    durationSeconds: number;
    elapsedSeconds: number;
    isRunning: boolean;
    timerType: TimerType;
    isHighValue: boolean;
    xpEarned: number;
  } | null>(null);

  useEffect(() => {
    soundManager.setEnabled(profile.soundEnabled);
  }, [profile.soundEnabled]);

  useEffect(() => {
    applyAppTheme(currentTheme);
    saveAppTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      const stats = getDayTimeStats();
      setDayStats(stats);

      if (stats.dateKey !== prevDateKeyRef.current) {
        prevDateKeyRef.current = stats.dateKey;
        setShowMidnightModal(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeSession || !activeSession.isRunning) return;

    const timer = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev || !prev.isRunning) return prev;

        const newElapsed = prev.elapsedSeconds + 1;
        const tag = tags.find((t) => t.id === prev.tagId);
        const multiplier = prev.isHighValue ? (tag?.xpMultiplier || 2.0) : 1.0;
        const currentXp = Math.floor((newElapsed / 60) * 5 * multiplier);

        if (prev.timerType !== 'stopwatch' && newElapsed >= prev.durationSeconds) {
          clearInterval(timer);
          setTimeout(() => {
            finishTimerSession(prev.title, prev.tagId, prev.durationSeconds, prev.isHighValue, currentXp);
          }, 50);
          return null;
        }

        return {
          ...prev,
          elapsedSeconds: newElapsed,
          xpEarned: currentXp,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession?.isRunning, tags]);

  useEffect(() => { saveTags(tags); }, [tags]);
  useEffect(() => { savePresets(presets); }, [presets]);
  useEffect(() => { saveSessions(sessions); }, [sessions]);
  useEffect(() => { saveProfile(profile); }, [profile]);
  useEffect(() => { saveQuests(quests); }, [quests]);
  useEffect(() => { saveShadows(shadows); }, [shadows]);
  useEffect(() => { saveAchievements(achievements); }, [achievements]);
  useEffect(() => { saveRecaps(recaps); }, [recaps]);
  useEffect(() => { saveDayTitle(dayTitle); }, [dayTitle]);
  useEffect(() => { saveQuotes(quotes); }, [quotes]);

  const addXp = (amount: number) => {
    setProfile((prev) => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpNext = prev.xpToNextLevel;
      let newStatPoints = prev.availableStatPoints;
      let leveledUp = false;

      while (newXp >= newXpNext) {
        newXp -= newXpNext;
        newLevel += 1;
        newXpNext = Math.floor(newXpNext * 1.35);
        newStatPoints += 3;
        leveledUp = true;
      }

      if (leveledUp) {
        soundManager.playLevelUp();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }

      let newRank = prev.rank;
      if (newLevel >= 30) newRank = 'Monarca de las Sombras';
      else if (newLevel >= 22) newRank = 'Cazador Rango Nacional';
      else if (newLevel >= 15) newRank = 'Rango S';
      else if (newLevel >= 10) newRank = 'Rango A';
      else if (newLevel >= 7) newRank = 'Rango B';
      else if (newLevel >= 4) newRank = 'Rango C';
      else if (newLevel >= 2) newRank = 'Rango D';

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpNext,
        availableStatPoints: newStatPoints,
        rank: newRank,
      };
    });
  };

  const startPresetTimer = (preset: TimerPreset) => {
    setActiveSession({
      title: preset.title,
      tagId: preset.tagId,
      durationSeconds: preset.defaultDurationMinutes * 60,
      elapsedSeconds: 0,
      isRunning: true,
      timerType: preset.timerType,
      isHighValue: preset.targetHighValue,
      xpEarned: 0,
    });
  };

  const finishTimerSession = (
    title: string,
    tagId: string,
    durationSeconds: number,
    isHighValue: boolean,
    earnedXp: number
  ) => {
    soundManager.playTimerComplete();
    const newSession: TimerSession = {
      id: Date.now().toString(),
      title,
      tagId,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      durationSeconds,
      xpEarned: earnedXp,
      date: dayStats.dateKey,
      isHighValue,
      completed: true,
    };

    setSessions((prev) => [newSession, ...prev]);

    const durationHours = durationSeconds / 3600;
    const hvHours = isHighValue ? durationHours : 0;

    setProfile((prev) => ({
      ...prev,
      totalFocusHours: prev.totalFocusHours + durationHours,
      totalHighValueHours: prev.totalHighValueHours + hvHours,
      totalSessions: prev.totalSessions + 1,
    }));

    addXp(earnedXp);

    setActiveSession(null);
  };

  const handleAllocateStat = (key: keyof PlayerProfile['stats']) => {
    if (profile.availableStatPoints <= 0) return;
    setProfile((prev) => ({
      ...prev,
      availableStatPoints: prev.availableStatPoints - 1,
      stats: {
        ...prev.stats,
        [key]: prev.stats[key] + 1,
      },
    }));
  };

  const handleClaimQuest = (questId: string) => {
    const q = quests.find((item) => item.id === questId);
    if (!q || !q.completed || q.claimed) return;

    setQuests((prev) =>
      prev.map((item) => (item.id === questId ? { ...item, claimed: true } : item))
    );

    addXp(q.rewardXp);
    setProfile((prev) => ({
      ...prev,
      availableStatPoints: prev.availableStatPoints + q.rewardStatPoints,
    }));
  };

  const handleUnlockQuote = (quoteId: string) => {
    const q = quotes.find((item) => item.id === quoteId);
    if (!q || q.unlocked || profile.xp < q.xpCostToUnlock) return;

    setQuotes((prev) =>
      prev.map((item) => (item.id === quoteId ? { ...item, unlocked: true } : item))
    );
  };

  const handleSetActiveQuote = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((item) => ({ ...item, active: item.id === quoteId }))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {showStartupOverlay && (
        <SystemStartupOverlay onFinish={() => setShowStartupOverlay(false)} />
      )}

      <Header
        profile={profile}
        currentTheme={currentTheme}
        onOpenAiModal={() => setShowAiModal(true)}
        onOpenThemeModal={() => setShowThemeModal(true)}
      />

      <main className="flex-1 pb-20">
        {activeTab === 'day' && (
          <DayTimerWidget
            dayStats={dayStats}
            dayTitle={dayTitle}
            activeQuote={quotes.find((q) => q.active)}
            onEditTitle={() => {
              setNewDayTitleInput(dayTitle);
              setShowEditDayTitle(true);
            }}
            onQuickStart={() => {
              const p = presets[0];
              if (p) startPresetTimer(p);
            }}
          />
        )}

        {activeTab === 'tags' && (
          <TagsAndTimersTab
            tags={tags}
            presets={presets}
            sessions={sessions}
            onStartPreset={startPresetTimer}
            onOpenHighValueModal={() => setShowHighValueModal(true)}
          />
        )}

        {activeTab === 'solo' && (
          <SoloLevelingTab
            profile={profile}
            quests={quests}
            quotes={quotes}
            onAllocateStat={handleAllocateStat}
            onClaimQuest={handleClaimQuest}
            onUnlockQuote={handleUnlockQuote}
            onSetActiveQuote={handleSetActiveQuote}
          />
        )}

        {activeTab === 'shadows' && <ShadowsTab shadows={shadows} />}

        {activeTab === 'stats' && (
          <WeeklyStatsTab profile={profile} achievements={achievements} />
        )}
      </main>

      {/* Active Session Float Bar */}
      {activeSession && (
        <div className="fixed bottom-16 left-4 right-4 z-30 max-w-xl mx-auto bg-slate-900 border-2 border-cyan-500 rounded-2xl p-3 shadow-2xl glow-cyan flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-100 font-system">{activeSession.title}</span>
              {activeSession.isHighValue && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  2x XP
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono font-black text-cyan-400 text-sm">
                {formatSecondsToHHMMSS(activeSession.elapsedSeconds)}
              </span>
              <span className="text-[10px] text-slate-400">+{activeSession.xpEarned} XP</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setActiveSession((prev) => (prev ? { ...prev, isRunning: !prev.isRunning } : null))
              }
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100"
            >
              {activeSession.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-100" />}
            </button>
            <button
              onClick={() =>
                finishTimerSession(
                  activeSession.title,
                  activeSession.tagId,
                  activeSession.elapsedSeconds,
                  activeSession.isHighValue,
                  activeSession.xpEarned
                )
              }
              className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs font-system flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              FINALIZAR
            </button>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Modals */}
      {showHighValueModal && <HighValueModal onClose={() => setShowHighValueModal(false)} />}
      {showMidnightModal && <MidnightResetModal onClose={() => setShowMidnightModal(false)} />}
      {showAiModal && <SystemAIModal onClose={() => setShowAiModal(false)} userRank={profile.rank} />}
      {showThemeModal && (
        <ThemeSettingsModal
          currentTheme={currentTheme}
          onSelectTheme={(t) => {
            setCurrentTheme(t);
            setShowThemeModal(false);
          }}
          onClose={() => setShowThemeModal(false)}
        />
      )}

      {/* Edit Day Title Modal */}
      {showEditDayTitle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/60 rounded-3xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-100 font-system uppercase">
              Título del Día del Cazador
            </h3>
            <input
              type="text"
              value={newDayTitleInput}
              onChange={(e) => setNewDayTitleInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs font-bold text-cyan-400 outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditDayTitle(false)}
                className="flex-1 py-2 bg-slate-800 text-slate-400 font-bold text-xs rounded-xl"
              >
                CANCELAR
              </button>
              <button
                onClick={() => {
                  setDayTitle(newDayTitleInput);
                  setShowEditDayTitle(false);
                }}
                className="flex-1 py-2 bg-cyan-500 text-slate-950 font-black text-xs rounded-xl font-system"
              >
                GUARDAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
