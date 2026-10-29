import styled from 'styled-components';

export const StyledCartoesLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const StyledCartoesMainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 24px;
  background: linear-gradient(135deg, #0a0a1a 0%, #0d0d20 100%);
  min-height: 100vh;
  @media (max-width: 768px) { margin-left: 0; padding: 16px; }
`;

export const StyledHamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1000;
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 24px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  @media (max-width: 768px) { display: block; }
`;

export const StyledOverlay = styled.div<{ $visible: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
  @media (max-width: 768px) { display: ${props => (props.$visible ? 'block' : 'none')}; }
`;

export const StyledCartoesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #a0a0b0;
  font-size: 18px;
`;