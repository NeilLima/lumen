import styled from 'styled-components';

export const StyledCard = styled.div`
  background: rgba(26,26,46,0.6); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); overflow: hidden;
  @media (max-width: 768px) { padding: 16px; }
`;
export const StyledCardHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;
`;
export const StyledCardTitle = styled.h3`font-size: 16px; font-weight: 600; color: #fff; margin: 0;`;
export const StyledFilterBar = styled.div`display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;`;
export const StyledSearchInput = styled.input`
  flex: 1; min-width: 200px; padding: 10px 16px; background: rgba(37,37,66,0.6);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-size: 14px;
  transition: all 150ms ease; &::placeholder { color: #6b6b7b; }
  &:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,0.1); }
`;
export const StyledSelect = styled.select`
  padding: 10px 16px; background: rgba(37,37,66,0.6); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; color: #fff; font-size: 14px; cursor: pointer; min-width: 140px;
  &:focus { outline: none; border-color: #8b5cf6; }
  option { background: #1a1a2e; color: #fff; }
`;
export const StyledMetasGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;`;
export const StyledMetaCard = styled.div`
  background: rgba(37,37,66,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
  padding: 20px; transition: all 200ms ease; display: flex; flex-direction: column; gap: 12px;
  &:hover { background: rgba(37,37,66,0.6); border-color: rgba(139,92,246,0.2); transform: translateY(-2px); }
`;
export const StyledMetaHeader = styled.div`display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;`;
export const StyledMetaIcon = styled.div<{ $color: string }>`
  width: 44px; height: 44px; border-radius: 12px; background: ${props => props.$color}1A;
  display: flex; align-items: center; justify-content: center; font-size: 20px;
  color: ${props => props.$color}; flex-shrink: 0;
`;
export const StyledMetaInfo = styled.div`flex: 1; min-width: 0;`;
export const StyledMetaName = styled.span`font-size: 15px; font-weight: 600; color: #fff; display: block;`;
export const StyledMetaCategory = styled.span`font-size: 12px; color: #a0a0b0;`;
export const StyledMetaBody = styled.div`display: flex; flex-direction: column; gap: 8px;`;
export const StyledProgressBar = styled.div`
  width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;
`;
export const StyledProgressFill = styled.div<{ $progresso: number; $color: string }>`
  width: ${props => Math.min(props.$progresso, 100)}%; height: 100%;
  background: linear-gradient(90deg, ${props => props.$color}, ${props => props.$color}dd);
  border-radius: 4px; transition: width 0.5s ease; position: relative;
`;
export const StyledProgressText = styled.span`font-size: 13px; font-weight: 600; color: #fff;`;
export const StyledMetaValues = styled.div`display: flex; justify-content: space-between; align-items: center;`;
export const StyledMetaValue = styled.div`display: flex; flex-direction: column; gap: 2px;`;
export const StyledMetaLabel = styled.span`font-size: 11px; color: #6b6b7b;`;
export const StyledMetaAmount = styled.span`font-size: 14px; font-weight: 600; color: #fff;`;
export const StyledMetaDeadline = styled.span`font-size: 12px; color: #a0a0b0;`;
export const StyledBadge = styled.span<{ $color: string }>`
  display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 9999px;
  font-size: 11px; font-weight: 600; color: ${props => props.$color};
  background: ${props => props.$color}1A; border: 1px solid ${props => props.$color}33;
`;
export const StyledMetaActions = styled.div`display: flex; gap: 4px; justify-content: flex-end; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05);`;
export const StyledIconButton = styled.button<{ $color?: string }>`
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
  color: ${props => props.$color || '#a0a0b0'}; cursor: pointer; font-size: 16px;
  transition: all 150ms ease;
  &:hover { background: rgba(139,92,246,0.1); color: ${props => props.$color || '#8b5cf6'}; }
`;
export const StyledEmptyState = styled.div`
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 48px 24px; text-align: center; gap: 12px;
`;
export const StyledEmptyIcon = styled.div`font-size: 48px; opacity: 0.5;`;
export const StyledEmptyTitle = styled.h3`font-size: 16px; font-weight: 600; color: #fff; margin: 0;`;
export const StyledEmptyText = styled.p`font-size: 14px; color: #a0a0b0; margin: 0;`;
