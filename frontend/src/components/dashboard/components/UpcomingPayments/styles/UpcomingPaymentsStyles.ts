import styled from 'styled-components';

export const StyledCard = styled.div`
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledCardLink = styled.a`
  font-size: 13px;
  color: #8b5cf6;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  &:hover { color: #a78bfa; }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const StyledPaymentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:last-child { border-bottom: none; }

  @media (max-width: 480px) {
    gap: 8px;
    padding: 10px 0;
  }
`;

export const StyledPaymentDay = styled.div<{ $urgent?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.$urgent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 37, 66, 0.8)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

export const StyledPaymentDayNumber = styled.span<{ $urgent?: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.$urgent ? '#ef4444' : '#ffffff'};
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledPaymentDayMonth = styled.span<{ $urgent?: boolean }>`
  font-size: 9px;
  font-weight: 600;
  color: ${props => props.$urgent ? '#ef4444' : '#6b6b7b'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledPaymentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const StyledPaymentName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const StyledPaymentDays = styled.span<{ $urgent?: boolean }>`
  font-size: 12px;
  color: ${props => props.$urgent ? '#ef4444' : '#a0a0b0'};
  font-weight: ${props => props.$urgent ? 600 : 400};

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const StyledPaymentAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;