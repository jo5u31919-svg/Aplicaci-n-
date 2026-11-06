import React from 'react';
import { DayTimeStats } from '../utils/dayTimer';
import { MotivationalQuote } from '../types';
import { Edit2, Play, Quote } from 'lucide-react';

interface DayTimerWidgetProps {
  dayStats: DayTimeStats;
  dayTitle: string;
  activeQuote?: MotivationalQuote;
  onEditTitle: () => void;
  onQuickStart: () => void;
}

export const DayTimerWidget: React.FC<DayTimerWidgetProps> = ({
  dayStats,
  dayTitle,
  activeQuote,
  onEditTitle,
  onQuickStart,
}) => {
  const percentage = dayStats.percentagePassed;
  const strokeDashoffset = 754 - (754 * percentage) / 100;

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Title & Edit */}
      <div 
        onClick={onEditTitle}
        className="cursor-pointer group flex items-center gap-2 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 px-4 py-1.5 rounded-full mb-2 transition-all"
      >
        <span className="text-xs font-bold text-cyan-400 font-system">{dayTitle}</span>
        <Edit2 className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
      </div>

      <span className="text-xs text-slate-400 font-medium mb-6">
        {dayStats.formattedDate}
      </span>

      {/* Radial 24h Day Timer Ring */}
      <div className="relative w-64 h-64 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            className="text-slate-900 stroke-current"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            className="text-cyan-500 stroke-current transition-all duration-1000"
            strokeWidth="12"
            strokeDasharray="754"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider font-system uppercase mb-1">
            Tiempo Restante del Día
          </span>
          <span className="text-2xl font-black text-slate-100 font-system">
            {String(dayStats.hoursRemaining).padStart(2, '0')}h {String(dayStats.minutesRemaining).padStart(2, '0')}m {String(dayStats.secondsRemainingInMin).padStart(2, '0')}s
          </span>
          <span className="mt-2 text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
            {percentage.toFixed(1)}% consumido
          </span>
          <span className="mt-1 text-[11px] text-slate-400">
            Hora actual: {dayStats.formattedTime}
          </span>
        </div>
      </div>

      {/* Quick Action Button */}
      <button
        onClick={onQuickStart}
        className="mt-6 w-full max-w-sm py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg glow-cyan transition-all font-system text-xs uppercase"
      >
        <Play className="w-4 h-4 fill-slate-950" />
        Iniciar Sesión de Enfoque
      </button>

      {/* Active Motivational Quote Card */}
      {activeQuote && (
        <div className="mt-6 w-full max-w-sm bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex gap-3 items-start">
          <Quote className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-slate-200 font-medium italic">
              "{activeQuote.quote}"
            </p>
            <span className="mt-1 block text-[10px] font-bold text-cyan-400">
              — {activeQuote.author}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
