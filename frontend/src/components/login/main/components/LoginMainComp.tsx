'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { useLoginMain } from '../utils/LoginUtils';
import {
  StyledLoginContainer,
  StyledLoginCard,
  StyledLogo,
  StyledTitle,
  StyledSubtitle,
  StyledField,
  StyledLabel,
  StyledInputWrapper,
  StyledInput,
  StyledError,
  StyledSubmitButton,
  StyledFooter,
  StyledFooterLink,
} from '../styles/LoginStyles';
import type { LoginMainTypes } from '../types/LoginTypes';

export default function LoginMainComp(_props: LoginMainTypes) {
  const theme = useTheme();
  const { state, actions } = useLoginMain();

  return (
    <StyledLoginContainer theme={theme}>
      <StyledLoginCard theme={theme}>
        <StyledLogo theme={theme}>
          <i className="bi bi-lightning-charge-fill" />
        </StyledLogo>
        <StyledTitle theme={theme}>Lumen</StyledTitle>
        <StyledSubtitle theme={theme}>
          Acesse sua conta para gerenciar suas finanças
        </StyledSubtitle>

        {state.error && (
          <StyledError theme={theme} data-testid="login-error">
            {state.error}
          </StyledError>
        )}

        <StyledField>
          <StyledLabel theme={theme} htmlFor="login-email">E-mail</StyledLabel>
          <StyledInputWrapper theme={theme}>
            <i className="bi bi-envelope" />
            <StyledInput
              theme={theme}
              id="login-email"
              data-testid="login-email"
              type="email"
              placeholder="seu@email.com"
              value={state.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                actions.handleEmailChange(e.target.value)
              }
            />
          </StyledInputWrapper>
        </StyledField>

        <StyledField>
          <StyledLabel theme={theme} htmlFor="login-password">Senha</StyledLabel>
          <StyledInputWrapper theme={theme}>
            <i className="bi bi-lock" />
            <StyledInput
              theme={theme}
              id="login-password"
              data-testid="login-password"
              type="password"
              placeholder="••••••••"
              value={state.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                actions.handlePasswordChange(e.target.value)
              }
            />
          </StyledInputWrapper>
        </StyledField>

        <StyledSubmitButton
          theme={theme}
          data-testid="login-submit"
          onClick={() => actions.handleSubmit()}
          disabled={state.loading}
        >
          {state.loading ? 'Entrando...' : 'Entrar'}
        </StyledSubmitButton>

        <StyledFooter theme={theme}>
          Não tem uma conta?{' '}
          <StyledFooterLink theme={theme} data-testid="login-register-link" onClick={actions.navigateToRegister}>
            Criar conta
          </StyledFooterLink>
        </StyledFooter>
      </StyledLoginCard>
    </StyledLoginContainer>
  );
}
