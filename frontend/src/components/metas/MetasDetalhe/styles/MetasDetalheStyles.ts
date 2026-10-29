import styled from 'styled-components';

export const StyledDetalheOverlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'flex' : 'none'};
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  z-index: 1000; align-items: center; justify-content: center; padding: 16px;
`;
export const StyledDetalheModal = styled.div`
  background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
  width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
`;
export const StyledModalHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.05);
`;
export const StyledModalTitle = styled.h3`font-size: 18px; font-weight: 700; color: #fff; margin: 0;`;
export const StyledModalClose = styled.button`
  background: none; border: none; color: #a0a0b0; font-size: 18px; cursor: pointer;
  padding: 4px 8px; border-radius: 6px; transition: all 200ms ease;
  &:hover { background: rgba(255,255,255,0.05); color: #fff; }
`;
export const StyledDetalheHeader = styled.div`
  display: flex; align-items: center; gap: 16px; padding: 24px 24px 0;
`;
export const StyledDetalheIcon = styled.div<{ $color: string }>`
  width: 48px; height: 48px; border-radius: 12px; background: ${props => props.$color}1A;
  display: flex; align-items: center; justify-content: center; font-size: 24px; color: ${props => props.$color};
`;
export const StyledDetalheNome = styled.h2`font-size: 20px; font-weight: 700; color: #fff; margin: 0;`;
export const StyledProgressSection = styled.div`padding: 20px 24px 0;`;
export const StyledProgressBar = styled.div`
  width: 100%; height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden;
`;
export const StyledProgressFill = styled.div<{ $progresso: number; $color: string }>`
  width: ${props => Math.min(props.$progresso, 100)}%; height: 100%;
  background: linear-gradient(90deg, ${props => props.$color}, ${props => props.$color}dd);
  border-radius: 5px; transition: width 0.5s ease;
`;
export const StyledProgressText = styled.div`
  display: flex; justify-content: space-between; margin-top: 8px; font-size: 13px;
  color: #a0a0b0;
`;
export const StyledDetalheContent = styled.div`padding: 20px 24px; display: flex; flex-direction: column; gap: 16px;`;
export const StyledDetalheGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 16px;`;
export const StyledDetalheItem = styled.div`display: flex; flex-direction: column; gap: 4px;`;
export const StyledDetalheLabel = styled.span`font-size: 12px; color: #6b6b7b; font-weight: 500;`;
export const StyledDetalheValue = styled.span`font-size: 14px; font-weight: 600; color: #fff;`;
export const StyledDetalheDescricao = styled.div`
  padding: 0 24px; display: flex; flex-direction: column; gap: 6px;
`;
export const StyledStatusBadge = styled.span<{ $color: string }>`
  display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 9999px;
  font-size: 12px; font-weight: 600; color: ${props => props.$color};
  background: ${props => props.$color}1A; border: 1px solid ${props => props.$color}33;
`;
export const StyledModalActions = styled.div`
  display: flex; gap: 12px; justify-content: flex-end;
  padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.05);
`;
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 200ms ease; border: none;
  ${props => props.$variant === 'secondary'
    ? `background: rgba(26,26,46,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.1);`
    : `background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #fff;`}
`;
