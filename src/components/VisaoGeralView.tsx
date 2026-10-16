import React from 'react';
import { 
  Sistema, 
  Gerencia, 
  Mensagem, 
  RegistroDadoManual, 
  NavigationTab 
} from '../types';
import { 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  ArrowUpRight, 
  Clock, 
  Building2, 
  ExternalLink,
  TableProperties,
  ArrowRight
} from 'lucide-react';

interface VisaoGeralViewProps {
  sistemas: Sistema[];
  gerencias: Gerencia[];
  mensagens: Mensagem[];
  entradasManuais: RegistroDadoManual[];
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAcessoModal: (sistema: Sistema) => void;
  onSelectGerenciaChat: (gerenciaId: string) => void;
}

export const VisaoGeralView: React.FC<VisaoGeralViewProps> = ({
  sistemas,
  gerencias,
  mensagens,
  entradasManuais,
  onSelectTab,
  onOpenAcessoModal,
  onSelectGerenciaChat,
}) => {
  const totalSistemas = sistemas.length;
  const sistemasOnline = sistemas.filter((s) => s.status === 'online').length;
  const sistemasProblema = sistemas.filter((s) => s.status === 'alerta' || s.status === 'manutencao').length;
  const mensagensNaoLidas = mensagens.filter((m) => !m.lida).length;

  // Recent 4 communications
  const comunicacoesRecentes = [...mensagens]
    .sort((a, b) => b.dataHora.localeCompare(a.dataHora))
    .slice(0, 4);

  // Recent 3 manual inputs
  const inputsRecentes = [...entradasManuais].slice(0, 3);

  const getGerencia = (id: string) => gerencias.find((g) => g.id === id);

  return (
    <div id="view-visao-geral" className="space-y-6 max-w-7xl mx-auto">
      {/* 4 Quick Operational Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total de Sistemas */}
        <div 
          onClick={() => onSelectTab('sistemas')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 cursor-pointer transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sistemas Cadastrados
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{totalSistemas}</span>
              <span className="text-xs text-slate-500 font-medium">em 4 gerências</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Sistemas Online */}
        <div 
          onClick={() => onSelectTab('sistemas')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-200 cursor-pointer transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Sistemas Online
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{sistemasOnline}</span>
              <span className="text-xs text-emerald-600 font-medium">100% operacionais</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Sistemas com Atenção / Manutenção */}
        <div 
          onClick={() => onSelectTab('sistemas')}
          className={`bg-white p-4 rounded-xl border shadow-xs cursor-pointer transition-all flex items-center justify-between ${
            sistemasProblema > 0 ? 'border-amber-200 bg-amber-50/20 hover:border-amber-300' : 'border-slate-200'
          }`}
        >
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Atenção / Manutenção
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{sistemasProblema}</span>
              <span className="text-xs text-amber-700 font-medium">requerem atenção</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Mensagens Não Lidas */}
        <div 
          onClick={() => onSelectTab('comunicacao')}
          className={`bg-white p-4 rounded-xl border shadow-xs cursor-pointer transition-all flex items-center justify-between ${
            mensagensNaoLidas > 0 ? 'border-sky-200 bg-sky-50/20 hover:border-sky-300' : 'border-slate-200'
          }`}
        >
          <div>
            <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider">
              Mensagens Não Lidas
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{mensagensNaoLidas}</span>
              <span className="text-xs text-sky-700 font-medium">das gerências</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-200">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Operational Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sistemas Operacionais por Gerência */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Acompanhamento Operacional dos Sistemas
              </h3>
            </div>
            <button
              onClick={() => onSelectTab('sistemas')}
              className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {sistemas.map((sistema) => {
              const gerencia = getGerencia(sistema.gerenciaId);
              const isAlert = sistema.status === 'alerta';
              const isManutencao = sistema.status === 'manutencao';

              return (
                <div 
                  key={sistema.id} 
                  className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-slate-500 uppercase">
                        {gerencia?.sigla}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {sistema.nome}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-100">
                        {sistema.versao}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1">
                      {sistema.descricaoCurta}
                    </p>

                    {sistema.mensagemStatus && (
                      <p className="text-xs text-amber-700 font-medium flex items-center gap-1.5 pt-0.5">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{sistema.mensagemStatus}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {sistema.status === 'online' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    )}

                    {isAlert && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Alerta
                      </span>
                    )}

                    {isManutencao && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-500" />
                        Manutenção
                      </span>
                    )}

                    <button
                      onClick={() => onOpenAcessoModal(sistema)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
                      title="Acesso Administrativo ao Sistema"
                    >
                      <span>Acessar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Comunicações Recentes com Gerências */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Comunicações Recentes
              </h3>
            </div>
            <button
              onClick={() => onSelectTab('comunicacao')}
              className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
            >
              <span>Abrir chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {comunicacoesRecentes.map((msg) => {
              const gerencia = getGerencia(msg.gerenciaId);
              const relatedSystem = sistemas.find((s) => s.id === msg.sistemaRelacionadoId);

              return (
                <div 
                  key={msg.id}
                  onClick={() => {
                    onSelectGerenciaChat(msg.gerenciaId);
                    onSelectTab('comunicacao');
                  }}
                  className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                    !msg.lida ? 'bg-sky-50/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {!msg.lida && (
                        <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                      )}
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {gerencia?.sigla} - {msg.remetente}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {msg.dataHora}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {msg.texto}
                  </p>

                  {relatedSystem && (
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-slate-700">
                      <Layers className="w-3 h-3 text-slate-500" />
                      <span className="truncate">Ref: {relatedSystem.nome}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Summary Strip: Entradas Manuais de Dados */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <TableProperties className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Últimos Dados Cadastrados Manualmente
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('entrada-dados')}
            className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
          >
            <span>Ver tabela completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {inputsRecentes.map((item) => (
            <div 
              key={item.id} 
              className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1 text-xs"
            >
              <div className="flex justify-between items-center text-slate-500 text-[11px]">
                <span>{item.data}</span>
                <span className="font-semibold text-slate-700">{item.categoria}</span>
              </div>
              <p className="text-base font-bold text-slate-900">{item.valor}</p>
              <p className="text-slate-500 text-[11px] truncate">
                Responsável: {item.responsavel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
