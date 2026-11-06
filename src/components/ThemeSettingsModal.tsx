import React from 'react';
import { AppThemeId } from '../types';
import { APP_THEMES } from '../utils/theme';
import { Palette, Check, X } from 'lucide-react';

interface ThemeSettingsModalProps {
  currentTheme: AppThemeId;
  onSelectTheme: (themeId: AppThemeId) => void;
  onClose: () => void;
}

export const ThemeSettingsModal: React.FC<ThemeSettingsModalProps> = ({
  currentTheme,
  onSelectTheme,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-slate-100 font-system text-xs font-bold">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>TEMAS DEL SISTEMA</span>
        </div>

        <div className="space-y-2 overflow-y-auto pr-1 flex-1">
          {Object.values(APP_THEMES).map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: theme.primaryHex }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 font-system">{theme.name}</h4>
                    <p className="text-[10px] text-slate-400">{theme.subtitle}</p>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl font-system transition-all"
        >
          CERRAR
        </button>
      </div>
    </div>
  );
};
