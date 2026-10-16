import React, { useState } from 'react';
import { Sistema, Gerencia } from '../types';
import { 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Layers, 
  UserCheck, 
  Calendar, 
  Globe,
  ArrowUpRight
} from 'lucide-react';

interface SistemasViewProps {
  sistemas: Sistema[];
  gerencias: Gerencia[];
  onOpenAcessoModal: (sistema: Sistema) => void;
  onNavigateToComunicacaoComSistema?: (gerenciaId: string, sistemaId: string) => void;
}

export const SistemasView: React.FC<SistemasViewProps> = ({
  sistemas,
  gerencias,
  onOpenAcessoModal,
  onNavigateToComunicacaoComSistema,
}) => {
  const [filtroGerencia, setFiltroGerencia] = useState<string>('todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [busca, setBusca] = useState<string>('');

  // Filter systems
  const sistemasFiltrados = sistemas.filter((sis) => {
    if (filtroGerencia !== 'todas' && sis.gerenciaId !== filtroGerencia) {
      return false;
    }
    if (filtroStatus !== 'todos' && sis.status !== filtroStatus) {
      return false;
    }
    if (busca.trim()) {
      const termo = busca.toLowerCase();
      const matchNome = sis.nome.toLowerCase().includes(termo);
      const matchDesc = sis.descricaoCurta.toLowerCase().includes(termo);
      const matchResp = sis.responsavelTecnico.toLowerCase().includes(termo);
      if (!matchNome && !matchDesc && !matchResp) return false;
    }
    return true;
  });

  // Group filtered systems by gerencia
  const gerenciasExibidas = gerencias.filter((ger) => {
    if (filtroGerencia !== 'todas' && ger.id !== filtroGerencia) return false;
    return sistemasFiltrados.some((s) => s.gerenciaId === ger.id);
  });

  return (
    <div id="view-sistemas" className="space-y-6 max-w-7xl mx-auto">
      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por sistema, descrição ou responsável..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-medium">Gerência:</span>
          </div>
          <select
            value={filtroGerencia}
            onChange={(e) => setFiltroGerencia(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="todas">Todas as Gerências ({gerencias.length})</option>
            {gerencias.map((g) => (
              <option key={g.id} value={g.id}>
                {g.sigla} - {g.nome}
              </option>
            ))}
          </select>

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="todos">Todos os Status</option>
            <option value="online">Online</option>
            <option value="alerta">Alerta</option>
            <option value="manutencao">Manutenção</option>
          </select>
        </div>
      </div>

      {/* Systems Grouped by Gerência */}
      {gerenciasExibidas.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
          <Layers className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-800">Nenhum sistema encontrado</p>
          <p className="text-xs text-slate-500">Tente ajustar os filtros ou o termo de busca.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {gerenciasExibidas.map((gerencia) => {
            const sistemasDaGerencia = sistemasFiltrados.filter(
              (s) => s.gerenciaId === gerencia.id
            );

            return (
              <div 
                key={gerencia.id} 
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
              >
                {/* Gerência Header Block */}
                <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {gerencia.sigla}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {gerencia.nome}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Responsável: {gerencia.responsavel} • {gerencia.contatoEmail}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 shrink-0 self-start sm:self-auto">
                    {sistemasDaGerencia.length} sistema{sistemasDaGerencia.length > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Systems List inside Gerência */}
                <div className="divide-y divide-slate-100">
                  {sistemasDaGerencia.map((sistema) => {
                    const isOnline = sistema.status === 'online';
                    const isAlert = sistema.status === 'alerta';
                    const isManutencao = sistema.status === 'manutencao';

                    return (
                      <div 
                        key={sistema.id} 
                        className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        {/* Main System Info */}
                        <div className="space-y-2 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900">
                              {sistema.nome}
                            </h4>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                              {sistema.versao}
                            </span>

                            {/* Status Badge */}
                            {isOnline && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Online
                              </span>
                            )}
                            {isAlert && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                Alerta Operacional
                              </span>
                            )}
                            {isManutencao && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                Em Manutenção
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                            {sistema.descricaoCurta}
                          </p>

                          {sistema.mensagemStatus && (
                            <div className="p-2 rounded bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2 max-w-2xl">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>{sistema.mensagemStatus}</span>
                            </div>
                          )}

                          {/* Meta Details */}
                          <div className="flex items-center gap-4 text-[11px] text-slate-500 flex-wrap pt-1">
                            <span className="flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-mono text-slate-600">{sistema.url}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>Última atualização: {sistema.ultimaAtualizacao}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                              <span>Resp. Técnico: {sistema.responsavelTecnico}</span>
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
                          {onNavigateToComunicacaoComSistema && (
                            <button
                              onClick={() => onNavigateToComunicacaoComSistema(gerencia.id, sistema.id)}
                              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
                              title="Conversar com a gerência sobre este sistema"
                            >
                              Falar com Gerência
                            </button>
                          )}

                          <button
                            id={`btn-acessar-${sistema.id}`}
                            onClick={() => onOpenAcessoModal(sistema)}
                            className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-xs transition-colors flex items-center gap-2"
                            title="Acessar Sistema via Autenticação Master do Observatório"
                          >
                            <span>ACESSAR SISTEMA</span>
                            <ArrowUpRight className="w-4 h-4 text-sky-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
