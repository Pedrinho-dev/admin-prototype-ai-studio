import { Gerencia, Sistema, Mensagem, RegistroDadoManual, ConfiguracaoVisual } from '../types';

export const mockGerencias: Gerencia[] = [
  {
    id: 'ger-plan',
    nome: 'Gerência de Planejamento e Orçamento',
    sigla: 'GPLAN',
    descricao: 'Responsável pelas diretrizes orçamentárias, PPA e acompanhamento financeiro das secretarias.',
    responsavel: 'Mariana Costa Rios',
    contatoEmail: 'mariana.costa@planejamento.gov.br',
    telefoneRamal: '(11) 3450-8120'
  },
  {
    id: 'ger-sau',
    nome: 'Gerência de Saúde e Vigilância Sanitária',
    sigla: 'GESAU',
    descricao: 'Gestão da rede de atenção básica, ocupação de leitos hospitalares e vigilância epidemiológica.',
    responsavel: 'Dr. Arnaldo Vasconcelos',
    contatoEmail: 'arnaldo.vasconcelos@saude.gov.br',
    telefoneRamal: '(11) 3450-8340'
  },
  {
    id: 'ger-mob',
    nome: 'Gerência de Mobilidade e Trânsito Urbano',
    sigla: 'GEMOB',
    descricao: 'Operação do transporte coletivo, malha viária, monitoramento semafórico e engenharia de tráfego.',
    responsavel: 'Roberto Nogueira Filho',
    contatoEmail: 'roberto.nogueira@mobilidade.gov.br',
    telefoneRamal: '(11) 3450-8455'
  },
  {
    id: 'ger-amb',
    nome: 'Gerência de Meio Ambiente e Sustentabilidade',
    sigla: 'GEMAS',
    descricao: 'Controle florestal, georreferenciamento de mananciais e fiscalização de áreas verdes protegidas.',
    responsavel: 'Fernanda Alencar Santos',
    contatoEmail: 'fernanda.alencar@meioambiente.gov.br',
    telefoneRamal: '(11) 3450-8670'
  }
];

export const mockSistemas: Sistema[] = [
  {
    id: 'sis-ind-orc',
    gerenciaId: 'ger-plan',
    nome: 'Sistema de Indicadores Orçamentários e Execução',
    sigla: 'SIOE',
    descricaoCurta: 'Consolidação e cruzamento das despesas e receitas liquidadas por órgão municipal.',
    status: 'online',
    url: 'https://orcamento.observatorio.gov.br',
    versao: 'v2.4.1',
    ultimaAtualizacao: '18/09/2026 09:15',
    responsavelTecnico: 'Carlos Eduardo (Observatório de Dados)'
  },
  {
    id: 'sis-ppa-metas',
    gerenciaId: 'ger-plan',
    nome: 'Painel de Metas Plurianuais e Entregas',
    sigla: 'PMPA',
    descricaoCurta: 'Acompanhamento do cumprimento das metas do Plano Plurianual e prazos dos projetos.',
    status: 'online',
    url: 'https://metas.observatorio.gov.br',
    versao: 'v1.9.0',
    ultimaAtualizacao: '16/09/2026 17:40',
    responsavelTecnico: 'Thiago Faria (Observatório de Dados)'
  },
  {
    id: 'sis-vig-leitos',
    gerenciaId: 'ger-sau',
    nome: 'Monitor de Leitos e Vigilância Epidemiológica',
    sigla: 'MLVE',
    descricaoCurta: 'Taxas de ocupação de leitos de UTI/enfermaria e boletim semanal de agravos sanitários.',
    status: 'online',
    url: 'https://leitos.observatorio.gov.br',
    versao: 'v3.1.2',
    ultimaAtualizacao: '18/09/2026 08:30',
    responsavelTecnico: 'Dra. Beatriz Campos (Observatório de Dados)'
  },
  {
    id: 'sis-sem-frota',
    gerenciaId: 'ger-mob',
    nome: 'Sistema de Gestão Semafórica e Frota Coletiva',
    sigla: 'SGSF',
    descricaoCurta: 'Telemetria em tempo real das linhas de ônibus e sincronização do corredor central.',
    status: 'alerta',
    mensagemStatus: 'Instabilidade na telemetria dos sensores do corredor norte.',
    url: 'https://transito.observatorio.gov.br',
    versao: 'v2.0.4',
    ultimaAtualizacao: '17/09/2026 21:05',
    responsavelTecnico: 'Lucas Mendes (Observatório de Dados)'
  },
  {
    id: 'sis-geo-amb',
    gerenciaId: 'ger-amb',
    nome: 'Cadastro Geoespacial de Áreas Verdes e Nascentes',
    sigla: 'CGAV',
    descricaoCurta: 'Base cartográfica e dados de cobertura vegetal para licenciamento e preservação.',
    status: 'manutencao',
    mensagemStatus: 'Janela de manutenção programada para atualização da camada raster.',
    url: 'https://geoambiente.observatorio.gov.br',
    versao: 'v1.5.0',
    ultimaAtualizacao: '12/09/2026 14:00',
    responsavelTecnico: 'Fernanda Alencar (Observatório de Dados)'
  }
];

