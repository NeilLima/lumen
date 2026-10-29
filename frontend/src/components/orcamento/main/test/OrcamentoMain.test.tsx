import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { theme } from '@/theme/theme';
import OrcamentoMainComp from '../components/OrcamentoMainComp';
const queryClient = new QueryClient();
function renderWithProviders(ui: React.ReactElement) { return render(<QueryClientProvider client={queryClient}><ThemeProvider theme={theme}>{ui}</ThemeProvider></QueryClientProvider>); }
describe('OrcamentoMainComp', () => {
  it('should render loading state', () => { renderWithProviders(<OrcamentoMainComp />); expect(screen.getByText('Carregando orçamento...')).toBeInTheDocument(); });
});
