import styled from 'styled-components';

export const StyledConfirmOverlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'flex' : 'none'};
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  z-index: 1000; align-items: center; justify-content: center; padding: 16px;
`;
export const StyledConfirmModal = styled.div`
  background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
  padding: 32px; max-width: 400px; width: 100%; text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
`;
export const StyledConfirmIcon = styled.div`font-size: 48px; margin-bottom: 16px;`;
export const StyledConfirmTitle = styled.h3`font-size: 18px; font-weight: 700; color: #fff; margin: 0 0 8px;`;
export const StyledConfirmText = styled.p`font-size: 14px; color: #a0a0b0; margin: 0 0 4px; line-height: 1.5;`;
export const StyledConfirmItemName = styled.span`font-weight: 600; color: #fff;`;
export const StyledConfirmActions = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 24px;`;
export const StyledButton = styled.button<{ $variant?: 'secondary' | 'danger' }>`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 200ms ease; border: none;
  ${props => props.$variant === 'danger'
    ? `background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2);`
    : `background: rgba(26,26,46,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.1);`}
`;
