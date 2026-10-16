import React from 'react';
import { 
  NavigationTab, 
  Sistema, 
  ConfiguracaoVisual 
} from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  Building2 
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  sistemas: Sistema[];
  configVisual: ConfiguracaoVisual;
  onNavigateToComunicacao: () => void;
  unreadCount: number;
}

const tabTitles: Record<NavigationTab, { title: string; subtitle: string }> = {
  'visao-geral': {
    title: 'Visão Geral Operacional',
    subtitle: 'Painel sintético de acompanhamento dos sistemas e comunicações com gerências',
  },
  'sistemas': {
    title: 'Sistemas por Gerência',
    subtitle: 'Acesso e monitoramento administrativo dos sistemas desenvolvidos pelo Observatório',
  },
  'comunicacao': {
    title: 'Comunicação com Gerências',
    subtitle: 'Canal corporativo direto com as gerências responsáveis e suporte contextual',
  },
  'entrada-dados': {
    title: 'Entrada Manual de Dados',
    subtitle: 'Registro e manutenção de dados administrativos consolidados em tabela',
  },
  'personalizacao': {
    title: 'Personalização Visual',
    subtitle: 'Configurações de identidade visual, logos e paletas autorizadas para a Central',
  },
  'administracao': {
    title: 'Administração Geral',
    subtitle: 'Estrutura institucional de gerências, sistemas e preparação de permissões de acesso',
  },
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  sistemas,
  configVisual,
  onNavigateToComunicacao,
  unreadCount,
}) => {
  const onlineCount = sistemas.filter((s) => s.status === 'online').length;
  const alertaCount = sistemas.filter((s) => s.status === 'alerta').length;
  const manutencaoCount = sistemas.filter((s) => s.status === 'manutencao').length;

  const currentTabInfo = tabTitles[activeTab];

  return (
    <header 
      id="main-header"
      className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs shrink-0"
    >
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1 text-slate-700">
            <Building2 className="w-3.5 h-3.5" />
            Central do Observatório
          </span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{currentTabInfo.title}</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 leading-tight">
          {currentTabInfo.title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Real-time system health summary pill */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md text-xs">
          <span className="font-medium text-slate-600">Sistemas:</span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {onlineCount} Online
          </span>
          {alertaCount > 0 && (
            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              {alertaCount} Alerta
            </span>
          )}
          {manutencaoCount > 0 && (
            <span className="inline-flex items-center gap-1 text-slate-600 font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {manutencaoCount} Manutenção
            </span>
          )}
        </div>

        {/* Unread communication shortcut */}
        {unreadCount > 0 && (
          <button
            onClick={onNavigateToComunicacao}
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors"
            title="Ver mensagens não lidas das gerências"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>{unreadCount} nova{unreadCount > 1 ? 's' : ''} mensagem{unreadCount > 1 ? 's' : ''}</span>
          </button>
        )}

        {/* Role badge */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900 leading-none">Administrador Máximo</p>
            <p className="text-[10px] text-slate-500">Observatório de Dados</p>
          </div>
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
            style={{ backgroundColor: configVisual.corPrincipal || '#1E3A8A' }}
          >
            OD
          </div>
        </div>
      </div>
    </header>
  );
};
