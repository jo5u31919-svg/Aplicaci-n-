import React, { useState } from 'react';
import { Sparkles, RefreshCw, X } from 'lucide-react';

interface SystemAIModalProps {
  onClose: () => void;
  userRank: string;
}

export const SystemAIModal: React.FC<SystemAIModalProps> = ({ onClose, userRank }) => {
  const advices = [
    `Análisis del Sistema: Tus bloques de 45m de Trabajo Profundo han incrementado tu Fuerza de Enfoque en un 15%. Mantén la racha para desbloquear a Igris.`,
    `Directiva del Sistema: La distracción reducida en un 30% duplica la tasa de ganancia de XP. Se recomienda eliminar notificaciones antes de tu próximo Pomodoro.`,
    `Evaluación de Cazador Rango ${userRank}: Tu consistencia es óptima. Invierte en stats de 'Ejecución' para acelerar la finalización de misiones diarias.`,
    `Estrategia de Enfoque: 'La sombra más fuerte no se forja en un día, sino en mil horas de trabajo constante.' Continúa tu cacería diaria.`,
    `Notificación del Sistema: Has completado la primera fase del día. Es un momento propicio para iniciar un bloque de estudio de 50 minutos.`
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/60 rounded-3xl max-w-sm w-full p-6 space-y-4 glow-cyan relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-cyan-400 font-system text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>CONSEJO DEL SISTEMA AI</span>
        </div>

        <div className="bg-cyan-950/40 border border-cyan-800/80 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed font-medium">
          {advices[currentIndex]}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % advices.length)}
            className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Otro
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl font-system transition-all"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};
