import React from 'react';
import { Hourglass, Tags, Shield, Users, BarChart3 } from 'lucide-react';

export type TabType = 'day' | 'tags' | 'solo' | 'shadows' | 'stats';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'day' as TabType, label: 'Día', icon: Hourglass },
    { id: 'tags' as TabType, label: 'Timers', icon: Tags },
    { id: 'solo' as TabType, label: 'Sistema RPG', icon: Shield },
    { id: 'shadows' as TabType, label: 'Sombras', icon: Users },
    { id: 'stats' as TabType, label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 px-2 py-2">
      <div className="max-w-xl mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] font-system">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
