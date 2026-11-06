import React from 'react';
import { PlayerProfile, AppThemeId } from '../types';
import { APP_THEMES } from '../utils/theme';
import { Sparkles, Shield, Palette } from 'lucide-react';

interface HeaderProps {
  profile: PlayerProfile;
  currentTheme: AppThemeId;
  onOpenAiModal: () => void;
  onOpenThemeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentTheme,
  onOpenAiModal,
  onOpenThemeModal,
}) => {
  const theme = APP_THEMES[currentTheme];
  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 border-2 border-cyan-500/70 shadow-lg glow-cyan">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-cyan-500 text-slate-950 px-1.5 py-0.5 rounded-full font-system">
              Lvl.{profile.level}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-100 font-system tracking-wide">
                {profile.name}
              </h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                {profile.rank}
              </span>
            </div>

            {/* XP Bar */}
            <div className="mt-1 w-36 sm:w-44">
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mb-0.5">
                <span>XP {profile.xp}/{profile.xpToNextLevel}</span>
                <span className="text-cyan-400 font-bold">{xpPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 glow-progress-bar-fine"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiModal}
            className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 transition-all glow-cyan"
            title="Consejo del Sistema AI"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenThemeModal}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-all"
            title="Temas del Sistema"
          >
            <Palette className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