export const mockMensagensIniciais: Mensagem[] = [
  {
    id: 'msg-1',
    gerenciaId: 'ger-plan',
    remetente: 'Mariana Costa Rios',
    cargo: 'Gerente de Planejamento',
    isObservatorio: false,
    texto: 'Bom dia, equipe do Observatório! Concluímos ontem a consolidação da folha complementar do segundo quadrimestre.',
    dataHora: '17/09/2026 09:30',
    lida: true
  },
  {
    id: 'msg-2',
    gerenciaId: 'ger-plan',
    remetente: 'Administrador Máximo',
    cargo: 'Observatório de Dados',
    isObservatorio: true,
    texto: 'Bom dia, Mariana! Excelente. O pipeline de processamento já puxou o arquivo e os indicadores foram recalculados.',
    dataHora: '17/09/2026 09:42',
    lida: true
  },
  {
    id: 'msg-3',
    gerenciaId: 'ger-plan',
    remetente: 'Mariana Costa Rios',
    cargo: 'Gerente de Planejamento',
    isObservatorio: false,
    texto: 'Notei que o filtro por subfunção de despesa na aba de relatórios não está trazendo os valores liquidados da educação infantil.',
    dataHora: '18/09/2026 08:15',
    lida: false,
    sistemaRelacionadoId: 'sis-ind-orc'
  },
  {
    id: 'msg-4',
    gerenciaId: 'ger-sau',
    remetente: 'Dr. Arnaldo Vasconcelos',
    cargo: 'Gerente de Saúde',
    isObservatorio: false,
    texto: 'Olá, equipe! A tela de visualização rápida de leitos pediátricos ficou perfeita com a última atualização de performance.',
    dataHora: '16/09/2026 16:10',
    lida: true,
    sistemaRelacionadoId: 'sis-vig-leitos'
  },
  {
    id: 'msg-5',
    gerenciaId: 'ger-mob',
    remetente: 'Roberto Nogueira Filho',
    cargo: 'Gerente de Mobilidade',
    isObservatorio: false,
    texto: 'Identificamos que os sensores do Corredor Norte perderam comunicação com a API do Observatório desde as 06h.',
    dataHora: '18/09/2026 07:45',
    lida: false,
    sistemaRelacionadoId: 'sis-sem-frota',
    anexo: {
      nome: 'log_sensores_corredor_norte.csv',
      tamanho: '142 KB',
      tipo: 'CSV'
    }
  },
  {
    id: 'msg-6',
    gerenciaId: 'ger-amb',
    remetente: 'Fernanda Alencar Santos',
    cargo: 'Gerente de Meio Ambiente',
    isObservatorio: false,
    texto: 'Confirmamos a janela de manutenção do sistema de georreferenciamento para hoje à tarde para importação das ortofotos.',
    dataHora: '18/09/2026 08:50',
    lida: true,
    sistemaRelacionadoId: 'sis-geo-amb'
  }
];

export const mockEntradasManuaisIniciais: RegistroDadoManual[] = [
  {
    id: 'reg-001',
    data: '2026-09-18',
    categoria: 'Aporte de Reserva Orçamentária',
    valor: 'R$ 1.450.000,00',
    responsavel: 'Mariana Rios (GPLAN)',
    observacao: 'Suplementação destinada ao plano emergencial de recapeamento viário.',
    dataCriacao: '18/09/2026 08:30'
  },
  {
    id: 'reg-002',
    data: '2026-09-17',
    categoria: 'Amostragem Censitária de Tráfego',
    valor: '48.230 veículos/dia',
    responsavel: 'Lucas Mendes (GEMOB)',
    observacao: 'Contagem manual referente ao ponto de bloqueio na Av. Rio Branco.',
    dataCriacao: '17/09/2026 17:15'
  },
  {
    id: 'reg-003',
    data: '2026-09-16',
    categoria: 'Índice de Cobertura Vacinal Estimado',
    valor: '89,4%',
    responsavel: 'Dra. Beatriz (GESAU)',
    observacao: 'Ajuste manual da campanha de multivacinação nas escolas municipais.',
    dataCriacao: '16/09/2026 14:20'
  },
  {
    id: 'reg-004',
    data: '2026-09-15',
    categoria: 'Área de Preservação Recomposta',
    valor: '14,2 hectares',
    responsavel: 'Fernanda Alencar (GEMAS)',
    observacao: 'Relatório físico da bacia hidrográfica do Córrego das Pedras.',
    dataCriacao: '15/09/2026 11:05'
  },
  {
    id: 'reg-005',
    data: '2026-09-12',
    categoria: 'Receita Própria do IPTU Consolidada',
    valor: 'R$ 8.920.400,00',
    responsavel: 'Mariana Rios (GPLAN)',
    observacao: 'Fechamento da primeira parcela do calendário unificado.',
    dataCriacao: '12/09/2026 18:00'
  }
];

export const configuracaoVisualInicial: ConfiguracaoVisual = {
  nomeInstitucional: 'OBSERVATÓRIO DE DADOS',
  subtituloInstitucional: 'Central Operacional e Administrativa',
  logoUrl: '',
  bannerUrl: '',
  corPrincipal: '#1E3A8A', // Deep institutional blue
  corSecundaria: '#0284C7' // Sky/accent blue
};
