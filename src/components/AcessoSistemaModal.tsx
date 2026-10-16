import React, { useState } from 'react';
import { Sistema, Gerencia } from '../types';
import { 
  ShieldCheck, 
  ExternalLink, 
  X, 
  KeyRound, 
  CheckCircle2, 
  Server, 
  Cpu, 
  Lock, 
  Info,
  ArrowRight
} from 'lucide-react';

interface AcessoSistemaModalProps {
  sistema: Sistema | null;
  gerencia?: Gerencia;
  onClose: () => void;
}

export const AcessoSistemaModal: React.FC<AcessoSistemaModalProps> = ({
  sistema,
  gerencia,
  onClose,
}) => {
  const [etapaAcesso, setEtapaAcesso] = useState<'pronto' | 'conectando' | 'conectado'>('pronto');
  const [tokenSimulado, setTokenSimulado] = useState<string>('');

  if (!sistema) return null;

  const handleIniciarAcesso = () => {
    setEtapaAcesso('conectando');
    setTimeout(() => {
      // Simulates secure token generation
      const fakeToken = `OD-FEDERATION-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      setTokenSimulado(fakeToken);
      setEtapaAcesso('conectado');
    }, 900);
  };

  const handleAbrirNovaAba = () => {
    // Simulated redirection without exposing passwords
    window.open(sistema.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="modal-acesso-sistema"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
    >
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  Acesso Administrativo Master
                </span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {sistema.versao}
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                {sistema.nome}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* System info summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-medium">Gerência Responsável:</span>
              <span className="font-semibold text-slate-800">{gerencia?.nome || 'Gerência Institucional'}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-medium">Ambiente / Endpoint:</span>
              <span className="font-mono text-slate-800">{sistema.url}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-medium">Perfil Administrativo Atribuído:</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ROLE_OBSERVATORIO_MASTER
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span className="font-medium">Responsável Técnico:</span>
              <span className="text-slate-800">{sistema.responsavelTecnico}</span>
            </div>
          </div>

          {/* Security architecture explanation */}
          <div className="border border-sky-100 bg-sky-50/70 rounded-lg p-3 flex gap-2.5 items-start text-xs text-sky-900">
            <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <p className="font-semibold text-sky-950">
                Arquitetura de Federação Segura (SSO / Token de Sessão)
              </p>
              <p className="text-slate-600">
                Conforme as boas práticas de segurança, nenhuma senha administrativa é exposta ou trafegada no navegador. O acesso master utiliza handshake institucional entre a Central do Observatório e a aplicação destino.
              </p>
            </div>
          </div>

          {/* State View */}
          {etapaAcesso === 'pronto' && (
            <div className="bg-white border border-dashed border-slate-300 rounded-lg p-4 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Pronto para estabelecer sessão administrativa
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clique para simular a validação do token corporativo e abrir o sistema com privilégios de gestor.
                </p>
              </div>
            </div>
          )}

          {etapaAcesso === 'conectando' && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center space-y-3">
              <div className="w-8 h-8 mx-auto border-2 border-slate-300 border-t-sky-600 rounded-full animate-spin" />
              <p className="text-xs font-semibold text-slate-700">
                Validando credenciais institucionais com o Gateway do Observatório...
              </p>
            </div>
          )}

          {etapaAcesso === 'conectado' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sessão Administrativa Concedida com Sucesso</span>
              </div>
              <p className="text-xs text-emerald-900">
                O token de sessão temporário foi autorizado pelo provedor de identidade do Observatório:
              </p>
              <div className="bg-emerald-100/70 p-2 rounded text-xs font-mono text-emerald-950 break-all border border-emerald-200">
                Token: {tokenSimulado}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors"
          >
            Fechar
          </button>

          {etapaAcesso === 'pronto' && (
            <button
              onClick={handleIniciarAcesso}
              className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-md shadow-xs transition-colors flex items-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Autenticar e Acessar
            </button>
          )}

          {etapaAcesso === 'conectado' && (
            <button
              onClick={handleAbrirNovaAba}
              className="px-4 py-2 text-xs font-semibold bg-sky-700 hover:bg-sky-800 text-white rounded-md shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Abrir Sistema</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
