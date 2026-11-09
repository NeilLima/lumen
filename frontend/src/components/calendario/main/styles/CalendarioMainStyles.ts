import styled, { css } from 'styled-components';

// ============================================
// LAYOUT PRINCIPAL (mesmo padrão de despesas)
// ============================================
export const StyledCalendarioLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background: linear-gradient(135deg, #0a0a14 0%, #12121f 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export const StyledCalendarioMainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 24px 32px;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100vw - 260px);
  max-width: 100%;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    padding: 70px 16px 24px;
  }

  @media (max-width: 480px) {
    padding: 70px 12px 16px;
  }
`;

export const StyledHamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 200;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(12px);
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const StyledOverlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 150;
  cursor: pointer;

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const StyledCalendarioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #8b5cf6;
  font-size: 16px;
`;

// ============================================
// CABEÇALHO DO MÊS
// ============================================
export const StyledMonthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const StyledMonthTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-transform: capitalize;
`;

export const StyledMonthNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledNavButton = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(26, 26, 46, 0.8);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
  }
`;

// ============================================
// RESUMO DO MÊS
// ============================================
export const StyledResumoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const StyledResumoCard = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(15, 15, 26, 0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  border-top: 3px solid ${props => props.$color};
`;

export const StyledResumoLabel = styled.span`
  font-size: 12px;
  color: #a0a0b0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

export const StyledResumoValue = styled.div<{ $color: string }>`
  font-size: 22px;
  font-weight: 700;
  color: ${props => props.$color};
  margin-top: 6px;
`;

export const StyledResumoSub = styled.div`
  font-size: 12px;
  color: #6b6b7b;
  margin-top: 4px;
`;

// ============================================
// CALENDÁRIO
// ============================================
export const StyledCalendarCard = styled.div`
  background: rgba(15, 15, 26, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
`;

export const StyledWeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 8px;
`;

export const StyledWeekDay = styled.div`
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #6b6b7b;
  text-transform: uppercase;
  padding: 6px 0;
`;

export const StyledDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

export const StyledDayCell = styled.button<{ $empty?: boolean; $selected?: boolean; $isToday?: boolean; $hasData?: boolean }>`
  min-height: 92px;
  border-radius: 10px;
  border: 1px solid ${props => props.$selected ? '#8b5cf6' : props.$isToday ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.06)'};
  background: ${props => props.$empty ? 'transparent' : props.$selected ? 'rgba(139, 92, 246, 0.15)' : 'rgba(26, 26, 46, 0.6)'};
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: ${props => props.$empty ? 'default' : 'pointer'};
  text-align: left;
  transition: all 150ms ease;
  font-family: inherit;
  width: 100%;

  ${props => !props.$empty && css`
    &:hover {
      border-color: rgba(139, 92, 246, 0.4);
      background: rgba(139, 92, 246, 0.08);
    }
  `}

  @media (max-width: 768px) {
    min-height: 64px;
    padding: 6px;
  }
`;

export const StyledDayNumber = styled.span<{ $isToday?: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: ${props => props.$isToday ? '#8b5cf6' : '#e0e0ea'};
  align-self: flex-end;
`;

export const StyledDayTx = styled.div<{ $color: string }>`
  font-size: 10px;
  color: ${props => props.$color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;
  gap: 4px;

  span:last-child {
    flex-shrink: 0;
  }
`;

export const StyledDayMore = styled.span`
  font-size: 10px;
  color: #8b8b9e;
`;

// ============================================
// DETALHE DO DIA
// ============================================
export const StyledDayDetailCard = styled.div`
  background: rgba(15, 15, 26, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
`;

export const StyledDayDetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px;
`;

export const StyledTxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledTxIcon = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.$color}22;
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
`;

export const StyledTxInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledTxName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTxMeta = styled.div`
  font-size: 12px;
  color: #8b8b9e;
  margin-top: 2px;
`;

export const StyledTxAmount = styled.div<{ $color: string }>`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.$color};
  white-space: nowrap;
`;

export const StyledEmptyDay = styled.div`
  padding: 24px;
  text-align: center;
  color: #8b8b9e;
  font-size: 14px;
`;
