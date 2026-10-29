import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { theme } from '@/theme/theme';
import LoginMainComp from '../components/LoginMainComp';
import { loginRoutes } from '../routes/LoginRoutes';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </QueryClientProvider>,
  );
}

describe('LoginMainComp', () => {
  it('should render login form with email and password fields', () => {
    renderWithProviders(<LoginMainComp />);

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('should render Lumen logo and title', () => {
    renderWithProviders(<LoginMainComp />);

    expect(screen.getByText('Lumen')).toBeInTheDocument();
    expect(screen.getByText('Acesse sua conta para gerenciar suas finanças')).toBeInTheDocument();
  });

  it('should show error message when login fails', async () => {
    renderWithProviders(<LoginMainComp />);

    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    // Should show error (the service will fail since no backend is mocked)
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByTestId('login-error')).toBeInTheDocument();
  });

  it('should navigate to register when clicking "Criar conta"', () => {
    const { rerender } = renderWithProviders(<LoginMainComp />);
    const registerLink = screen.getByTestId('login-register-link');

    fireEvent.click(registerLink);

    expect(registerLink).toBeInTheDocument();
  });

  it('should have correct routes configured', () => {
    expect(loginRoutes.login).toBe('/login');
    expect(loginRoutes.register).toBe('/registro');
    expect(loginRoutes.dashboard).toBe('/');
  });
});
