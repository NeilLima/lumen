import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { theme } from '@/theme/theme';
import MetasMainComp from '../components/MetasMainComp';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </QueryClientProvider>
  );
}

describe('MetasMainComp', () => {
  it('should render loading state', () => {
    renderWithProviders(<MetasMainComp />);
    expect(screen.getByText('Carregando metas...')).toBeInTheDocument();
  });
});
