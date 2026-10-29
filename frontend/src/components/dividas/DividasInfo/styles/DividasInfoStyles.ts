import styled from 'styled-components';

// ============================================
// MODAL DE INFORMAÇÕES DA PÁGINA
// ============================================
export const StyledInfoOverlay = styled.div<{ $visible: boolean }>`
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
  z-index: 1150;
  padding: 24px;
`;

export const StyledInfoModal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 520px;
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

export const StyledInfoIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.1);
  border: 2px solid rgba(139, 92, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 20px;
`;

export const StyledInfoTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px 0;
  text-align: center;
`;

export const StyledInfoText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0 0 20px 0;
  line-height: 1.6;
  text-align: center;
`;

export const StyledInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledInfoListItem = styled.li`
  font-size: 13px;
  color: #a0a0b0;
  line-height: 1.5;
  padding: 12px 16px;
  background: rgba(37, 37, 66, 0.4);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  strong {
    color: #ffffff;
    font-weight: 600;
  }
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