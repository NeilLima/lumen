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

export const StyledGoalItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:last-child { border-bottom: none; }

  @media (max-width: 480px) {
    padding: 10px 0;
  }
`;

export const StyledGoalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const StyledGoalIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const StyledGoalName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const StyledGoalPercentage = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #8b5cf6;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 12px;
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

export const StyledGoalProgress = styled.div`
  font-size: 12px;
  color: #a0a0b0;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;