import styled from 'styled-components';
import type { Theme } from '@/theme/theme';

export const StyledHeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0 4px;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const StyledHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledGreeting = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const StyledSubtitle = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const StyledHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StyledSearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(37, 37, 66, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 10px 16px;
  width: 320px;
  max-width: 100%;
  transition: all 150ms ease;

  &:focus-within {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 14px;
    min-width: 0;

    &::placeholder {
      color: #6b6b7b;
    }
  }

  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledSearchIcon = styled.span`
  color: #6b6b7b;
  font-size: 16px;
  flex-shrink: 0;
`;

export const StyledPrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
  box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

export const StyledButtonText = styled.span`
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const StyledIconButton = styled.button<{ $hasBadge?: boolean }>`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(37, 37, 66, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0b0;
  cursor: pointer;
  transition: all 150ms ease;
  font-size: 18px;
  flex-shrink: 0;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
    color: #ffffff;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const StyledBadge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid rgba(37, 37, 66, 0.8);
`;

export const StyledUserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(37, 37, 66, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 6px 12px 6px 6px;
  cursor: pointer;
  transition: all 150ms ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
  }
`;

export const StyledUserAvatar = styled.div<{ theme: Theme }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.primaryGradient};
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const StyledUserChevron = styled.span`
  color: #a0a0b0;
  font-size: 12px;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const StyledUserDropdownWrapper = styled.div`
  position: relative;
`;

export const StyledUserDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 220px;
  background: ${(props: { theme: Theme }) => props.theme.bgCard};
  border: 1px solid ${(props: { theme: Theme }) => props.theme.borderColor};
  border-radius: ${(props: { theme: Theme }) => props.theme.radiusLg};
  box-shadow: ${(props: { theme: Theme }) => props.theme.shadowLg};
  backdrop-filter: blur(10px);
  padding: 8px;
  z-index: ${(props: { theme: Theme }) => props.theme.zIndexModal};
`;

export const StyledDropdownUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid ${(props: { theme: Theme }) => props.theme.borderColor};
  margin-bottom: 6px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const StyledDropdownUserName = styled.span`
  display: block;
  color: ${(props: { theme: Theme }) => props.theme.textPrimary};
  font-size: 14px;
  font-weight: 600;
`;

export const StyledDropdownUserEmail = styled.span`
  display: block;
  color: ${(props: { theme: Theme }) => props.theme.textSecondary};
  font-size: 12px;
`;

export const StyledDropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  border-radius: ${(props: { theme: Theme }) => props.theme.radiusMd};
  color: ${(props: { theme: Theme }) => props.theme.textPrimary};
  font-size: 14px;
  font-family: ${(props: { theme: Theme }) => props.theme.fontFamily};
  padding: 10px;
  cursor: pointer;
  text-align: left;
  transition: background ${(props: { theme: Theme }) => props.theme.transitionFast} ease;

  &:hover {
    background: ${(props: { theme: Theme }) => props.theme.bgHover};
  }
`;

export const StyledDropdownLogoutItem = styled(StyledDropdownItem)`
  color: ${(props: { theme: Theme }) => props.theme.dangerLight};
  border-top: 1px solid ${(props: { theme: Theme }) => props.theme.borderColor};
  border-radius: 0 0 ${(props: { theme: Theme }) => props.theme.radiusMd} ${(props: { theme: Theme }) => props.theme.radiusMd};
  margin-top: 6px;

  &:hover {
    background: ${(props: { theme: Theme }) => props.theme.dangerBg};
  }
`;