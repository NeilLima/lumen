'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { logoutService } from '@/services/logoutService';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import type { Theme } from '@/theme/theme';
import { dashboardTheme } from '@/theme/theme';

export default function ContaPage() {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <ContaContent />
    </ThemeProvider>
  );
}

function ContaContent() {
  const theme = useTheme();
  const { userId } = useAuth();
  const router = useRouter();
  const logout = logoutService();

  const handleSair = () => {
    logout.clearSession();
    router.replace('/login');
  };

  return (
    <StyledContainer theme={theme}>
      <StyledHeader theme={theme}>
        <StyledBackButton theme={theme} onClick={() => router.push('/')}>
          ← Voltar
        </StyledBackButton>
        <StyledTitle theme={theme}>Minha Conta</StyledTitle>
        <StyledSubtitle theme={theme}>
          Gerencie seus dados pessoais e preferências
        </StyledSubtitle>
      </StyledHeader>

      <StyledContent theme={theme}>
        <StyledCard theme={theme}>
          <StyledCardHeader theme={theme}>
            <StyledAvatar theme={theme}>
              {userId ? userId.charAt(0).toUpperCase() : 'U'}
            </StyledAvatar>
            <StyledUserInfo>
              <StyledName theme={theme}>Victor Lima</StyledName>
              <StyledEmail theme={theme}>victor@email.com</StyledEmail>
            </StyledUserInfo>
            <StyledEditButton theme={theme} onClick={handleEditarPerfil}>
              Editar
            </StyledEditButton>
          </StyledCardHeader>

          <StyledDivider theme={theme} />

          <StyledSection theme={theme}>
            <StyledSectionTitle theme={theme}>Dados Pessoais</StyledSectionTitle>
            <StyledFieldRow theme={theme}>
              <StyledLabel theme={theme}>Nome completo</StyledLabel>
              <StyledValue theme={theme}>Victor Lima</StyledValue>
            </StyledFieldRow>
            <StyledFieldRow theme={theme}>
              <StyledLabel theme={theme}>E-mail</StyledLabel>
              <StyledValue theme={theme}>victor@email.com</StyledValue>
            </StyledFieldRow>
            <StyledFieldRow theme={theme}>
              <StyledLabel theme={theme}>Plano</StyledLabel>
              <StyledValue theme={theme}>⭐ Plano Premium</StyledValue>
            </StyledFieldRow>
          </StyledSection>

          <StyledSection theme={theme}>
            <StyledSectionTitle theme={theme}>Segurança</StyledSectionTitle>
            <StyledFieldRow theme={theme}>
              <StyledLabel theme={theme}>Alterar senha</StyledLabel>
              <StyledChangePasswordButton theme={theme} onClick={handleMudarSenha}>
                Mudar senha
              </StyledChangePasswordButton>
            </StyledFieldRow>
          </StyledSection>

          <StyledSection theme={theme}>
            <StyledSectionTitle theme={theme}>Preferências</StyledSectionTitle>
            <StyledToggleRow theme={theme}>
              <StyledLabel theme={theme}>Modo escuro</StyledLabel>
              <StyledToggle theme={theme} />
            </StyledToggleRow>
            <StyledToggleRow theme={theme}>
              <StyledLabel theme={theme}>Notificações por e-mail</StyledLabel>
              <StyledToggle theme={theme} />
            </StyledToggleRow>
          </StyledSection>

          <StyledDangerZone theme={theme}>
            <StyledSectionTitle theme={theme}>Perigo</StyledSectionTitle>
            <StyledDeleteAccountButton theme={theme} onClick={handleExcluirConta}>
              Excluir minha conta
            </StyledDeleteAccountButton>
          </StyledDangerZone>

          <StyledSairButton theme={theme} onClick={handleSair} data-testid="conta-sair">
            🚪 Sair da conta
          </StyledSairButton>
        </StyledCard>
      </StyledContent>
    </StyledContainer>
  );

  function handleEditarPerfil() {
    console.log('Editar perfil');
  }

  function handleMudarSenha() {
    console.log('Mudar senha');
  }

  function handleExcluirConta() {
    console.log('Excluir conta');
  }
}

