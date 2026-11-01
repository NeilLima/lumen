import styled from 'styled-components';

export const StyledDashboardLayout = styled.div<{ theme?: any }>`
  display: flex;
  min-height: 100vh;
  background: ${(props) => props.theme?.bgPrimary ?? '#0a0a14'};
  color: ${(props) => props.theme?.textPrimary ?? '#ffffff'};
  position: relative;
`;

export const StyledHamburgerButton = styled.button<{ theme?: any }>`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 300;
  background: ${(props) => props.theme?.bgCard ?? 'rgba(26,26,46,0.8)'};
  border: 1px solid ${(props) => props.theme?.borderColor ?? 'rgba(255,255,255,0.05)'};
  color: ${(props) => props.theme?.textPrimary ?? '#ffffff'};
  border-radius: 8px;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledOverlay = styled.div<{ $visible?: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? 'auto' : 'none')};
  transition: opacity 200ms ease;
`;

export const StyledMainContent = styled.main<{ theme?: any }>`
  flex: 1;
  min-width: 0;
  margin-left: 260px;
  padding: 24px;
  @media (max-width: 1023px) {
    margin-left: 0;
    padding: 16px;
    padding-top: 64px;
  }
`;

export const StyledKpiRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  margin-bottom: 24px;
  max-width: 100%;
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

export const StyledKpiCard = styled.div<{ theme?: any; $accentColor?: string }>`
  position: relative;
  background: ${(props) => props.theme?.bgCard ?? 'rgba(26,26,46,0.8)'};
  border: 1px solid ${(props) => props.theme?.borderColor ?? 'rgba(255,255,255,0.05)'};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  transition: all 200ms ease;
  max-width: 280px;
  min-width: 220px;
  flex: 0 0 auto;
  overflow: hidden;
  scroll-snap-align: start;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${(props) => props.$accentColor ?? '#8b5cf6'}, transparent);
    border-radius: 16px 16px 0 0;
  }
`;

export const StyledKpiLabel = styled.span<{ theme?: any }>`
  font-size: 13px;
  color: ${(props) => props.theme?.textSecondary ?? '#a0a0b0'};
  font-weight: 500;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledKpiValue = styled.h2<{ theme?: any }>`
  font-size: 26px;
  font-weight: 700;
  color: ${(props) => props.theme?.textPrimary ?? '#ffffff'};
  margin: 4px 0;
`;

export const StyledKpiSubtitle = styled.span<{ theme?: any }>`
  font-size: 12px;
  color: ${(props) => props.theme?.textMuted ?? '#6b6b7b'};
`;

export const StyledContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  width: 100%;
  @media (max-width: 1023px) { grid-template-columns: 1fr; }
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

export const StyledSectionCard = styled.section<{ theme?: any }>`
  background: ${(props) => props.theme?.bgCard ?? 'rgba(26,26,46,0.8)'};
  border: 1px solid ${(props) => props.theme?.borderColor ?? 'rgba(255,255,255,0.05)'};
  border-radius: 16px;
  padding: 20px;
`;

export const StyledSectionHeader = styled.div<{ theme?: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const StyledSectionTitle = styled.h3<{ theme?: any }>`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: ${(props) => props.theme?.textPrimary ?? '#ffffff'};
`;

export const StyledSectionLink = styled.a<{ theme?: any }>`
  font-size: 13px;
  color: ${(props) => props.theme?.primaryColor ?? '#8b5cf6'};
  text-decoration: none;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

export const StyledSectionBody = styled.div<{ theme?: any }>`
  color: ${(props) => props.theme?.textPrimary ?? '#ffffff'};
`;

export const StyledTwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 767px) { grid-template-columns: 1fr; }
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;
