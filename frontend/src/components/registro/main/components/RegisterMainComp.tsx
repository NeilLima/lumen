'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { useRegisterMain } from '../utils/RegisterUtils';
import {
  StyledRegisterContainer,
  StyledRegisterCard,
  StyledLogo,
  StyledTitle,
  StyledSubtitle,
  StyledRow,
  StyledField,
  StyledLabel,
  StyledInput,
  StyledError,
  StyledSubmitButton,
  StyledFooter,
  StyledFooterLink,
} from '../styles/RegisterStyles';
import type { RegisterMainTypes } from '../types/RegisterTypes';

export default function RegisterMainComp(_props: RegisterMainTypes) {
  const theme = useTheme();
  const { state, actions } = useRegisterMain();

  return (
    <StyledRegisterContainer theme={theme}>
      <StyledRegisterCard theme={theme}>
        <StyledLogo theme={theme}>
          <i className="bi bi-lightning-charge-fill" />
        </StyledLogo>
        <StyledTitle theme={theme}>Criar conta</StyledTitle>
        <StyledSubtitle theme={theme}>
          Comece a organizar sua vida financeira hoje
        </StyledSubtitle>

        {state.error && (
          <StyledError theme={theme} data-testid="register-error">
            {state.error}
          </StyledError>
        )}

        <StyledRow>
          <StyledField>
            <StyledLabel theme={theme} htmlFor="register-firstName">Nome</StyledLabel>
            <StyledInput
              theme={theme}
              id="register-firstName"
              data-testid="register-firstName"
              type="text"
              placeholder="João"
              value={state.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                actions.handleFirstNameChange(e.target.value)
              }
            />
          </StyledField>

          <StyledField>
            <StyledLabel theme={theme} htmlFor="register-lastName">Sobrenome</StyledLabel>
            <StyledInput
              theme={theme}
              id="register-lastName"
              data-testid="register-lastName"
              type="text"
              placeholder="Silva"
              value={state.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                actions.handleLastNameChange(e.target.value)
              }
            />
          </StyledField>
        </StyledRow>

        <StyledField>
          <StyledLabel theme={theme} htmlFor="register-email">E-mail</StyledLabel>
          <StyledInput
            theme={theme}
            id="register-email"
            data-testid="register-email"
            type="email"
            placeholder="seu@email.com"
            value={state.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              actions.handleEmailChange(e.target.value)
            }
          />
        </StyledField>

        <StyledField>
          <StyledLabel theme={theme} htmlFor="register-password">Senha</StyledLabel>
          <StyledInput
            theme={theme}
            id="register-password"
            data-testid="register-password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={state.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              actions.handlePasswordChange(e.target.value)
            }
          />
        </StyledField>

        <StyledSubmitButton
          theme={theme}
          data-testid="register-submit"
          onClick={() => actions.handleSubmit()}
          disabled={state.loading}
        >
          {state.loading ? 'Criando conta...' : 'Criar conta'}
        </StyledSubmitButton>

        <StyledFooter theme={theme}>
          Já tem uma conta?{' '}
          <StyledFooterLink theme={theme} data-testid="register-login-link" onClick={actions.navigateToLogin}>
            Entrar
          </StyledFooterLink>
        </StyledFooter>
      </StyledRegisterCard>
    </StyledRegisterContainer>
  );
}
