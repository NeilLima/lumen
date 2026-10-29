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
`;

export const StyledChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const StyledChartTitle = styled.h3<{ theme: Theme }>`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  margin: 0;
`;

export const StyledChartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

  &:hover {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
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

export const StyledChartWrapper = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
  min-width: 0;
  overflow: hidden;
`;

export const StyledYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  padding-right: 4px;
`;

export const StyledYAxisLabel = styled.span<{ theme: Theme }>`
  font-size: 10px;
  color: ${props => props.theme.textMuted};
  text-align: right;
  line-height: 1;
`;

export const StyledChartContainer = styled.div`
  position: relative;
  flex: 1;
  height: 200px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const StyledGridLine = styled.line<{ theme: Theme }>`
  stroke: ${props => props.theme.borderColor};
  stroke-dasharray: 4 4;
  stroke-width: 1;
`;

export const StyledChartLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

export const StyledLegendItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
`;

export const StyledLegendDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const StyledXAxisLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding-left: 36px;

  @media (max-width: 480px) {
    padding-left: 0;
  }
`;

export const StyledXAxisLabel = styled.span<{ theme: Theme }>`
  font-size: 11px;
  color: ${props => props.theme.textMuted};
`;

export const StyledTooltip = styled.div<{ theme: Theme; $x: string; $y: number }>`
  position: absolute;
  left: ${props => props.$x};
  top: ${props => props.$y}px;
  transform: translate(-50%, -120%);
  background: ${props => props.theme.bgTertiary};
  border: 1px solid ${props => props.theme.primary}4D;
  border-radius: 8px;
  padding: 8px 12px;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
  box-shadow: ${props => props.theme.shadowLg};
`;

export const StyledTooltipTitle = styled.div<{ theme: Theme }>`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.theme.textPrimary};
  margin-bottom: 4px;
`;

export const StyledTooltipRow = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: ${props => props.theme.textSecondary};
  margin-top: 2px;
`;

export const StyledTooltipDot = styled.span<{ $color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

export const StyledTooltipValue = styled.span<{ $color: string }>`
  color: ${props => props.$color};
  font-weight: 600;
  margin-left: auto;
`;

export const StyledHoverArea = styled.rect`
  fill: transparent;
  cursor: pointer;
`;