import React, { useState, useRef } from 'react';
import { ConfiguracaoVisual } from '../types';
import { 
  Palette, 
  Upload, 
  Check, 
  Building2, 
  Eye, 
  Sparkles, 
  Image as ImageIcon, 
  RefreshCw,
  Info,
  CheckCircle2
} from 'lucide-react';

interface PersonalizacaoViewProps {
  configVisual: ConfiguracaoVisual;
  onSalvarConfiguracao: (novaConfig: ConfiguracaoVisual) => void;
}

// Allowed curated institutional colors
const CORES_PRINCIPAIS_PERMITIDAS = [
  { nome: 'Azul Governo (Padrão)', hex: '#1E3A8A' },
  { nome: 'Índigo Corporativo', hex: '#3730A3' },
  { nome: 'Azul Petróleo', hex: '#0F766E' },
  { nome: 'Verde Sustentabilidade', hex: '#166534' },
  { nome: 'Grafite Institucional', hex: '#334155' },
];

const CORES_SECUNDARIAS_PERMITIDAS = [
  { nome: 'Azul Celeste (Padrão)', hex: '#0284C7' },
  { nome: 'Esmeralda', hex: '#059669' },
  { nome: 'Âmbar Executivo', hex: '#D97706' },
  { nome: 'Azul Cobalto', hex: '#2563EB' },
  { nome: 'Roxo Moderno', hex: '#7C3AED' },
];

