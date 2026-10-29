import styled from 'styled-components';
import type { Theme } from '@/theme/theme';

export const StyledDashboardLayout = styled.div<{ theme: Theme }>`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a14 0%, #12121f 100%);
  font-family: ${props => props.theme.fontFamily};
  box-sizing: border-box;

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export const StyledMainContent = styled.main<{ theme: Theme }>`
  flex: 1;
  margin-left: 280px;
  padding: 32px 40px 40px;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 0;
  background: transparent;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    padding: 24px 20px 32px;
  }

  @media (max-width: 640px) {
    padding: 20px 16px 24px;
  }
`;

export const StyledDashboardHeader = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  width: 100%;

  @media (max-width: 640px) {
    margin-bottom: 24px;
  }
`;

export const StyledWelcome = styled.h1<{ theme: Theme }>`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.textPrimary};
  margin: 0;
  letter-spacing: -0.5px;

  span {
    color: ${props => props.theme.textAccent};
  }

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

export const StyledSubtitle = styled.p<{ theme: Theme }>`
  font-size: 16px;
  color: ${props => props.theme.textSecondary};
  margin: 0;
  font-weight: 400;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

export const StyledKpiRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 32px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
  }
`;

export const StyledContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  width: 100%;
  min-width: 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const StyledLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
`;

export const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
`;

export const StyledSectionCard = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.bgCard};
  backdrop-filter: blur(16px);
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadowLg};
  min-width: 0;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${props => props.theme.borderColorHover};
  }

  @media (max-width: 640px) {
    border-radius: 16px;
  }
`;

export const StyledSectionHeader = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  background: ${props => props.theme.bgSecondary};
`;

export const StyledSectionTitle = styled.h3<{ theme: Theme }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  margin: 0;
  letter-spacing: -0.2px;
`;

export const StyledSectionLink = styled.a<{ theme: Theme }>`
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.theme.primary};
  cursor: pointer;
  text-decoration: none;
  transition: color ${props => props.theme.transitionFast} ease;

  &:hover {
    color: ${props => props.theme.primaryLight};
  }

  @media (max-width: 640px) {
    font-size: 12px;
  }
`;

export const StyledSectionBody = styled.div`
  padding: 28px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 640px) {
    padding: 20px;
    gap: 16px;
  }
`;

export const StyledTwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  min-width: 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
`;

export const StyledHamburgerButton = styled.button<{ theme: Theme }>`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 210;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  color: ${props => props.theme.textPrimary};
  font-size: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitionBase} ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  &:hover {
    background: ${props => props.theme.primary}22;
    border-color: ${props => props.theme.primary};
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const StyledOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.bgPrimary}cc;
  backdrop-filter: blur(4px);
  z-index: 150;
  cursor: pointer;
  opacity: ${props => props.$visible ? '1' : '0'};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};

  @media (min-width: 1025px) {
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
  }
`;

export const StyledStatBadge = styled.div<{ theme: Theme; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  background: ${props => props.$color}15;
  border: 1px solid ${props => props.$color}30;
  color: ${props => props.$color};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledKpiCard = styled.div<{ theme: Theme; $accentColor: string }>`
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(15, 15, 26, 0.9) 100%);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  transition: all 200ms ease;
  overflow: hidden;
  min-width: 220px;
  max-width: 280px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.$accentColor}, transparent);
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 0 20px ${props => props.$accentColor}22;
    border-color: ${props => props.$accentColor}44;
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

export const StyledKpiLabel = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledKpiIcon = styled.div<{ theme: Theme }>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${props => props.theme.bgTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const StyledKpiValue = styled.div<{ theme: Theme }>`
  font-size: 36px;
  font-weight: 800;
  color: ${props => props.theme.textPrimary};
  margin: 0 0 8px 0;
  letter-spacing: -1px;
  line-height: 1.1;
`;

export const StyledKpiSubtitle = styled.div<{ theme: Theme }>`
  font-size: 14px;
  color: ${props => props.theme.textMuted};
  font-weight: 500;
`;