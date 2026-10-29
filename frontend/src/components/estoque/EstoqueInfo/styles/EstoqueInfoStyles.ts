import styled from 'styled-components';

export const EstoqueInfoOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const EstoqueInfoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const EstoqueInfoTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1f2937;
`;

export const EstoqueInfoText = styled.p`
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 12px;
`;

export const EstoqueInfoButton = styled.button`
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
  }
`;