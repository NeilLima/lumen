'use client';

import { useSidebar } from '../utils/SidebarUtils';
import {
  StyledSidebarContainer,
  StyledLogo,
  StyledLogoIcon,
  StyledLogoText,
  StyledLogoTitle,
  StyledLogoSubtitle,
  StyledNavSection,
  StyledSectionLabel,
  StyledNavItem,
  StyledNavIcon,
  StyledNavLabel,
  StyledSidebarFooter,
  StyledUserCard,
  StyledUserAvatar,
  StyledUserInfo,
  StyledUserName,
  StyledUserEmail,
  StyledUserPlan,
  StyledThemeToggle,
  StyledThemeToggleIcon,
  StyledLogoutButton,
} from '../styles/SidebarStyles';

export default function SidebarComp({ $isOpen }: { $isOpen?: boolean }) {
  const { state, helpers, theme } = useSidebar();
  const data = state.data;

  if (!data) return null;

  return (
    <StyledSidebarContainer $isOpen={$isOpen} theme={theme}>
      <StyledLogo>
        <StyledLogoIcon theme={theme}>🌿</StyledLogoIcon>
        <StyledLogoText>
          <StyledLogoTitle theme={theme}>Lumen</StyledLogoTitle>
          <StyledLogoSubtitle theme={theme}>Gestão Financeira Pessoal</StyledLogoSubtitle>
        </StyledLogoText>
      </StyledLogo>

      {Object.entries(data.sections).map(([sectionName, items]) => (
        <StyledNavSection key={sectionName}>
          <StyledSectionLabel theme={theme}>{sectionName.toUpperCase()}</StyledSectionLabel>
          {items.map(item => (
            <StyledNavItem
              key={item.label}
              theme={theme}
              $active={helpers.isActive(item.path)}
              onClick={() => helpers.navigate(item.path)}
            >
              <StyledNavIcon>{helpers.getIconName(item.icon)}</StyledNavIcon>
              <StyledNavLabel>{item.label}</StyledNavLabel>
            </StyledNavItem>
          ))}
        </StyledNavSection>
      ))}

      <StyledSidebarFooter theme={theme}>
        <StyledUserCard theme={theme}>
          <StyledUserAvatar theme={theme}>
            {data.userName.charAt(0).toUpperCase()}
          </StyledUserAvatar>
          <StyledUserInfo>
            <StyledUserName theme={theme}>{data.userName}</StyledUserName>
            <StyledUserEmail theme={theme}>victor@email.com</StyledUserEmail>
            <StyledUserPlan theme={theme}>⭐ Plano Premium</StyledUserPlan>
          </StyledUserInfo>
        </StyledUserCard>
        <StyledThemeToggle theme={theme}>
          <StyledThemeToggleIcon>🌙</StyledThemeToggleIcon>
          Alternar Tema
        </StyledThemeToggle>
        <StyledLogoutButton theme={theme} data-testid="sidebar-logout" onClick={helpers.handleLogout}>
          🚪 Sair da conta
        </StyledLogoutButton>
      </StyledSidebarFooter>
    </StyledSidebarContainer>
  );
}