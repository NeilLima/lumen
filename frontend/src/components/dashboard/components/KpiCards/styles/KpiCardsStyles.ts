import styled from 'styled-components';

export const StyledKpiGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
  }
`;

export const StyledKpiCard = styled.div<{ $accentColor: string }>`
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(15, 15, 26, 0.9) 100%);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  transition: all 200ms ease;
  min-width: 180px;
  flex: 0 0 180px;
  max-width: 300px;
  overflow: hidden;
  scroll-snap-align: start;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.$accentColor}, transparent);
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 0 20px ${props => props.$accentColor}22;
    border-color: ${props => props.$accentColor}44;
  }
`;

export const StyledKpiIcon = styled.div<{ $color: string; $bg: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.$color};
  margin-bottom: 16px;
  flex-shrink: 0;
  box-shadow: 0 0 12px ${props => props.$color}33;
`;

export const StyledKpiLabel = styled.span`
  font-size: 13px;
  color: #a0a0b0;
  font-weight: 500;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledKpiValue = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  margin: 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledTrendBadge = styled.div<{ $trendColor: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$trendColor};
  background: ${props => props.$trendColor}1A;
  padding: 4px 10px;
  border-radius: 9999px;
  margin-top: 8px;
`;

export const StyledTrendIcon = styled.span`
  font-size: 12px;
`;

export const StyledTrendPercentage = styled.span`
  font-weight: 600;
`;

export const StyledTrendText = styled.span`
  font-size: 11px;
  color: #a0a0b0;
  font-weight: 400;
`;