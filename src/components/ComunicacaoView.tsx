import React, { useState, useRef, useEffect } from 'react';
import { Gerencia, Sistema, Mensagem, AnexoMensagem } from '../types';
import { 
  Send, 
  Paperclip, 
  Layers, 
  ExternalLink, 
  Check, 
  CheckCheck, 
  Building2, 
  User, 
  FileText, 
  X,
  Clock,
  ArrowUpRight,
  Info
} from 'lucide-react';

interface ComunicacaoViewProps {
  gerencias: Gerencia[];
  sistemas: Sistema[];
  mensagens: Mensagem[];
  onEnviarMensagem: (novaMsg: Omit<Mensagem, 'id' | 'dataHora' | 'lida'>) => void;
  onMarcarComoLidas: (gerenciaId: string) => void;
  onOpenAcessoModal: (sistema: Sistema) => void;
  selectedGerenciaIdInicial?: string;
}

export const ComunicacaoView: React.FC<ComunicacaoViewProps> = ({
  gerencias,
  sistemas,
  mensagens,
  onEnviarMensagem,
  onMarcarComoLidas,
  onOpenAcessoModal,
  selectedGerenciaIdInicial,
}) => {
  const [selectedGerenciaId, setSelectedGerenciaId] = useState<string>(
    selectedGerenciaIdInicial || gerencias[0]?.id || ''
  );
  const [textoMensagem, setTextoMensagem] = useState<string>('');
  const [sistemaRelacionadoId, setSistemaRelacionadoId] = useState<string>('');
  const [anexoPendente, setAnexoPendente] = useState<AnexoMensagem | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if selectedGerenciaIdInicial changes
  useEffect(() => {
    if (selectedGerenciaIdInicial) {
      setSelectedGerenciaId(selectedGerenciaIdInicial);
    }
  }, [selectedGerenciaIdInicial]);

  // Mark messages as read when viewing this gerencia
  useEffect(() => {
    if (selectedGerenciaId) {
      onMarcarComoLidas(selectedGerenciaId);
    }
  }, [selectedGerenciaId, onMarcarComoLidas]);

  const selectedGerencia = gerencias.find((g) => g.id === selectedGerenciaId);

  // Systems of the currently selected gerencia
  const sistemasDaGerencia = sistemas.filter(
    (s) => s.gerenciaId === selectedGerenciaId
  );

  // Messages of the currently selected gerencia
  const mensagensDaConversa = mensagens.filter(
    (m) => m.gerenciaId === selectedGerenciaId
  );

  // Scroll to bottom when conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagensDaConversa.length, selectedGerenciaId]);

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textoMensagem.trim() && !anexoPendente) return;

    onEnviarMensagem({
      gerenciaId: selectedGerenciaId,
      remetente: 'Administrador Máximo',
      cargo: 'Observatório de Dados',
      isObservatorio: true,
      texto: textoMensagem.trim(),
      sistemaRelacionadoId: sistemaRelacionadoId ? sistemaRelacionadoId : undefined,
      anexo: anexoPendente || undefined,
    });

    setTextoMensagem('');
    setSistemaRelacionadoId('');
    setAnexoPendente(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeInKb = Math.round(file.size / 1024);
      setAnexoPendente({
        nome: file.name,
        tamanho: `${sizeInKb > 1024 ? (sizeInKb / 1024).toFixed(1) + ' MB' : sizeInKb + ' KB'}`,
        tipo: file.type || 'Documento',
      });
    }
  };

  const handleRemoverAnexo = () => {
    setAnexoPendente(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="view-comunicacao" className="max-w-7xl mx-auto h-[calc(100vh-140px)] min-h-[580px] bg-white rounded-xl border border-slate-200 shadow-xs flex overflow-hidden">
      {/* Left Sidebar: Gerências Channels */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50 shrink-0">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Canais por Gerência
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Comunicação corporativa direta e contínua
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {gerencias.map((gerencia) => {
            const isSelected = gerencia.id === selectedGerenciaId;
            const msgs = mensagens.filter((m) => m.gerenciaId === gerencia.id);
            const unreadCount = msgs.filter((m) => !m.lida && !m.isObservatorio).length;
            const ultimaMsg = msgs[msgs.length - 1];

            return (
              <button
                key={gerencia.id}
                id={`chat-channel-${gerencia.id}`}
                onClick={() => setSelectedGerenciaId(gerencia.id)}
                className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 ${
                  isSelected
                    ? 'bg-sky-50/80 border-l-4 border-sky-600'
                    : 'hover:bg-slate-100/70 border-l-4 border-transparent'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {gerencia.sigla}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {gerencia.sigla}
                    </span>
                    {ultimaMsg && (
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {ultimaMsg.dataHora.split(' ')[1]}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] font-medium text-slate-700 truncate">
                    {gerencia.nome}
                  </p>

                  {ultimaMsg && (
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {ultimaMsg.isObservatorio ? 'Você: ' : ''}
                      {ultimaMsg.texto}
                    </p>
                  )}
                </div>

                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-sky-600 text-white shrink-0 self-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-200 bg-white text-[11px] text-slate-500 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Espaço de diálogo contínuo. Sem protocolos ou tickets.</span>
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {selectedGerencia?.sigla}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {selectedGerencia?.nome}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  {sistemasDaGerencia.length} sistema{sistemasDaGerencia.length > 1 ? 's' : ''} vinculados
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                Responsável na gerência: {selectedGerencia?.responsavel} • {selectedGerencia?.contatoEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {mensagensDaConversa.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Nenhuma mensagem ainda neste canal. Envie a primeira mensagem abaixo.
            </div>
          ) : (
            mensagensDaConversa.map((msg) => {
              const relatedSystem = sistemas.find((s) => s.id === msg.sistemaRelacionadoId);

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.isObservatorio ? 'items-end' : 'items-start'
                  }`}
                >
                  {/* Sender & Timestamp */}
                  <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">
                      {msg.isObservatorio ? 'Você (Observatório de Dados)' : msg.remetente}
                    </span>
                    <span>•</span>
                    <span>{msg.cargo}</span>
                    <span>•</span>
                    <span>{msg.dataHora}</span>
                  </div>

                  {/* Bubble Container */}
                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                      msg.isObservatorio
                        ? 'bg-slate-900 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.texto}</p>

                    {/* Attachment if present */}
                    {msg.anexo && (
                      <div className={`mt-2.5 p-2.5 rounded-lg flex items-center justify-between gap-3 text-xs border ${
                        msg.isObservatorio 
                          ? 'bg-slate-800/80 border-slate-700 text-slate-200' 
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium truncate">{msg.anexo.nome}</p>
                            <p className="text-[10px] opacity-70">{msg.anexo.tamanho} • {msg.anexo.tipo}</p>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-700/50">
                          Anexo
                        </span>
                      </div>
                    )}

                    {/* Related System Pill with direct Action */}
                    {relatedSystem && (
                      <div className={`mt-3 pt-2.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                        msg.isObservatorio ? 'border-slate-800' : 'border-slate-100'
                      }`}>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className={`text-[11px] font-semibold truncate ${
                            msg.isObservatorio ? 'text-sky-300' : 'text-sky-700'
                          }`}>
                            Contexto: {relatedSystem.nome}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenAcessoModal(relatedSystem)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold shrink-0 transition-colors ${
                            msg.isObservatorio
                              ? 'bg-sky-500/20 text-sky-300 hover:bg-sky-500/30'
                              : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                          }`}
                        >
                          <span>Acessar Sistema</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Send Message Form */}
        <form onSubmit={handleEnviar} className="p-4 bg-white border-t border-slate-200 space-y-3">
          {/* Optional System Relationship Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Relacionar a um sistema (opcional):
              </span>
              <select
                value={sistemaRelacionadoId}
                onChange={(e) => setSistemaRelacionadoId(e.target.value)}
                className="text-xs border border-slate-300 rounded-md px-2 py-1 bg-white text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="">Nenhum (conversa geral)</option>
                {sistemasDaGerencia.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Attached file preview if any */}
            {anexoPendente && (
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs text-slate-700">
                <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-medium truncate max-w-[180px]">{anexoPendente.nome}</span>
                <button
                  type="button"
                  onClick={handleRemoverAnexo}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Textarea + Action Bar */}
          <div className="flex items-end gap-2">
            <textarea
              rows={2}
              placeholder={`Escreva uma mensagem para a equipe de ${selectedGerencia?.sigla || 'Gerência'}... (Pressione Enter para enviar)`}
              value={textoMensagem}
              onChange={(e) => setTextoMensagem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleEnviar(e);
                }
              }}
              className="flex-1 text-xs border border-slate-300 rounded-lg p-3 resize-none focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shrink-0"
              title="Anexar arquivo"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!textoMensagem.trim() && !anexoPendente}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>Enviar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
