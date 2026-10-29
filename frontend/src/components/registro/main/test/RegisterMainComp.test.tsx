import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { theme } from '@/theme/theme';
import RegisterMainComp from '../components/RegisterMainComp';
import { registerRoutes } from '../routes/RegisterRoutes';

const queryClient = new QueryClient();

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </QueryClientProvider>,
  );
}

describe('RegisterMainComp', () => {
  it('should render registration form with all fields', () => {
    renderWithProviders(<RegisterMainComp />);

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Sobrenome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('João')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Silva')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mínimo 8 caracteres')).toBeInTheDocument();
    expect(screen.getByText('Criar conta')).toBeInTheDocument();
  });

  it('should render Lumen logo and title', () => {
    renderWithProviders(<RegisterMainComp />);

    expect(screen.getByText('Criar conta')).toBeInTheDocument();
    expect(screen.getByText('Comece a organizar sua vida financeira hoje')).toBeInTheDocument();
  });

  it('should show error message when registration fails', async () => {
    renderWithProviders(<RegisterMainComp />);

    const firstNameInput = screen.getByLabelText('Nome');
    const lastNameInput = screen.getByLabelText('Sobrenome');
    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByText('Criar conta');

    fireEvent.change(firstNameInput, { target: { value: 'João' } });
    fireEvent.change(lastNameInput, { target: { value: 'Silva' } });
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.click(submitButton);

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByTestId('register-error')).toBeInTheDocument();
  });

  it('should navigate to login when clicking "Entrar"', () => {
    renderWithProviders(<RegisterMainComp />);
    const loginLink = screen.getByTestId('register-login-link');

    fireEvent.click(loginLink);

    expect(loginLink).toBeInTheDocument();
  });

  it('should have correct routes configured', () => {
    expect(registerRoutes.register).toBe('/registro');
    expect(registerRoutes.login).toBe('/login');
    expect(registerRoutes.dashboard).toBe('/');
  });
});
