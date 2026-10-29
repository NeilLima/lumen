import styled from 'styled-components';
export const StyledConfirmOverlay = styled.div<{ $visible: boolean }>`position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: ${p => p.$visible ? 'flex' : 'none'}; align-items: center; justify-content: center; z-index: 1100; padding: 20px;`;
export const StyledConfirmModal = styled.div`background: linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(15,15,26,0.98) 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; width: 100%; max-width: 400px; padding: 32px; text-align: center;`;
export const StyledConfirmIcon = styled.div`font-size: 48px; margin-bottom: 16px;`;
export const StyledConfirmTitle = styled.h2`font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 8px;`;
export const StyledConfirmText = styled.p`font-size: 14px; color: #a0a0b0; margin: 0 0 8px;`;
export const StyledConfirmItemName = styled.strong`color: #fff;`;
export const StyledConfirmActions = styled.div`display: flex; gap: 12px; justify-content: center; margin-top: 20px;`;
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`padding: 10px 24px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; ${p => p.$variant === 'danger' ? 'background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2);' : p.$variant === 'secondary' ? 'background: rgba(26,26,46,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.1);' : 'background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #fff;'} &:hover { transform: translateY(-1px); }`;
