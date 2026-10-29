import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CashFlowChartComp from '../components/CashFlowChartComp';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('CashFlowChartComp', () => {
  it('should render chart title', () => {
    renderWithProviders(<CashFlowChartComp />);
    expect(screen.getByText('Fluxo de Caixa')).toBeInTheDocument();
  });

  it('should render filter buttons', () => {
    renderWithProviders(<CashFlowChartComp />);
    expect(screen.getByText('Receitas')).toBeInTheDocument();
    expect(screen.getByText('Despesas')).toBeInTheDocument();
  });

  it('should render legend', () => {
    renderWithProviders(<CashFlowChartComp />);
    expect(screen.getByText('Receitas')).toBeInTheDocument();
    expect(screen.getByText('Despesas')).toBeInTheDocument();
  });
});