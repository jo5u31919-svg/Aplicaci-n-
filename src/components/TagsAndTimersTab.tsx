import React, { useState } from 'react';
import { Tag, TimerPreset, TimerSession } from '../types';
import { Star, Play, Info, CheckCircle2 } from 'lucide-react';

interface TagsAndTimersTabProps {
  tags: Tag[];
  presets: TimerPreset[];
  sessions: TimerSession[];
  onStartPreset: (preset: TimerPreset) => void;
  onOpenHighValueModal: () => void;
}

export const TagsAndTimersTab: React.FC<TagsAndTimersTabProps> = ({
  tags,
  presets,
  sessions,
  onStartPreset,
  onOpenHighValueModal,
}) => {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const filteredPresets = selectedTagId
    ? presets.filter((p) => p.tagId === selectedTagId)
    : presets;

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6 pb-24">
      {/* High Value Info Banner */}
      <div 
        onClick={onOpenHighValueModal}
        className="cursor-pointer bg-cyan-950/40 border border-cyan-500/40 rounded-2xl p-3.5 flex items-center justify-between gap-3 glow-cyan transition-all hover:bg-cyan-900/30"
      >
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-cyan-400 fill-cyan-400" />
          <div>
            <h3 className="text-xs font-bold text-slate-100 font-system">ACTIVIDADES DE ALTO VALOR</h3>
            <p className="text-[11px] text-slate-300">
              Gana 2.0x XP e incrementa stats de Monarca en tareas clave.
            </p>
          </div>
        </div>
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
      </div>

      {/* Tags Filter */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-system mb-2">
          Categorías & Etiquetas
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedTagId(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedTagId === null
                ? 'bg-cyan-500 text-slate-950 font-system'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Todas
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTagId(tag.id === selectedTagId ? null : tag.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                selectedTagId === tag.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-system'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{tag.name}</span>
              {tag.isHighValue && <Star className="w-3 h-3 text-cyan-400 fill-cyan-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Presets List */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-system mb-3">
          Temporizadores del Sistema
        </h2>
        <div className="space-y-3">
          {filteredPresets.map((preset) => {
            const tag = tags.find((t) => t.id === preset.tagId);
            return (
              <div
                key={preset.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-100 font-system">
                      {preset.title}
                    </h3>
                    {preset.targetHighValue && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        2x XP
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {preset.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-cyan-400">
                    <span>
                      {preset.defaultDurationMinutes > 0
                        ? `${preset.defaultDurationMinutes} min`
                        : 'Cronómetro Libre'}
                    </span>
                    {tag && <span className="text-slate-500">• {tag.name}</span>}
                  </div>
                </div>

                <button
                  onClick={() => onStartPreset(preset)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1 shrink-0 font-system transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  INICIAR
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-system mb-3">
          Historial Reciente de Enfoque
        </h2>
        {sessions.length === 0 ? (
          <p className="text-xs text-slate-500 py-2">
            Aún no has completado ninguna sesión hoy. ¡Inicia un temporizador!
          </p>
        ) : (
          <div className="space-y-2">
            {sessions.slice(0, 5).map((session) => {
              const tag = tags.find((t) => t.id === session.tagId);
              return (
                <div
                  key={session.id}
                  className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="font-bold text-slate-200 block">{session.title}</span>
                      <span className="text-[10px] text-slate-400">
                        {Math.floor(session.durationSeconds / 60)} min • {tag?.name || 'General'}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-cyan-400">+{session.xpEarned} XP</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
