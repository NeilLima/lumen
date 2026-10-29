import styled from 'styled-components';

export const EstoqueDetalheContainer = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
`;

export const EstoqueDetalheCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

export const EstoqueDetalheTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1f2937;
`;

export const EstoqueDetalheRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  color: #4b5563;
`;

export const EstoqueDetalheLabel = styled.span`
  font-weight: 500;
  color: #6b7280;
`;

export const EstoqueDetalheValue = styled.span<{ $cor?: string }>`
  font-weight: 600;
  color: ${({ $cor }) => $cor || '#111827'};
`;

export const EstoqueDetalheButton = styled.button<{ $cor?: string }>`
  background: ${({ $cor }) => $cor || '#3b82f6'};
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