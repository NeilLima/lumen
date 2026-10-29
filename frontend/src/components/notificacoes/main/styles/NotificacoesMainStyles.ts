import styled from 'styled-components';

// ============================================
// LAYOUT PRINCIPAL
// ============================================
export const StyledNotificacoesLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background: linear-gradient(135deg, #0a0a14 0%, #12121f 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export const StyledNotificacoesMainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 24px 32px;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100vw - 260px);
  max-width: 100%;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    padding: 70px 16px 24px;
  }

  @media (max-width: 480px) {
    padding: 70px 12px 16px;
  }
`;

export const StyledHamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 200;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(12px);
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const StyledOverlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 150;
  cursor: pointer;

  @media (min-width: 1025px) {
    display: none;
  }
`;

// ============================================
// CONTAINER E LOADING
// ============================================
export const StyledNotificacoesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #8b5cf6;
  font-size: 16px;
`;
