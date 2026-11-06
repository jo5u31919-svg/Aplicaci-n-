import React from 'react';
import { Moon, Sparkles } from 'lucide-react';

interface MidnightResetModalProps {
  onClose: () => void;
}

export const MidnightResetModal: React.FC<MidnightResetModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/60 rounded-3xl max-w-sm w-full p-6 space-y-4 glow-cyan text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center">
          <Moon className="w-6 h-6 text-cyan-400" />
        </div>

        <h2 className="text-base font-black text-slate-100 font-system uppercase">
          REINICIO DE MEDIANOCHE
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed">
          El ciclo de 24 horas del Sistema se ha reiniciado a las 00:00 AM. El Temporizador del Día ha vuelto a cargarse a 24 horas completas.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl font-system transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          INICIAR NUEVO DÍA
        </button>
      </div>
    </div>
  );
};
