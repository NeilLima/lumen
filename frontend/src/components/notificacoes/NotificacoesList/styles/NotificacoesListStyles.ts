import styled from 'styled-components';

// ============================================
// LAYOUT PRINCIPAL - CENTRAL DE NOTIFICAÇÕES
// ============================================
export const StyledNotifPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const StyledNotifHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

export const StyledNotifTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StyledNotifSubtitle = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 4px 0 0 0;
`;

// ============================================
// ESTATÍSTICAS RÁPIDAS
// ============================================
export const StyledNotifStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
`;

export const StyledStatCard = styled.div<{ $color: string; $active?: boolean }>`
  background: ${props => props.$color}0D;
  border: 1px solid ${props => props.$color}33;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all 200ms ease;

  ${props => props.$active && `
    background: ${props.$color}1A;
    border-color: ${props.$color};
    box-shadow: 0 0 16px ${props.$color}33;
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.$color}22;
  }
`;

export const StyledStatIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

export const StyledStatContent = styled.div`
  flex: 1;
`;

export const StyledStatValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
`;

export const StyledStatLabel = styled.div`
  font-size: 11px;
  color: #a0a0b0;
  margin-top: 2px;
`;

// ============================================
// BARRA DE AÇÕES
// ============================================
export const StyledNotifActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px 16px;
`;

export const StyledNotifSearch = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 8px 14px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 150ms ease;

  &::placeholder {
    color: #6b6b7b;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

export const StyledNotifFilterSelect = styled.select`
  padding: 8px 32px 8px 14px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
  min-width: 130px;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23a0a0b0' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");

  &:focus {
    outline: none;
    border-color: #8b5cf6;
  }

  option {
    background: #1a1a2e;
    color: #ffffff;
  }
`;

export const StyledMarkAllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: 1px solid rgba(139, 92, 246, 0.3);
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  white-space: nowrap;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
  }
`;

// ============================================
// TIMELINE / FEED DE NOTIFICAÇÕES
// ============================================
export const StyledNotifFeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledNotifItem = styled.div<{ $unread: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  background: ${props => props.$unread ? 'rgba(139, 92, 246, 0.08)' : 'rgba(26, 26, 46, 0.6)'};
  border: 1px solid ${props => props.$unread ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 14px;
  transition: all 200ms ease;
  position: relative;
  backdrop-filter: blur(12px);

  ${props => props.$unread && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 60%;
      background: linear-gradient(180deg, #8b5cf6, #6366f1);
      border-radius: 0 4px 4px 0;
    }
  `}

  &:hover {
    background: ${props => props.$unread ? 'rgba(139, 92, 246, 0.12)' : 'rgba(37, 37, 66, 0.6)'};
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateX(4px);
  }

  @media (max-width: 640px) {
    padding: 14px 16px;
    gap: 12px;
  }
`;

export const StyledNotifIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.$color};
  flex-shrink: 0;
  box-shadow: 0 0 12px ${props => props.$color}22;

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const StyledNotifContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledNotifItemTitle = styled.div<{ $unread: boolean }>`
  font-size: 15px;
  font-weight: ${props => props.$unread ? 700 : 600};
  color: #ffffff;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledUnreadDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8b5cf6;
  box-shadow: 0 0 8px #8b5cf6;
  flex-shrink: 0;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const StyledNotifMessage = styled.p`
  font-size: 13px;
  color: #a0a0b0;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

export const StyledNotifMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StyledNotifTime = styled.span`
  font-size: 12px;
  color: #6b6b7b;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledNotifTypeBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 600;
  color: ${props => props.$color};
  background: ${props => props.$color}1A;
  border: 1px solid ${props => props.$color}33;
  white-space: nowrap;
`;

export const StyledNotifStatus = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${props => {
    switch (props.$status) {
      case 'nao_lida': return '#ef4444';
      case 'lida': return '#10b981';
      case 'arquivada': return '#6b6b7b';
      default: return '#a0a0b0';
    }
  }};
`;

export const StyledNotifItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  align-self: flex-start;
`;

export const StyledNotifActionBtn = styled.button<{ $variant?: 'default' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${props => props.$variant === 'danger' ? '#ef4444' : '#a0a0b0'};
  cursor: pointer;
  transition: all 150ms ease;
  font-size: 15px;

  &:hover {
    background: ${props => props.$variant === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(139, 92, 246, 0.1)'};
    color: ${props => props.$variant === 'danger' ? '#ef4444' : '#8b5cf6'};
  }
`;

// ============================================
// ESTADO VAZIO
// ============================================
export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
  gap: 16px;
  background: rgba(26, 26, 46, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
`;

export const StyledEmptyIcon = styled.div`
  font-size: 56px;
  opacity: 0.3;
`;

export const StyledEmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const StyledEmptyText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0;
  max-width: 320px;
`;

// ============================================
// COMPONENTS ANTIGOS (compatibilidade)
// ============================================
export const StyledCard = styled.div`
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const StyledCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const StyledFilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const StyledSearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;

  &::placeholder { color: #6b6b7b; }
  &:focus { outline: none; border-color: #8b5cf6; }
`;

export const StyledSelect = styled.select`
  padding: 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  min-width: 140px;

  option { background: #1a1a2e; color: #ffffff; }
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
`;

export const StyledItem = styled.div`
  background: rgba(37, 37, 66, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

export const StyledInfo = styled.div`flex: 1;`;
export const StyledName = styled.span`font-size: 15px; font-weight: 600; color: #ffffff; display: block;`;
export const StyledSub = styled.span`font-size: 12px; color: #a0a0b0;`;
export const StyledStatusBadge = styled.span<{ $color: string }>`display: inline-flex; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: ${props => props.$color}; background: ${props => props.$color}1A; border: 1px solid ${props => props.$color}33;`;
export const StyledValues = styled.div`display: flex; justify-content: space-between;`;
export const StyledAmount = styled.span`font-size: 14px; font-weight: 600; color: #ffffff;`;
export const StyledLabel = styled.span`font-size: 11px; color: #6b6b7b;`;
export const StyledActions = styled.div`display: flex; gap: 4px; justify-content: flex-end; padding-top: 8px; border-top: 1px solid rgba(255, 255, 255, 0.05);`;
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 200ms ease; border: none; white-space: nowrap; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff;`;
export const StyledIconButton = styled.button<{ $color?: string }>`display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent; color: ${props => props.$color || '#a0a0b0'}; cursor: pointer; font-size: 16px; &:hover { background: rgba(139, 92, 246, 0.1); }`;