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

export const StyledFilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledFilterButton = styled.button<{ theme: Theme; $active?: boolean }>`
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid ${props => props.$active ? props.theme.primary : props.theme.borderColorHover};
  background: ${props => props.$active ? props.theme.bgHover : 'transparent'};
  color: ${props => props.$active ? props.theme.primary : props.theme.textSecondary};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.transitionFast} ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
`;

export const StyledTransactionItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
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

export const StyledTransactionIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.$color};
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
`;

export const StyledTransactionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const StyledTransactionName = styled.span<{ theme: Theme }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const StyledTransactionMeta = styled.span<{ theme: Theme }>`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const StyledTransactionAmount = styled.span<{ theme: Theme; $type: 'income' | 'expense' }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$type === 'income' ? props.theme.success : props.theme.danger};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const StyledTransactionDate = styled.span<{ theme: Theme }>`
  font-size: 12px;
  color: ${props => props.theme.textMuted};
  min-width: 50px;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 11px;
    min-width: 40px;
  }
`;