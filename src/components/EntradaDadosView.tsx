import React, { useState } from 'react';
import { RegistroDadoManual } from '../types';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Pencil, 
  Trash2, 
  X, 
  Check, 
  TableProperties, 
  Calendar, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface EntradaDadosViewProps {
  registros: RegistroDadoManual[];
  onAdicionarRegistro: (novo: Omit<RegistroDadoManual, 'id' | 'dataCriacao'>) => void;
  onEditarRegistro: (registroAtualizado: RegistroDadoManual) => void;
  onExcluirRegistro: (id: string) => void;
}

const CATEGORIAS_PADRAO = [
  'Aporte de Reserva Orçamentária',
  'Amostragem Censitária de Tráfego',
  'Índice de Cobertura Vacinal Estimado',
  'Área de Preservação Recomposta',
  'Receita Própria do IPTU Consolidada',
  'Outros Indicadores Manuais'
];

export const EntradaDadosView: React.FC<EntradaDadosViewProps> = ({
  registros,
  onAdicionarRegistro,
  onEditarRegistro,
  onExcluirRegistro,
}) => {
  const [busca, setBusca] = useState<string>('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');

  // Modals state
  const [modalFormAberto, setModalFormAberto] = useState<boolean>(false);
  const [registroEmEdicao, setRegistroEmEdicao] = useState<RegistroDadoManual | null>(null);

  const [modalVisualizarAberto, setModalVisualizarAberto] = useState<boolean>(false);
  const [registroVisualizando, setRegistroVisualizando] = useState<RegistroDadoManual | null>(null);

  const [modalExcluirAberto, setModalExcluirAberto] = useState<boolean>(false);
  const [registroParaExcluir, setRegistroParaExcluir] = useState<RegistroDadoManual | null>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    categoria: CATEGORIAS_PADRAO[0],
    valor: '',
    responsavel: '',
    observacao: '',
  });

  const abrirModalNovo = () => {
    setRegistroEmEdicao(null);
    setFormData({
      data: new Date().toISOString().split('T')[0],
      categoria: CATEGORIAS_PADRAO[0],
      valor: '',
      responsavel: 'Administrador (Observatório)',
      observacao: '',
    });
    setModalFormAberto(true);
  };

  const abrirModalEditar = (reg: RegistroDadoManual) => {
    setRegistroEmEdicao(reg);
    setFormData({
      data: reg.data,
      categoria: reg.categoria,
      valor: reg.valor,
      responsavel: reg.responsavel,
      observacao: reg.observacao || '',
    });
    setModalFormAberto(true);
  };

  const abrirModalVisualizar = (reg: RegistroDadoManual) => {
    setRegistroVisualizando(reg);
    setModalVisualizarAberto(true);
  };

  const abrirModalExcluir = (reg: RegistroDadoManual) => {
    setRegistroParaExcluir(reg);
    setModalExcluirAberto(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.valor.trim() || !formData.responsavel.trim()) return;

    if (registroEmEdicao) {
      onEditarRegistro({
        ...registroEmEdicao,
        data: formData.data,
        categoria: formData.categoria,
        valor: formData.valor,
        responsavel: formData.responsavel,
        observacao: formData.observacao,
      });
    } else {
      onAdicionarRegistro({
        data: formData.data,
        categoria: formData.categoria,
        valor: formData.valor,
        responsavel: formData.responsavel,
        observacao: formData.observacao,
      });
    }

    setModalFormAberto(false);
  };

  const handleConfirmarExclusao = () => {
    if (registroParaExcluir) {
      onExcluirRegistro(registroParaExcluir.id);
      setModalExcluirAberto(false);
      setRegistroParaExcluir(null);
    }
  };

  // Filtered records
  const registrosFiltrados = registros.filter((r) => {
    if (categoriaFiltro !== 'todas' && r.categoria !== categoriaFiltro) {
      return false;
    }
    if (busca.trim()) {
      const termo = busca.toLowerCase();
      const matchCat = r.categoria.toLowerCase().includes(termo);
      const matchVal = r.valor.toLowerCase().includes(termo);
      const matchResp = r.responsavel.toLowerCase().includes(termo);
      const matchObs = (r.observacao || '').toLowerCase().includes(termo);
      if (!matchCat && !matchVal && !matchResp && !matchObs) return false;
    }
    return true;
  });

  return (
    <div id="view-entrada-dados" className="space-y-5 max-w-7xl mx-auto">
      {/* Header Description & Action */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar registros manuais..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="todas">Todas as Categorias</option>
              {CATEGORIAS_PADRAO.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button: [+] Novo Registro */}
        <button
          id="btn-novo-registro-manual"
          onClick={abrirModalNovo}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Registro Manual</span>
        </button>
      </div>

      {/* Main Administrative Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Valor Cadastrado</th>
                <th className="py-3 px-4">Responsável</th>
                <th className="py-3 px-4">Observação</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {registrosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Nenhum registro manual encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                registrosFiltrados.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                      {reg.data}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        {reg.categoria}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {reg.valor}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {reg.responsavel}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {reg.observacao || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => abrirModalVisualizar(reg)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                          title="Visualizar Detalhes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => abrirModalEditar(reg)}
                          className="p-1.5 text-slate-500 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors"
                          title="Editar Registro"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => abrirModalExcluir(reg)}
                          className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                          title="Excluir Registro"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Total de {registrosFiltrados.length} registros manuais listados</span>
          <span className="text-[11px]">Substituição simplificada de planilhas locais para a base do Observatório</span>
        </div>
      </div>

      {/* Modal: Novo / Editar Registro */}
      {modalFormAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {registroEmEdicao ? 'Editar Registro Manual' : 'Novo Registro Manual'}
              </h3>
              <button
                onClick={() => setModalFormAberto(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Data do Registro</label>
                <input
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Categoria (Seleção)</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                >
                  {CATEGORIAS_PADRAO.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Valor / Dado</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: R$ 1.500.000,00 ou 42.500 unidades"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Responsável pelo Input</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Rios (GPLAN)"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Observação (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Detalhes ou justificativa da entrada manual..."
                  value={formData.observacao}
                  onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 resize-none focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalFormAberto(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  {registroEmEdicao ? 'Salvar Alterações' : 'Cadastrar Registro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Visualizar Registro */}
      {modalVisualizarAberto && registroVisualizando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">Detalhes do Registro Manual</h3>
              <button
                onClick={() => setModalVisualizarAberto(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Data de Referência:</span>
                  <span className="font-semibold text-slate-800">{registroVisualizando.data}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Categoria:</span>
                  <span className="font-semibold text-slate-800">{registroVisualizando.categoria}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Valor Consolidado:</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">{registroVisualizando.valor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Responsável:</span>
                  <span className="text-slate-800">{registroVisualizando.responsavel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Data de Criação:</span>
                  <span className="text-slate-600">{registroVisualizando.dataCriacao}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">Observações:</span>
                <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 leading-relaxed">
                  {registroVisualizando.observacao || 'Nenhuma observação informada.'}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setModalVisualizarAberto(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Exclusão */}
      {modalExcluirAberto && registroParaExcluir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Excluir Registro</h4>
                <p className="text-xs text-slate-500">Tem certeza que deseja remover este item?</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-bold text-slate-800">{registroParaExcluir.categoria}</span>: {registroParaExcluir.valor}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setModalExcluirAberto(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarExclusao}
                className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
