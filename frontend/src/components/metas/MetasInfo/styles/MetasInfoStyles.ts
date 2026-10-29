import styled from 'styled-components';

export const StyledInfoOverlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'flex' : 'none'};
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  z-index: 1000; align-items: center; justify-content: center; padding: 16px;
`;
export const StyledInfoModal = styled.div`
  background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
  width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto;
  padding: 0; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
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
export const StyledInfoIcon = styled.div`font-size: 48px; text-align: center; padding: 24px 24px 0;`;
export const StyledInfoTitle = styled.h2`font-size: 20px; font-weight: 700; color: #fff; text-align: center; margin: 12px 0 8px; padding: 0 24px;`;
export const StyledInfoText = styled.p`font-size: 14px; color: #a0a0b0; text-align: center; line-height: 1.6; margin: 0; padding: 0 24px;`;
export const StyledInfoList = styled.ul`padding: 16px 24px 24px; margin: 0; list-style: none;`;
export const StyledInfoListItem = styled.li`
  padding: 8px 0; font-size: 13px; color: #a0a0b0; line-height: 1.5;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  &:last-child { border-bottom: none; }
`;
export const StyledModalActions = styled.div`display: flex; justify-content: center; padding: 0 24px 24px;`;
export const StyledButton = styled.button`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 200ms ease; border: none;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #fff;
`;
