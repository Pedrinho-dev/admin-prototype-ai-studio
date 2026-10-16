export type NavigationTab = 
  | 'visao-geral' 
  | 'sistemas' 
  | 'comunicacao' 
  | 'entrada-dados' 
  | 'personalizacao' 
  | 'administracao';

export type StatusSistema = 'online' | 'alerta' | 'manutencao';

export interface Gerencia {
  id: string;
  nome: string;
  sigla: string;
  descricao: string;
  responsavel: string;
  contatoEmail: string;
  telefoneRamal: string;
}

export interface Sistema {
  id: string;
  gerenciaId: string;
  nome: string;
  sigla?: string;
  descricaoCurta: string;
  status: StatusSistema;
  mensagemStatus?: string;
  url: string;
  versao: string;
  ultimaAtualizacao: string;
  responsavelTecnico: string;
}

export interface AnexoMensagem {
  nome: string;
  tamanho: string;
  tipo: string;
}

export interface Mensagem {
  id: string;
  gerenciaId: string;
  remetente: string;
  cargo: string;
  isObservatorio: boolean;
  texto: string;
  dataHora: string;
  lida: boolean;
  sistemaRelacionadoId?: string;
  anexo?: AnexoMensagem;
}

export interface RegistroDadoManual {
  id: string;
  data: string;
  categoria: string;
  valor: string;
  responsavel: string;
  observacao?: string;
  dataCriacao: string;
}

export interface ConfiguracaoVisual {
  nomeInstitucional: string;
  subtituloInstitucional: string;
  logoUrl: string;
  bannerUrl: string;
  corPrincipal: string;
  corSecundaria: string;
}
