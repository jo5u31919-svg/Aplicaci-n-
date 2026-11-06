import React from 'react';
import { PlayerProfile, DailyQuest, MotivationalQuote } from '../types';
import { Shield, Plus, Lock, Check } from 'lucide-react';

interface SoloLevelingTabProps {
  profile: PlayerProfile;
  quests: DailyQuest[];
  quotes: MotivationalQuote[];
  onAllocateStat: (statKey: keyof PlayerProfile['stats']) => void;
  onClaimQuest: (questId: string) => void;
  onUnlockQuote: (quoteId: string) => void;
  onSetActiveQuote: (quoteId: string) => void;
}

export const SoloLevelingTab: React.FC<SoloLevelingTabProps> = ({
  profile,
  quests,
  quotes,
  onAllocateStat,
  onClaimQuest,
  onUnlockQuote,
  onSetActiveQuote,
}) => {
  const statLabels: Array<{ key: keyof PlayerProfile['stats']; label: string }> = [
    { key: 'focus', label: 'Fuerza de Enfoque' },
    { key: 'learning', label: 'Inteligencia / Aprendizaje' },
    { key: 'execution', label: 'Agilidad / Ejecución' },
    { key: 'rest', label: 'Vitalidad / Equilibrio' },
    { key: 'consistency', label: 'Voluntad / Racha Diaria' },
  ];

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6 pb-24">
      {/* Player RPG Profile Card */}
      <div className="bg-slate-900/90 border border-cyan-500/50 rounded-2xl p-4 shadow-lg glow-cyan">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-100 font-system">{profile.name}</h2>
            <p className="text-xs text-cyan-400 font-medium">{profile.title}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 font-system">
            {profile.rank}
          </span>
        </div>

        {/* Stat Allocation Points */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-3">
            <span className="text-slate-400">PUNTOS DE ATRIBUTO DISPONIBLES:</span>
            <span className="text-cyan-400 font-system text-sm">{profile.availableStatPoints}</span>
          </div>

          <div className="space-y-2">
            {statLabels.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-300 font-medium">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400 w-6 text-right font-system">
                    {profile.stats[key]}
                  </span>
                  <button
                    onClick={() => onAllocateStat(key)}
                    disabled={profile.availableStatPoints <= 0}
                    className="p-1 rounded-lg bg-cyan-500 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 transition-all"
                    title={`Aumentar ${label}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Quests */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-system mb-3">
          Misiones Diarias del Sistema
        </h2>
        <div className="space-y-3">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={`bg-slate-900/80 border rounded-2xl p-4 space-y-2 transition-all ${
                quest.completed ? 'border-cyan-500/60 bg-cyan-950/20' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-100 font-system">{quest.title}</h3>
                {quest.claimed ? (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                    RECLAMADO
                  </span>
                ) : quest.completed ? (
                  <button
                    onClick={() => onClaimQuest(quest.id)}
                    className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[10px] rounded-lg font-system"
                  >
                    RECLAMAR
                  </button>
                ) : null}
              </div>

              <p className="text-[11px] text-slate-400">{quest.description}</p>

              <div className="flex justify-between text-[10px] font-bold text-cyan-400 pt-1">
                <span>Progreso: {quest.currentAmount}/{quest.targetAmount}</span>
                <span>+{quest.rewardXp} XP • +{quest.rewardStatPoints} Atributos</span>
              </div>

              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (quest.currentAmount / quest.targetAmount) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quotes */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-system mb-3">
          Decretos & Citas del Monarca
        </h2>
        <div className="space-y-2.5">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className={`bg-slate-900/60 border rounded-xl p-3 flex items-center justify-between gap-3 ${
                quote.active ? 'border-cyan-500/80 bg-cyan-950/30' : 'border-slate-800'
              }`}
            >
              <div className="space-y-0.5">
                <p className="text-xs text-slate-200 font-medium italic">"{quote.quote}"</p>
                <span className="text-[10px] font-bold text-cyan-400">— {quote.author}</span>
              </div>

              <div className="shrink-0">
                {quote.active ? (
                  <span className="text-[9px] font-bold px-2 py-1 bg-cyan-500 text-slate-950 rounded-lg font-system">
                    ACTIVA
                  </span>
                ) : quote.unlocked ? (
                  <button
                    onClick={() => onSetActiveQuote(quote.id)}
                    className="text-[10px] font-bold px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                  >
                    ACTIVAR
                  </button>
                ) : (
                  <button
                    onClick={() => onUnlockQuote(quote.id)}
                    disabled={profile.xp < quote.xpCostToUnlock || profile.level < quote.levelRequired}
                    className="text-[10px] font-bold px-2.5 py-1 bg-cyan-950 disabled:bg-slate-900 text-cyan-400 disabled:text-slate-600 border border-cyan-800 disabled:border-slate-800 rounded-lg font-system"
                  >
                    {quote.xpCostToUnlock} XP
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
