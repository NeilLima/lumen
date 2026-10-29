import styled from 'styled-components';
export const StyledGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 16px; @media (max-width: 1024px) { grid-template-columns: 1fr; }`;
export const StyledCard = styled.div`background: rgba(26,26,46,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); @media (max-width: 768px) { padding: 12px; }`;
export const StyledTitle = styled.h3`font-size: 13px; font-weight: 600; color: #fff; margin: 0 0 12px;`;
export const StyledContainer = styled.div`width: 100%; height: 180px; display: flex; align-items: center; justify-content: center;`;
export const StyledLegend = styled.div`display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 8px;`;
export const StyledItem = styled.div`display: flex; align-items: center; gap: 4px; font-size: 11px; color: #a0a0b0;`;
export const StyledColor = styled.div<{ $color: string }>`width: 8px; height: 8px; border-radius: 2px; background: ${props => props.$color};`;
