import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecentTransactionsComp from '../components/RecentTransactionsComp';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('RecentTransactionsComp', () => {
  it('should render card title', () => {
    renderWithProviders(<RecentTransactionsComp />);
    expect(screen.getByText('Atividades Recentes')).toBeInTheDocument();
  });

  it('should render filter buttons', () => {
    renderWithProviders(<RecentTransactionsComp />);
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Receitas')).toBeInTheDocument();
    expect(screen.getByText('Despesas')).toBeInTheDocument();
  });

  it('should render transactions', () => {
    renderWithProviders(<RecentTransactionsComp />);
    expect(screen.getByText('Supermercado Extra')).toBeInTheDocument();
    expect(screen.getByText('Salário')).toBeInTheDocument();
  });
});