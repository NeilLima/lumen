import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import KpiCardsComp from '../components/KpiCardsComp';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('KpiCardsComp', () => {
  it('should render kpi cards', () => {
    renderWithProviders(<KpiCardsComp />);
    expect(screen.getByText('Saldo Total')).toBeInTheDocument();
    expect(screen.getByText('Receitas')).toBeInTheDocument();
    expect(screen.getByText('Despesas')).toBeInTheDocument();
    expect(screen.getByText('Economia')).toBeInTheDocument();
  });

  it('should render kpi values', () => {
    renderWithProviders(<KpiCardsComp />);
    expect(screen.getByText('R$ 24.680,45')).toBeInTheDocument();
    expect(screen.getByText('R$ 18.540,00')).toBeInTheDocument();
  });
});