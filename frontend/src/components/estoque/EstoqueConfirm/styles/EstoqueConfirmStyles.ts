import styled from 'styled-components';

export const StyledOverlay = styled.div<{ $visible: boolean }>`
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
  z-index: 1001;
  padding: 24px;
`;

export const StyledConfirm = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export const StyledIcone = styled.div`
  font-size: 40px;
  margin-bottom: 16px;
`;

export const StyledTitulo = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

export const StyledTexto = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0 0 4px 0;
  line-height: 1.6;
`;

export const StyledNomeItem = styled.span`
  color: #ffffff;
  font-weight: 600;
`;

export const StyledValor = styled.span`
  color: #ef4444;
  font-weight: 600;
`;

export const StyledAcoes = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const StyledBotao = styled.button<{ $variant?: 'primary' | 'secondary' }>`
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
  flex: 1;

  ${props =>
    props.$variant === 'primary'
      ? `
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
        &:hover {
          background: rgba(239, 68, 68, 0.25);
          transform: translateY(-1px);
        }
      `
      : `
        background: rgba(26, 26, 46, 0.8);
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.1);
        &:hover {
          background: rgba(37, 37, 66, 0.8);
          border-color: rgba(139, 92, 246, 0.3);
        }
      `}
`;