import styled from 'styled-components';

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

  &::placeholder { color: #6b6b7b; }
  &:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1); }
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

  &:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1); }
  option { background: #1a1a2e; color: #ffffff; }
`;

export const StyledDateInput = styled.input`
  padding: 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 150ms ease;
  min-width: 140px;

  &:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1); }
`;

export const StyledTransferenciasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledTransferenciaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(37, 37, 66, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 200ms ease;

  &:hover {
    background: rgba(37, 37, 66, 0.6);
    border-color: rgba(139, 92, 246, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 14px;
  }
`;

export const StyledTransferenciaIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(139, 92, 246, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #8b5cf6;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.2);

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`;

export const StyledTransferenciaInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledTransferenciaName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTransferenciaMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #a0a0b0;
`;

export const StyledTransferenciaConta = styled.span`
  color: #a0a0b0;
`;

export const StyledTransferenciaDate = styled.span`
  color: #6b6b7b;
`;

export const StyledTransferenciaValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #10b981;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const StyledTransferenciaActions = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const StyledButton = styled.button<{ $variant?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'ghost': return `background: transparent; color: #a0a0b0; &:hover { background: rgba(139,92,246,0.1); color: #8b5cf6; }`;
      case 'secondary': return `background: rgba(26,26,46,0.8); color: #ffffff; border: 1px solid rgba(255,255,255,0.1); &:hover { background: rgba(37,37,66,0.8); }`;
      default: return `background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff; &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(139,92,246,0.3); }`;
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

