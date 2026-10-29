import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HeaderComp from '../components/HeaderComp';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('HeaderComp', () => {
  it('should render greeting', () => {
    renderWithProviders(<HeaderComp />);
    expect(screen.getByText('Olá, Victor! 👋')).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    renderWithProviders(<HeaderComp />);
    expect(screen.getByText('Aqui está o resumo da sua vida financeira.')).toBeInTheDocument();
  });

  it('should render search input', () => {
    renderWithProviders(<HeaderComp />);
    expect(screen.getByPlaceholderText('Buscar transações, categorias, contas...')).toBeInTheDocument();
  });

  it('should render new transaction button', () => {
    renderWithProviders(<HeaderComp />);
    expect(screen.getByText('Nova Transação')).toBeInTheDocument();
  });
});