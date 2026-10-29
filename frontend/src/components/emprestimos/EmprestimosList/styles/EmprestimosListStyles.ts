import styled from 'styled-components';

// ============================================
// CARD PRINCIPAL (LISTA)
// ============================================
export const StyledCard = styled.div`
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 16px;
  }
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

// ============================================
// BARRA DE FILTROS
// ============================================
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

export const StyledSelect = styled.select`
  padding: 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  option {
    background: #1a1a2e;
    color: #ffffff;
  }
`;

// ============================================
// GRID DE ITENS
// ============================================
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
  transition: all 200ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    background: rgba(37, 37, 66, 0.6);
    border-color: rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
  }
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
  box-shadow: 0 0 12px ${props => props.$color}33;
`;

export const StyledInfo = styled.div`
  flex: 1;
`;

export const StyledName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  display: block;
`;

export const StyledSub = styled.span`
  font-size: 12px;
  color: #a0a0b0;
`;

// ============================================
// BADGES
// ============================================
export const StyledStatusBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$color};
  background: ${props => props.$color}1A;
  border: 1px solid ${props => props.$color}33;
  white-space: nowrap;
`;

// ============================================
// BARRA DE PROGRESSO
// ============================================
export const StyledProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledProgressTrack = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
`;

export const StyledProgressFill = styled.div<{ $pct: number; $color: string }>`
  width: ${props => Math.min(props.$pct, 100)}%;
  height: 100%;
  background: linear-gradient(90deg, ${props => props.$color}, ${props => props.$color}dd);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export const StyledProgressPct = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
`;

// ============================================
// VALORES
// ============================================
export const StyledValues = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

export const StyledLabel = styled.span`
  font-size: 11px;
  color: #6b6b7b;
`;

// ============================================
// AÇÕES
// ============================================
export const StyledActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

// ============================================
// BOTÕES
// ============================================
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(26, 26, 46, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a0a0b0;
          &:hover {
            background: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
        `;
    }
  }}
`;

export const StyledIconButton = styled.button<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${props => props.$color || '#a0a0b0'};
  cursor: pointer;
  transition: all 150ms ease;
  font-size: 16px;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
    color: ${props => props.$color || '#8b5cf6'};
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
  padding: 48px 24px;
  text-align: center;
  gap: 12px;
`;

export const StyledEmptyIcon = styled.div`
  font-size: 48px;
  opacity: 0.5;
`;

export const StyledEmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const StyledEmptyText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0;
`;
