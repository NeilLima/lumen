import styled from 'styled-components';

// ============================================
// MODAL DE DETALHES
// ============================================
export const StyledDetalheOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: ${props => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 24px;
`;

export const StyledDetalheModal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const StyledModalClose = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #a0a0b0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

export const StyledDetalheHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledDetalheIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${props => props.$color};
  flex-shrink: 0;
  box-shadow: 0 0 16px ${props => props.$color}33;
`;

export const StyledDetalheNome = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

// ============================================
// BARRA DE PROGRESSO
// ============================================
export const StyledDetalheProgress = styled.div`
  margin-bottom: 20px;
`;

export const StyledDetalheBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  overflow: hidden;
`;

export const StyledDetalheFill = styled.div<{ $pct: number; $color: string }>`
  width: ${props => Math.min(props.$pct, 100)}%;
  height: 100%;
  background: linear-gradient(90deg, ${props => props.$color}, ${props => props.$color}dd);
  border-radius: 6px;
  transition: width 0.5s ease;
`;

export const StyledDetalheProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 13px;
  color: #a0a0b0;
`;

// ============================================
// GRID DE DETALHES
// ============================================
export const StyledDetalheGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledDetalheItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledDetalheLabel = styled.span`
  font-size: 12px;
  color: #6b6b7b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledDetalheValue = styled.span`
  font-size: 15px;
  color: #ffffff;
  font-weight: 500;
`;

export const StyledDetalheObservacoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: rgba(37, 37, 66, 0.4);
  border-radius: 12px;
  margin-bottom: 20px;
`;

// ============================================
// BADGES
// ============================================
export const StyledStatusBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
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
// BOTÕES
// ============================================
export const StyledModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

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
