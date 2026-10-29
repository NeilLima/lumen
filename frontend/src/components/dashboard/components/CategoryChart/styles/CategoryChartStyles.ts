import styled from 'styled-components';
import type { Theme } from '@/theme/theme';

export const StyledChartCard = styled.div<{ theme: Theme }>`
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

export const StyledChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

export const StyledChartTitle = styled.h3<{ theme: Theme }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledSelect = styled.select<{ theme: Theme }>`
  background: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.borderColorHover};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  outline: none;

  option {
    background: ${props => props.theme.bgSecondary};
    color: ${props => props.theme.textPrimary};
  }
`;

export const StyledDonutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 20px;

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
    margin-bottom: 16px;
  }
`;

export const StyledDonut = styled.div<{ $segments: string }>`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: ${props => props.$segments};
  position: relative;

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

export const StyledDonutHole = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.theme.bgCard};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 76px;
    height: 76px;
  }
`;

export const StyledDonutTotal = styled.span<{ theme: Theme }>`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.textPrimary};

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const StyledDonutLabel = styled.span<{ theme: Theme }>`
  font-size: 12px;
  color: ${props => props.theme.textSecondary};

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const StyledCategoryLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledCategoryItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  flex-wrap: wrap;
  gap: 4px;

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledCategoryLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const StyledCategoryColor = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: ${props => props.$color};
  flex-shrink: 0;
`;

export const StyledCategoryName = styled.span<{ theme: Theme }>`
  font-size: 13px;
  color: ${props => props.theme.textPrimary};

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const StyledCategoryRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

export const StyledCategoryPercent = styled.span<{ theme: Theme }>`
  font-size: 13px;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;
  min-width: 40px;
  text-align: right;

  @media (max-width: 480px) {
    font-size: 12px;
    min-width: 32px;
  }
`;

export const StyledCategoryAmount = styled.span<{ theme: Theme }>`
  font-size: 13px;
  color: ${props => props.theme.textPrimary};
  font-weight: 600;
  min-width: 80px;
  text-align: right;

  @media (max-width: 480px) {
    font-size: 12px;
    min-width: 60px;
  }
`;