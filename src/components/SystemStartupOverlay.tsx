import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface SystemStartupOverlayProps {
  onFinish: () => void;
}

export const SystemStartupOverlay: React.FC<SystemStartupOverlayProps> = ({ onFinish }) => {
  const [text, setText] = useState('[INICIALIZANDO CHRONOS SYSTEM...]');

  useEffect(() => {
    const timer1 = setTimeout(() => setText('[VERIFICANDO REGISTROS DEL MONARCA...]'), 600);
    const timer2 = setTimeout(() => setText('[RECUPERANDO TIEMPO DEL DÍA Y MISIONES...]'), 1200);
    const timer3 = setTimeout(() => setText('[SISTEMA RPG LISTO. ¡SÉ BIENVENIDO, CAZADOR!]'), 1800);
    const timer4 = setTimeout(onFinish, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/80 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 glow-cyan">
        <Sparkles className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
        <h2 className="text-base font-black text-slate-100 font-system uppercase">
          CHRONOS SYSTEM
        </h2>
        <p className="text-xs text-cyan-400 font-mono font-bold animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
};
