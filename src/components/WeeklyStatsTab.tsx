import React from 'react';
import { PlayerProfile, Achievement } from '../types';
import { Trophy, Clock, Star, Flame, Lock } from 'lucide-react';

interface WeeklyStatsTabProps {
  profile: PlayerProfile;
  achievements: Achievement[];
}

export const WeeklyStatsTab: React.FC<WeeklyStatsTabProps> = ({ profile, achievements }) => {
  return (
    <div className="p-4 max-w-xl mx-auto space-y-6 pb-24">
      {/* Overview Grid */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-system mb-3">
          Resumen de Productividad y Enfoque
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Tiempo Total</span>
            </div>
            <span className="text-lg font-black text-slate-100 font-system block">
              {profile.totalFocusHours.toFixed(1)}h
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-medium">
              <Star className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Alto Valor</span>
            </div>
            <span className="text-lg font-black text-cyan-400 font-system block">
              {profile.totalHighValueHours.toFixed(1)}h
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
              <Trophy className="w-3.5 h-3.5" />
              <span>Sesiones</span>
            </div>
            <span className="text-lg font-black text-slate-100 font-system block">
              {profile.totalSessions}
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Racha Diaria</span>
            </div>
            <span className="text-lg font-black text-slate-100 font-system block">
              {profile.currentStreakDays} Días
            </span>
          </div>
        </div>
      </div>

      {/* Achievements List */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-system mb-3">
          Logros y Trofeos del Sistema
        </h2>
        <div className="space-y-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`bg-slate-900/80 border rounded-2xl p-3.5 flex items-center justify-between gap-3 ${
                ach.unlocked ? 'border-cyan-500/60 bg-cyan-950/20' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    ach.unlocked ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {ach.unlocked ? <Trophy className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-100 font-system">{ach.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-tight">{ach.description}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded font-system shrink-0 ${
                  ach.unlocked ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-500'
                }`}
              >
                +{ach.xpBonus} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
