import React from 'react';
import { Star, X } from 'lucide-react';

interface HighValueModalProps {
  onClose: () => void;
}

export const HighValueModal: React.FC<HighValueModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/60 rounded-3xl max-w-sm w-full p-6 space-y-4 glow-cyan relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center">
            <Star className="w-6 h-6 text-cyan-400 fill-cyan-400" />
          </div>
          <h2 className="text-base font-black text-slate-100 font-system uppercase">
            Actividades de Alto Valor
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed text-center">
          Las actividades marcadas como Alto Valor (Trabajo Profundo, Programación, Estudio Activo) otorgan un multiplicador de <strong className="text-cyan-400 font-bold">2.0x XP</strong> y contribuyen directamente al avance de rango del Monarca.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl font-system transition-all"
        >
          ENTENDIDO
        </button>
      </div>
    </div>
  );
};
