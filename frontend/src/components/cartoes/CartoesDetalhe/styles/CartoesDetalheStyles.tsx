import styled from 'styled-components';

export const StyledDetalheOverlay = styled.div`position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;`;
export const StyledDetalheModal = styled.div`background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(15,15,26,0.98) 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; width: 100%; max-width: 480px;`;
export const StyledModalHeader = styled.div`display: flex; justify-content: space-between; align-items: center; padding: 24px 24px 0;`;
export const StyledModalTitle = styled.h2`font-size: 20px; font-weight: 700; color: #fff; margin: 0;`;
export const StyledModalClose = styled.button`background: none; border: none; color: #a0a0b0; font-size: 20px; cursor: pointer;`;
export const StyledDetalheContent = styled.div`padding: 24px; display: flex; flex-direction: column; gap: 16px;`;
export const StyledDetalheRow = styled.div`display: flex; justify-content: space-between; align-items: center;`;
export const StyledDetalheLabel = styled.span`font-size: 14px; color: #a0a0b0;`;
export const StyledDetalheValue = styled.span`font-size: 14px; font-weight: 600; color: #fff;`;
export const StyledModalActions = styled.div`display: flex; gap: 12px; justify-content: flex-end; padding: 0 24px 24px;`;
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`padding: 10px 24px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 200ms ease; ${props => props.$variant === 'secondary' ? 'background: rgba(26,26,46,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.1);' : 'background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #fff;'} &:hover { transform: translateY(-1px); }`;
