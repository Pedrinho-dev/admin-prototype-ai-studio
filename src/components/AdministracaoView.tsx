import React, { useState } from 'react';
import { Gerencia, Sistema } from '../types';
import { 
  ShieldCheck, 
  Building2, 
  Layers, 
  Users, 
  KeyRound, 
  Info, 
  CheckCircle2, 
  Clock, 
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface AdministracaoViewProps {
  gerencias: Gerencia[];
  sistemas: Sistema[];
}

export const AdministracaoView: React.FC<AdministracaoViewProps> = ({
  gerencias,
  sistemas,
}) => {
  const [secaoAtiva, setSecaoAtiva] = useState<'gerencias' | 'sistemas' | 'usuarios' | 'permissoes'>('gerencias');

  return (
    <div id="view-administracao" className="space-y-6 max-w-7xl mx-auto">
      {/* Notice Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              Painel de Governança e Estrutura Administrativa
            </h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Área de visualização da estrutura organizacional do Observatório de Dados. A arquitetura está preparada para gestão de gerências, cadastro de sistemas, usuários e federação de permissões de acesso.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Modo: Administrador Máximo
          </span>
        </div>
      </div>

      {/* Sub-nav tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setSecaoAtiva('gerencias')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            secaoAtiva === 'gerencias'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Gerências ({gerencias.length})</span>
        </button>

        <button
          onClick={() => setSecaoAtiva('sistemas')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            secaoAtiva === 'sistemas'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sistemas ({sistemas.length})</span>
        </button>

        <button
          onClick={() => setSecaoAtiva('usuarios')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            secaoAtiva === 'usuarios'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Usuários da Central</span>
        </button>

        <button
          onClick={() => setSecaoAtiva('permissoes')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 shrink-0 ${
            secaoAtiva === 'permissoes'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Níveis de Acesso</span>
        </button>
      </div>

      {/* Section 1: Gerências */}
      {secaoAtiva === 'gerencias' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Gerências Cadastradas na Central
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              4 gerências ativas
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {gerencias.map((g) => {
              const sistemasDaG = sistemas.filter((s) => s.gerenciaId === g.id);

              return (
                <div key={g.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {g.sigla}
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <h5 className="text-sm font-bold text-slate-900 truncate">
                        {g.nome}
                      </h5>
                      <p className="text-xs text-slate-600">
                        {g.descricao}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <span>Gestor: {g.responsavel}</span>
                        <span>•</span>
                        <span>{g.contatoEmail}</span>
                        <span>•</span>
                        <span>Ramal: {g.telefoneRamal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                      {sistemasDaG.length} sistema{sistemasDaG.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 2: Sistemas */}
      {secaoAtiva === 'sistemas' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Sistemas sob Gestão do Observatório
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              {sistemas.length} sistemas integrados
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {sistemas.map((s) => {
              const gerencia = gerencias.find((g) => g.id === s.gerenciaId);
              return (
                <div key={s.id} className="p-4 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{s.nome}</span>
                      <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {s.versao}
                      </span>
                    </div>
                    <p className="text-slate-600">{s.descricaoCurta}</p>
                    <p className="text-[11px] text-slate-500">
                      Gerência: <strong className="text-slate-700">{gerencia?.nome}</strong> • Lead Técnico: {s.responsavelTecnico}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="font-mono text-slate-600 text-[11px] bg-slate-50 px-2 py-1 rounded border border-slate-200">
                      {s.url}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 3: Usuários da Central */}
      {secaoAtiva === 'usuarios' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Usuários e Contas Administrativas
            </h4>
          </div>

          <div className="p-5 space-y-4">
            {/* Active Master Admin */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  ADM
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-slate-900">Administrador Máximo</h5>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Sessão Ativa
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    admin.master@observatorio.gov.br • Acesso Irrestrito à Central
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200">
                Nível: Administrador Máximo
              </span>
            </div>

            {/* Future Analyst Account Placeholder */}
            <div className="p-4 rounded-lg border border-dashed border-slate-300 text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-700">Equipe Técnica do Observatório (Futuro)</p>
                <p className="text-slate-500 text-[11px]">
                  Contas de analistas com acesso operacional e suporte serão provisionadas na próxima fase.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                Planejado
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Níveis de Acesso */}
      {secaoAtiva === 'permissoes' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Estrutura de Níveis de Acesso (Matriz Conceitual)
            </h4>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level 1: Administrador Máximo (Active) */}
            <div className="p-4 rounded-xl border-2 border-slate-900 bg-slate-50/50 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Administrador Máximo</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white">
                  Ativo neste Protótipo
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Acesso irrestrito a todos os módulos, visualização e acesso master aos sistemas de todas as gerências, canal corporativo unificado, cadastro de inputs e personalização.
              </p>
              <ul className="space-y-1 text-slate-700 font-medium pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Gestão e Acesso Master a Sistemas</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Comunicação com todas as gerências</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inputs Manuais e Personalização</span>
                </li>
              </ul>
            </div>

            {/* Level 2: Equipe do Observatório */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 text-xs opacity-85">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">Equipe do Observatório</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                  Arquitetura Pronta
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Acesso operacional focado em suporte técnico, diálogo direto com gerências, consulta de status e entradas manuais de dados sem permissão de alteração de layout.
              </p>
              <ul className="space-y-1 text-slate-600 font-medium pt-1">
                <li className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Comunicação e Suporte Técnico</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Consulta de status dos sistemas</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Entrada Manual de Dados</span>
                </li>
              </ul>
            </div>

            {/* Level 3: Gestor de Gerência */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 text-xs opacity-85">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">Gestor de Gerência</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                  Futuro
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Futura visão externa restrita: visualização exclusiva dos sistemas pertencentes à sua gerência e canal direto com o time do Observatório de Dados.
              </p>
              <ul className="space-y-1 text-slate-600 font-medium pt-1">
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Visão restrita à sua gerência</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Canal exclusivo de diálogo com OD</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