// ============================================
// STYLES
// ============================================

const StyledContainer = styled.div<{ theme: Theme }>`
  min-height: 100vh;
  background: ${props => props.theme.bgPrimary};
  color: ${props => props.theme.textPrimary};
  padding: 24px;
  font-family: ${props => props.theme.fontFamily};
`;

const StyledHeader = styled.div<{ theme: Theme }>`
  margin-bottom: 32px;
`;

const StyledBackButton = styled.button<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: ${props => props.theme.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 8px;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: ${props => props.theme.primaryHover};
  }
`;

const StyledTitle = styled.h1<{ theme: Theme }>`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.textPrimary};
  margin: 0 0 8px 0;
`;

const StyledSubtitle = styled.p<{ theme: Theme }>`
  font-size: 14px;
  color: ${props => props.theme.textMuted};
  margin: 0;
`;

const StyledContent = styled.div<{ theme: Theme }>`
  max-width: 640px;
  margin: 0 auto;
`;

const StyledCard = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  overflow: hidden;
`;

const StyledCardHeader = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const StyledAvatar = styled.div<{ theme: Theme }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.theme.primaryGradient};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
`;

const StyledUserInfo = styled.div`
  flex: 1;
`;

const StyledName = styled.span<{ theme: Theme }>`
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
`;

const StyledEmail = styled.span<{ theme: Theme }>`
  display: block;
  font-size: 13px;
  color: ${props => props.theme.textMuted};
  margin-top: 2px;
`;

const StyledEditButton = styled.button<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid ${props => props.theme.borderColorHover};
  border-radius: 6px;
  color: ${props => props.theme.textSecondary};
  font-size: 13px;
  font-weight: 500;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
`;

const StyledDivider = styled.div<{ theme: Theme }>`
  height: 1px;
  background: ${props => props.theme.borderColor};
  margin: 0;
`;

const StyledSection = styled.div<{ theme: Theme }>`
  padding: 20px 24px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const StyledSectionTitle = styled.h3<{ theme: Theme }>`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${props => props.theme.textMuted};
  margin: 0 0 16px 0;
`;

const StyledFieldRow = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const StyledLabel = styled.span<{ theme: Theme }>`
  font-size: 14px;
  color: ${props => props.theme.textSecondary};
`;

const StyledValue = styled.span<{ theme: Theme }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.textPrimary};
`;

const StyledChangePasswordButton = styled.button<{ theme: Theme }>`
  background: transparent;
  border: none;
  color: ${props => props.theme.primary};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: ${props => props.theme.primaryHover};
  }
`;

const StyledToggleRow = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const StyledToggle = styled.button<{ theme: Theme }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: ${props => props.theme.borderColor};
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 200ms ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 200ms ease;
  }

  &:hover {
    background: ${props => props.theme.primary};
  }
`;

const StyledDangerZone = styled.div<{ theme: Theme }>`
  padding: 20px 24px;
`;

const StyledDeleteAccountButton = styled.button<{ theme: Theme }>`
  background: transparent;
  border: none;
  color: ${props => props.theme.danger};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: ${props => props.theme.dangerHover};
  }
`;

const StyledSairButton = styled.button<{ theme: Theme }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${props => props.theme.dangerBg};
  border: 1px solid ${props => props.theme.danger};
  border-radius: ${props => props.theme.radiusMd};
  color: ${props => props.theme.dangerLight};
  font-size: 14px;
  font-weight: 600;
  padding: 12px;
  margin-top: 8px;
  cursor: pointer;
  transition: all ${props => props.theme.transitionFast} ease;

  &:hover {
    background: ${props => props.theme.dangerHover};
  }
`;