export const PersonalizacaoView: React.FC<PersonalizacaoViewProps> = ({
  configVisual,
  onSalvarConfiguracao,
}) => {
  const [formData, setFormData] = useState<ConfiguracaoVisual>(configVisual);
  const [salvoSucesso, setSalvoSucesso] = useState<boolean>(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, bannerUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestaurarPadrao = () => {
    setFormData({
      nomeInstitucional: 'OBSERVATÓRIO DE DADOS',
      subtituloInstitucional: 'Central Operacional e Administrativa',
      logoUrl: '',
      bannerUrl: '',
      corPrincipal: '#1E3A8A',
      corSecundaria: '#0284C7',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvarConfiguracao(formData);
    setSalvoSucesso(true);
    setTimeout(() => {
      setSalvoSucesso(false);
    }, 3000);
  };

  return (
    <div id="view-personalizacao" className="space-y-6 max-w-7xl mx-auto">
      {/* Informational Guidance Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3 text-xs text-sky-900">
        <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sky-950 text-sm">
            Área de Pequenas Alterações Visuais Autorizadas
          </p>
          <p className="text-slate-600 leading-relaxed">
            Este módulo é restrito para ajustes institucionais permitidos pela equipe de comunicação e design (logos, banners e paleta institucional pré-aprovada). Não são permitidas alterações arbitrárias no layout estrutural ou inserção de códigos HTML não autorizados.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Settings */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Configurações Básicas Permitidas</h3>
            </div>
            <button
              type="button"
              onClick={handleRestaurarPadrao}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Restaurar padrão</span>
            </button>
          </div>

          {/* 1. Logo Configuration */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 block">
              1. Identidade e Logo Institucional
            </label>
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div 
                className="w-16 h-16 rounded-lg border border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs"
              >
                {formData.logoUrl ? (
                  <img 
                    src={formData.logoUrl} 
                    alt="Logo Prévia" 
                    className="w-full h-full object-contain p-1" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: formData.corPrincipal }}
                  >
                    <Building2 className="w-6 h-6 mb-0.5" />
                    <span>OD</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <input
                  type="file"
                  ref={logoInputRef}
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Alterar Logo</span>
                  </button>
                  {formData.logoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, logoUrl: '' })}
                      className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md font-medium"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Formatos aceitos: PNG, JPG ou SVG (proporção quadrada ou 1:1 recomendada).
                </p>
              </div>
            </div>
          </div>

          {/* 2. Cor Principal */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 block">
              2. Cor Principal (Barra lateral e elementos de ênfase primária)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CORES_PRINCIPAIS_PERMITIDAS.map((cor) => {
                const isSelected = formData.corPrincipal === cor.hex;
                return (
                  <button
                    type="button"
                    key={cor.hex}
                    onClick={() => setFormData({ ...formData, corPrincipal: cor.hex })}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 font-bold text-slate-900 ring-2 ring-slate-900/10'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-black/10 flex items-center justify-center text-white"
                      style={{ backgroundColor: cor.hex }}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span className="truncate">{cor.nome}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Cor Secundária */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 block">
              3. Cor Secundária (Destaques, tags e indicadores de foco)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CORES_SECUNDARIAS_PERMITIDAS.map((cor) => {
                const isSelected = formData.corSecundaria === cor.hex;
                return (
                  <button
                    type="button"
                    key={cor.hex}
                    onClick={() => setFormData({ ...formData, corSecundaria: cor.hex })}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 font-bold text-slate-900 ring-2 ring-slate-900/10'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-black/10 flex items-center justify-center text-white"
                      style={{ backgroundColor: cor.hex }}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span className="truncate">{cor.nome}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Banner Institucional */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 block">
              4. Imagem de Banner ou Cabeçalho (Opcional)
            </label>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3">
              {formData.bannerUrl ? (
                <div className="relative h-20 w-full rounded-lg overflow-hidden border border-slate-300">
                  <img 
                    src={formData.bannerUrl} 
                    alt="Banner Institucional" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, bannerUrl: '' })}
                    className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="h-16 w-full rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Nenhum banner personalizado aplicado</span>
                </div>
              )}

              <input
                type="file"
                ref={bannerInputRef}
                accept="image/*"
                onChange={handleBannerUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload de Imagem de Banner</span>
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            {salvoSucesso ? (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Alterações visuais salvas com sucesso!
              </span>
            ) : (
              <span className="text-[11px] text-slate-500">
                Clique abaixo para aplicar as alterações na Central
              </span>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
            >
              Salvar Alterações
            </button>
          </div>
        </form>

        {/* Right Preview Box: Live Mockup of System Header */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 sticky top-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Eye className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Visualização Prévia Simples</h3>
            </div>

            <p className="text-xs text-slate-500">
              Veja em tempo real como a identidade visual selecionada é renderizada nos cabeçalhos e cartões da Central do Observatório:
            </p>

            {/* Simulated mini header card */}
            <div className="rounded-xl border border-slate-300 overflow-hidden shadow-xs">
              {/* Top Banner simulation */}
              {formData.bannerUrl && (
                <div className="h-16 w-full overflow-hidden">
                  <img 
                    src={formData.bannerUrl} 
                    alt="Banner Preview" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Header Bar */}
              <div 
                className="p-4 text-white flex items-center justify-between"
                style={{ backgroundColor: formData.corPrincipal }}
              >
                <div className="flex items-center gap-2.5">
                  {formData.logoUrl ? (
                    <img 
                      src={formData.logoUrl} 
                      alt="Logo" 
                      className="w-8 h-8 rounded bg-white p-0.5 object-contain" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-bold text-white text-xs">
                      OD
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold tracking-wider uppercase">
                      {formData.nomeInstitucional}
                    </h4>
                    <p className="text-[10px] text-white/80">
                      {formData.subtituloInstitucional}
                    </p>
                  </div>
                </div>

                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-2xs"
                  style={{ backgroundColor: formData.corSecundaria }}
                >
                  Ambiente Ativo
                </span>
              </div>

              {/* Body Card Sample */}
              <div className="p-4 bg-slate-50 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">
                    Sistema de Indicadores Orçamentários
                  </span>
                  <span 
                    className="text-[10px] font-semibold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: formData.corSecundaria }}
                  >
                    Destaque
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Visualização de exemplo com tipografia, botões de ação e hierarquia visual configurada.
                </p>
                <div className="pt-2 flex justify-end">
                  <button 
                    type="button"
                    className="px-3 py-1.5 text-white rounded text-[11px] font-bold transition-opacity"
                    style={{ backgroundColor: formData.corPrincipal }}
                  >
                    Botão de Exemplo
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 border border-slate-200">
              <span className="font-semibold text-slate-700">Controle de Escopo:</span> Somente alterações pré-aprovadas são renderizadas, preservando a usabilidade e estabilidade de todo o ecossistema.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
