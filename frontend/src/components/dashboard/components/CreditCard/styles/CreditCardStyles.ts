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

export const StyledCardName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  display: block;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledLabel = styled.span`
  font-size: 12px;
  color: #a0a0b0;
  display: block;
  margin-bottom: 4px;
`;

export const StyledValue = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 4px 0;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const StyledSmallText = styled.span`
  font-size: 12px;
  color: #a0a0b0;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const StyledProgressBar = styled.div`
  height: 8px;
  background: rgba(37, 37, 66, 0.8);
  border-radius: 9999px;
  overflow: hidden;
  margin: 8px 0;
`;

export const StyledProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${props => props.$percentage}%;
  background: linear-gradient(90deg, #8b5cf6, #6366f1);
  border-radius: 9999px;
  transition: width 300ms ease;
`;

export const StyledPercentText = styled.div`
  text-align: right;
  font-size: 12px;
  color: #a0a0b0;
  margin-top: 4px;
`;

export const StyledCardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  gap: 12px;
`;

export const StyledInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const StyledInfoLabel = styled.span`
  font-size: 11px;
  color: #6b6b7b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledInfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;