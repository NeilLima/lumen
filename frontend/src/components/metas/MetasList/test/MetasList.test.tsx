import { render, screen } from '@testing-library/react';
import MetasListComp from '../components/MetasListComp';

describe('MetasListComp', () => {
  it('should render empty state', () => {
    const props = {
      metasFiltradas: [], filtros: { pesquisa: '', categoria: '', status: '', prioridade: '' },
      data: { metas: [], resumo: { totalMetas: 0, totalConcluidas: 0, totalEmAndamento: 0, totalValorAlvo: 0, totalValorAtual: 0, progressoMedio: 0 }, categorias: [], evolucaoMensal: [] },
      formatarValor: (v: number) => String(v), formatarData: (d: string) => d,
      getPrioridadeLabel: () => '', getPrioridadeCor: () => '', getStatusLabel: () => '', getStatusCor: () => '', calcularProgresso: () => 0,
      onAtualizarFiltro: () => {}, onLimparFiltros: () => {}, onAbrirDetalhe: () => {}, onAbrirModalEditar: () => {}, onConfirmarExclusao: () => {},
    };
    render(<MetasListComp {...props} />);
    expect(screen.getByText('Nenhuma meta encontrada')).toBeInTheDocument();
  });
});
