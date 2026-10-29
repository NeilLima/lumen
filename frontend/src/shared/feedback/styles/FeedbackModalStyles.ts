import styled, { css, keyframes } from 'styled-components';

type FeedbackTipo = 'sucesso' | 'erro';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const corPorTipo = (tipo: FeedbackTipo) =>
  tipo === 'sucesso'
    ? css`#10b981`
    : css`#ef4444`;

export const StyledFeedbackOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 20px;
`;

export const StyledFeedbackModal = styled.div<{ $tipo: FeedbackTipo }>`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid ${(props) => corPorTipo(props.$tipo)};
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.2s ease-out;
`;

export const StyledFeedbackIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const StyledFeedbackTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
`;

export const StyledFeedbackMessage = styled.p`
  font-size: 15px;
  color: #cbd5e1;
  line-height: 1.5;
  margin: 0 0 24px;
`;

export const StyledFeedbackClose = styled.button<{ $tipo: FeedbackTipo }>`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: ${(props) => corPorTipo(props.$tipo)};
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;