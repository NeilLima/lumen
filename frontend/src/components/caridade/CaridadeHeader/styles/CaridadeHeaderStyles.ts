import styled from 'styled-components';

// ============================================
// HEADER
// ============================================
export const StyledCaridadeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

export const StyledCaridadeTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const StyledCaridadeSubtitle = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 4px 0 0 0;

  @media (max-width: 480px) {
    font-size: 12px;
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

// ============================================
// BOTÃO DE INFO NO TÍTULO
// ============================================
export const StyledInfoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  transition: all 150ms ease;
  vertical-align: middle;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    transform: scale(1.1);
  }
`;
