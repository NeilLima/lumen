import styled from 'styled-components';

export const StyledMetasHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
  margin-bottom: 8px;
`;
export const StyledMetasTitle = styled.h1`
  font-size: 28px; font-weight: 700; color: #fff; margin: 0;
  display: flex; align-items: center; gap: 12px;
  @media (max-width: 480px) { font-size: 22px; }
`;
export const StyledMetasSubtitle = styled.p`
  font-size: 14px; color: #a0a0b0; margin: 4px 0 0;
`;
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 200ms ease; border: none; white-space: nowrap;
  ${props => props.$variant === 'secondary'
    ? `background: rgba(26,26,46,0.8); color: #fff; border: 1px solid rgba(255,255,255,0.1);
       &:hover { background: rgba(37,37,66,0.8); border-color: rgba(139,92,246,0.3); }`
    : `background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #fff;
       box-shadow: 0 4px 6px -1px rgba(139,92,246,0.3);
       &:hover { transform: translateY(-1px); box-shadow: 0 6px 8px -1px rgba(139,92,246,0.4); }`}
`;
export const StyledInfoButton = styled.button`
  background: none; border: none; color: #a0a0b0; cursor: pointer; font-size: 20px;
  padding: 4px; border-radius: 6px; transition: all 200ms ease;
  &:hover { background: rgba(139,92,246,0.1); color: #8b5cf6; }
`;
