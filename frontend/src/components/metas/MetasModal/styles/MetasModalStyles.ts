import styled from 'styled-components';

export const StyledModalOverlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'flex' : 'none'};
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  z-index: 1000; align-items: center; justify-content: center; padding: 16px;
`;
export const StyledModal = styled.div`
  background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
  width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); padding: 0;
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
export const StyledForm = styled.div`padding: 24px; display: flex; flex-direction: column; gap: 16px;`;
export const StyledFormGroup = styled.div`display: flex; flex-direction: column; gap: 6px; flex: 1;`;
export const StyledFormRow = styled.div`display: flex; gap: 16px; @media (max-width: 480px) { flex-direction: column; gap: 12px; }`;
export const StyledLabel = styled.label`font-size: 13px; font-weight: 600; color: #a0a0b0;`;
export const StyledInput = styled.input`
  padding: 10px 14px; background: rgba(37,37,66,0.6); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; color: #fff; font-size: 14px; transition: all 150ms ease;
  &:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,0.1); }
  &::placeholder { color: #6b6b7b; }
`;
export const StyledTextarea = styled.textarea`
  padding: 10px 14px; background: rgba(37,37,66,0.6); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; color: #fff; font-size: 14px; min-height: 80px; resize: vertical;
  &:focus { outline: none; border-color: #8b5cf6; }
  &::placeholder { color: #6b6b7b; }
`;
export const StyledFormSelect = styled.select`
  padding: 10px 14px; background: rgba(37,37,66,0.6); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px; color: #fff; font-size: 14px; cursor: pointer;
  &:focus { outline: none; border-color: #8b5cf6; }
  option { background: #1a1a2e; color: #fff; }
`;
export const StyledModalActions = styled.div`display: flex; gap: 12px; justify-content: flex-end; padding-top: 8px;`;
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 200ms ease; border: none;
  ${props => props.$variant === 'secondary'
    ? `background: rgba(26,26,46,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.1);`
    : props.$variant === 'danger'
    ? `background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2);`
    : `background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #fff;`}
`;
