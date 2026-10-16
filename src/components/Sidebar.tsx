import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  MessageSquare, 
  TableProperties, 
  Palette, 
  ShieldCheck, 
  UserCheck,
  Building2
} from 'lucide-react';
import { NavigationTab, ConfiguracaoVisual } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unreadMessagesCount: number;
  configVisual: ConfiguracaoVisual;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  unreadMessagesCount,
  configVisual,
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'visao-geral', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'sistemas', label: 'Sistemas', icon: Layers },
    { id: 'comunicacao', label: 'Comunicação', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'entrada-dados', label: 'Entrada de Dados', icon: TableProperties },
    { id: 'personalizacao', label: 'Personalização', icon: Palette },
    { id: 'administracao', label: 'Administração', icon: ShieldCheck },
  ];

  return (
    <aside 
      id="main-sidebar"
      className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 border-r border-slate-800 select-none"
    >
      {/* Brand / Logo Area */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          {configVisual.logoUrl ? (
            <img 
              src={configVisual.logoUrl} 
              alt="Logo Institucional" 
              className="w-10 h-10 object-contain rounded bg-white p-1" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-sm shrink-0"
              style={{ backgroundColor: configVisual.corPrincipal || '#1E3A8A' }}
            >
              <Building2 className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-xs font-bold tracking-wider text-slate-100 uppercase truncate">
              {configVisual.nomeInstitucional}
            </h1>
            <p className="text-[11px] text-slate-400 truncate">
              {configVisual.subtituloInstitucional}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Navegação Operacional
          </span>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
              style={isActive ? { borderLeft: `3px solid ${configVisual.corSecundaria || '#0284C7'}` } : {}}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950 shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Access Level Profile Badge */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white truncate">
                Admin Máximo
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                Master
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              Observatório de Dados
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
