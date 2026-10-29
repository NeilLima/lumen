import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SidebarComp from '../components/SidebarComp';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('SidebarComp', () => {
  it('should render logo', () => {
    renderWithProviders(<SidebarComp />);
    expect(screen.getByText('Lumen')).toBeInTheDocument();
  });

  it('should render user name', () => {
    renderWithProviders(<SidebarComp />);
    expect(screen.getByText('Victor Lima')).toBeInTheDocument();
  });

  it('should render navigation sections', () => {
    renderWithProviders(<SidebarComp />);
    expect(screen.getByText('FINANCEIRO')).toBeInTheDocument();
    expect(screen.getByText('PLANEJAMENTO')).toBeInTheDocument();
  });

  it('should render active dashboard item', () => {
    renderWithProviders(<SidebarComp />);
    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink).toBeInTheDocument();
  });
});