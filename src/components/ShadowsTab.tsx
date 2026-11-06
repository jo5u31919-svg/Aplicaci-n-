import React from 'react';
import { ShadowArmy } from '../types';
import { Shield, Zap, Lock, Users } from 'lucide-react';

interface ShadowsTabProps {
  shadows: ShadowArmy[];
}

export const ShadowsTab: React.FC<ShadowsTabProps> = ({ shadows }) => {
  return (
    <div className="p-4 max-w-xl mx-auto space-y-6 pb-24">
      {/* Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-cyan-400" />
          <div>
            <h2 className="text-xs font-bold text-slate-100 font-system uppercase">
              Ejército de Sombras del Monarca
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Desbloquea comandantes de sombras aumentando tu nivel de Cazador y acumulando horas de Alto Valor para obtener mejoras permanentes.
            </p>
          </div>
        </div>
      </div>

      {/* Shadow Commander Cards */}
      <div className="space-y-4">
        {shadows.map((shadow) => (
          <div
            key={shadow.id}
            className={`bg-slate-900/80 border rounded-2xl p-4 space-y-3 transition-all ${
              shadow.unlocked ? 'border-cyan-500/60 bg-cyan-950/20 shadow-md' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    shadow.unlocked ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {shadow.unlocked ? <Shield className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-100 font-system">{shadow.name}</h3>
                  <p className="text-[10px] text-cyan-400 font-medium">{shadow.title}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded font-system ${
                  shadow.unlocked
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {shadow.unlocked ? 'EXTRAÍDO' : shadow.rankRequired}
              </span>
            </div>

            <p className="text-xs text-slate-300 italic">"{shadow.quote}"</p>

            <div className="bg-cyan-950/40 border border-cyan-900/60 rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-slate-100">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{shadow.bonusEffect}</span>
            </div>

            {!shadow.unlocked && (
              <p className="text-[10px] font-bold text-slate-500">
                Requisito: Nivel {shadow.levelRequired}
                {shadow.highValueRequiredHours && ` • ${shadow.highValueRequiredHours}h Alto Valor`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
