import styled from 'styled-components';
import type { Theme } from '@/theme/theme';

export const StyledSidebarContainer = styled.aside<{ $isOpen?: boolean; theme: Theme }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  height: 100vh;
  background: linear-gradient(180deg, ${props => props.theme.bgNavbar} 0%, ${props => props.theme.bgSidebar} 100%);
  border-right: 1px solid ${props => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  z-index: 200;
  overflow-y: auto;
  transition: transform 300ms ease;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 1024px) {
    transform: translateX(-100%);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);

    ${props => props.$isOpen && `
      transform: translateX(0);
    `}
  }
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  margin-bottom: 32px;
`;

export const StyledLogoIcon = styled.div<{ theme: Theme }>`
  width: 36px;
  height: 36px;
  background: ${props => props.theme.brandGradient};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  flex-shrink: 0;
`;

export const StyledLogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledLogoTitle = styled.h1<{ theme: Theme }>`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.textPrimary};
  line-height: 1.2;
`;

export const StyledLogoSubtitle = styled.span<{ theme: Theme }>`
  font-size: 11px;
  color: ${props => props.theme.textMuted};
  font-weight: 400;
`;

export const StyledNavSection = styled.div`
  margin-bottom: 24px;
`;

export const StyledSectionLabel = styled.span<{ theme: Theme }>`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${props => props.theme.navSectionColor};
  padding: 0 12px;
  margin-bottom: 8px;
  display: block;
`;

export const StyledNavItem = styled.a<{ $active?: boolean; theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${props => props.$active ? props.theme.navActiveColor : props.theme.textSecondary};
  background: ${props => props.$active ? props.theme.navActiveBg : 'transparent'};
  font-size: 14px;
  font-weight: ${props => props.$active ? 600 : 400};
  cursor: pointer;
  transition: all 150ms ease;
  text-decoration: none;
  margin-bottom: 2px;

  &:hover {
    background: ${props => props.theme.bgHover};
    color: ${props => props.theme.textPrimary};
  }
`;

export const StyledNavIcon = styled.span`
  font-size: 18px;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
`;

export const StyledNavLabel = styled.span`
  flex: 1;
`;

export const StyledSidebarFooter = styled.div<{ theme: Theme }>`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.borderColor};
`;

export const StyledUserCard = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: ${props => props.theme.bgHover};
  }
`;

export const StyledUserAvatar = styled.div<{ theme: Theme }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.primaryGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
  overflow: hidden;
`;

export const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const StyledUserName = styled.span<{ theme: Theme }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledUserEmail = styled.span<{ theme: Theme }>`
  font-size: 12px;
  color: ${props => props.theme.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledUserPlan = styled.div<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  padding: 2px 8px;
  background: ${props => props.theme.primaryGradient};
  color: white;
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
  width: fit-content;
`;

export const StyledThemeToggle = styled.button<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  margin-top: 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.borderColorHover};
  background: transparent;
  color: ${props => props.theme.textSecondary};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: ${props => props.theme.bgHover};
    color: ${props => props.theme.textPrimary};
    border-color: ${props => props.theme.primary};
  }
`;

export const StyledThemeToggleIcon = styled.span`
  font-size: 16px;
`;

export const StyledLogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  border: 1px solid ${(props: { theme: Theme }) => props.theme.danger};
  border-radius: ${(props: { theme: Theme }) => props.theme.radiusMd};
  color: ${(props: { theme: Theme }) => props.theme.dangerLight};
  font-size: 13px;
  font-weight: 600;
  font-family: ${(props: { theme: Theme }) => props.theme.fontFamily};
  padding: 10px;
  margin-top: 8px;
  cursor: pointer;
  transition: all ${(props: { theme: Theme }) => props.theme.transitionFast} ease;

  &:hover {
    background: ${(props: { theme: Theme }) => props.theme.dangerBg};
  }
`;