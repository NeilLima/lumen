import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { theme } from '@/theme/theme';
import DividasMainComp from '../components/DividasMainComp';
const qc = new QueryClient();
function rwu(ui: React.ReactElement) { return render(<QueryClientProvider client={qc}><ThemeProvider theme={theme}>{ui}</ThemeProvider></QueryClientProvider>); }
describe('DividasMainComp', () => {
  it('should render loading', () => { rwu(<DividasMainComp />); expect(screen.getByText('Carregando dividas...')).toBeInTheDocument(); });
});
