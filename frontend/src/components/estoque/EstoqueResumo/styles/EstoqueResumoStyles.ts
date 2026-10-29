import styled from 'styled-components';

// ============================================
// CARDS DE RESUMO (KPIs) - SCROLL HORIZONTAL (idêntico ao DespesasResumo)
// ============================================
export const StyledResumoGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
  }
`;

export const StyledResumoCard = styled.div<{ $accentColor: string }>`
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(15, 15, 26, 0.9) 100%);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  transition: all 200ms ease;
  overflow: hidden;
  min-width: 220px;
  flex: 1 1 220px;
  max-width: 300px;
  scroll-snap-align: start;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.$accentColor}, transparent);
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 0 20px ${props => props.$accentColor}22;
    border-color: ${props => props.$accentColor}44;
  }
`;

export const StyledResumoIcon = styled.div<{ $color: string; $bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.$color};
  margin-bottom: 12px;
  box-shadow: 0 0 12px ${props => props.$color}33;
`;

export const StyledResumoLabel = styled.span`
  font-size: 12px;
  color: #a0a0b0;
  font-weight: 500;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledResumoValue = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin: 4px 0 0 0;
`;