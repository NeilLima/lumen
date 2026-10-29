import styled from 'styled-components';

// ============================================
// MODAL
// ============================================
export const StyledModalOverlay = styled.div<{ $visible: boolean }>`
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
  z-index: 1000;
  padding: 24px;
`;

export const StyledModal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 560px;
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

// ============================================
// FORMULÁRIO
// ============================================
export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #a0a0b0;
`;

export const StyledInput = styled.input`
  padding: 12px 16px;
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

export const StyledTextarea = styled.textarea`
  padding: 12px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
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

export const StyledFormSelect = styled.select`
  padding: 12px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;

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

export const StyledModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
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