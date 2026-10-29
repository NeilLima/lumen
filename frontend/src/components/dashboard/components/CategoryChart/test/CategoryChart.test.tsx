import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CategoryChartComp from '../components/CategoryChartComp';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('CategoryChartComp', () => {
  it('should render chart title', () => {
    renderWithProviders(<CategoryChartComp />);
    expect(screen.getByText('Gastos por Categoria')).toBeInTheDocument();
  });

  it('should render categories', () => {
    renderWithProviders(<CategoryChartComp />);
    expect(screen.getByText('Moradia')).toBeInTheDocument();
    expect(screen.getByText('Alimentação')).toBeInTheDocument();
    expect(screen.getByText('Transporte')).toBeInTheDocument();
  });

  it('should render total', () => {
    renderWithProviders(<CategoryChartComp />);
    expect(screen.getByText('Total')).toBeInTheDocument();
  });
});