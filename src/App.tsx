import React, { useState } from 'react';
import { 
  NavigationTab, 
  Sistema, 
  Gerencia, 
  Mensagem, 
  RegistroDadoManual, 
  ConfiguracaoVisual 
} from './types';
import { 
  mockGerencias, 
  mockSistemas, 
  mockMensagensIniciais, 
  mockEntradasManuaisIniciais, 
  configuracaoVisualInicial 
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { VisaoGeralView } from './components/VisaoGeralView';
import { SistemasView } from './components/SistemasView';
import { ComunicacaoView } from './components/ComunicacaoView';
import { EntradaDadosView } from './components/EntradaDadosView';
import { PersonalizacaoView } from './components/PersonalizacaoView';
import { AdministracaoView } from './components/AdministracaoView';
import { AcessoSistemaModal } from './components/AcessoSistemaModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('visao-geral');
  const [gerencias] = useState<Gerencia[]>(mockGerencias);
  const [sistemas] = useState<Sistema[]>(mockSistemas);
  const [mensagens, setMensagens] = useState<Mensagem[]>(mockMensagensIniciais);
  const [entradasManuais, setEntradasManuais] = useState<RegistroDadoManual[]>(mockEntradasManuaisIniciais);
  const [configVisual, setConfigVisual] = useState<ConfiguracaoVisual>(configuracaoVisualInicial);

  // Modal State for Accessing System
  const [sistemaParaAcesso, setSistemaParaAcesso] = useState<Sistema | null>(null);

  // Target Gerencia when jumping into communication from other views
  const [gerenciaAlvoChat, setGerenciaAlvoChat] = useState<string>(mockGerencias[0]?.id || '');

  // Calculate unread messages from gerências
  const unreadMessagesCount = mensagens.filter(
    (m) => !m.lida && !m.isObservatorio
  ).length;

  // Handlers for Communication
  const handleEnviarMensagem = (novaMsg: Omit<Mensagem, 'id' | 'dataHora' | 'lida'>) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const novaMensagemCompleta: Mensagem = {
      ...novaMsg,
      id: `msg-${Date.now()}`,
      dataHora: formattedDate,
      lida: true,
    };

    setMensagens((prev) => [...prev, novaMensagemCompleta]);
  };

  const handleMarcarComoLidas = (gerenciaId: string) => {
    setMensagens((prev) =>
      prev.map((m) =>
        m.gerenciaId === gerenciaId && !m.lida ? { ...m, lida: true } : m
      )
    );
  };

  const handleNavegarParaChatComGerencia = (gerenciaId: string, sistemaId?: string) => {
    setGerenciaAlvoChat(gerenciaId);
    setActiveTab('comunicacao');
  };

  // Handlers for Manual Data Inputs
  const handleAdicionarRegistroManual = (
    novo: Omit<RegistroDadoManual, 'id' | 'dataCriacao'>
  ) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const novoItem: RegistroDadoManual = {
      ...novo,
      id: `reg-${Date.now()}`,
      dataCriacao: formattedDate,
    };

    setEntradasManuais((prev) => [novoItem, ...prev]);
  };

  const handleEditarRegistroManual = (registroAtualizado: RegistroDadoManual) => {
    setEntradasManuais((prev) =>
      prev.map((r) => (r.id === registroAtualizado.id ? registroAtualizado : r))
    );
  };

  const handleExcluirRegistroManual = (id: string) => {
    setEntradasManuais((prev) => prev.filter((r) => r.id !== id));
  };

  // Handler for Visual Customization
  const handleSalvarConfiguracao = (novaConfig: ConfiguracaoVisual) => {
    setConfigVisual(novaConfig);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900 antialiased">
      {/* 1. Lateral Sidebar with strict 6 modules */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unreadMessagesCount={unreadMessagesCount}
        configVisual={configVisual}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          sistemas={sistemas}
          configVisual={configVisual}
          onNavigateToComunicacao={() => setActiveTab('comunicacao')}
          unreadCount={unreadMessagesCount}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'visao-geral' && (
            <VisaoGeralView
              sistemas={sistemas}
              gerencias={gerencias}
              mensagens={mensagens}
              entradasManuais={entradasManuais}
              onSelectTab={setActiveTab}
              onOpenAcessoModal={(sis) => setSistemaParaAcesso(sis)}
              onSelectGerenciaChat={(gerId) => handleNavegarParaChatComGerencia(gerId)}
            />
          )}

          {activeTab === 'sistemas' && (
            <SistemasView
              sistemas={sistemas}
              gerencias={gerencias}
              onOpenAcessoModal={(sis) => setSistemaParaAcesso(sis)}
              onNavigateToComunicacaoComSistema={handleNavegarParaChatComGerencia}
            />
          )}

          {activeTab === 'comunicacao' && (
            <ComunicacaoView
              gerencias={gerencias}
              sistemas={sistemas}
              mensagens={mensagens}
              onEnviarMensagem={handleEnviarMensagem}
              onMarcarComoLidas={handleMarcarComoLidas}
              onOpenAcessoModal={(sis) => setSistemaParaAcesso(sis)}
              selectedGerenciaIdInicial={gerenciaAlvoChat}
            />
          )}

          {activeTab === 'entrada-dados' && (
            <EntradaDadosView
              registros={entradasManuais}
              onAdicionarRegistro={handleAdicionarRegistroManual}
              onEditarRegistro={handleEditarRegistroManual}
              onExcluirRegistro={handleExcluirRegistroManual}
            />
          )}

          {activeTab === 'personalizacao' && (
            <PersonalizacaoView
              configVisual={configVisual}
              onSalvarConfiguracao={handleSalvarConfiguracao}
            />
          )}

          {activeTab === 'administracao' && (
            <AdministracaoView
              gerencias={gerencias}
              sistemas={sistemas}
            />
          )}
        </main>
      </div>

      {/* 3. Modal for "ACESSAR SISTEMA" Master Simulation */}
      {sistemaParaAcesso && (
        <AcessoSistemaModal
          sistema={sistemaParaAcesso}
          gerencia={gerencias.find((g) => g.id === sistemaParaAcesso.gerenciaId)}
          onClose={() => setSistemaParaAcesso(null)}
        />
      )}
    </div>
  );
}
