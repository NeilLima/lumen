import styled from 'styled-components';
import type { Theme } from '@/theme/theme';

export const StyledCard = styled.div<{ theme: Theme }>`
  background: ${props => props.theme.bgCard};
  backdrop-filter: blur(12px);
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${props => props.theme.shadowMd};
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

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

export const StyledCardTitle = styled.h3<{ theme: Theme }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledCardLink = styled.a<{ theme: Theme }>`
  font-size: 13px;
  color: ${props => props.theme.primary};
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: ${props => props.theme.primaryLight};
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const StyledSummaryItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    gap: 8px;
    padding: 10px 0;
  }
`;

export const StyledSummaryIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const StyledSummaryInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const StyledSummaryLabel = styled.span<{ theme: Theme }>`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const StyledSummaryValue = styled.span<{ theme: Theme }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;