import styled from 'styled-components';

// ============================================
// TERMÔMETRO - CARD
// ============================================
export const StyledTermometroCard = styled.div`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(15, 15, 26, 0.9) 100%);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%);
  }
`;

export const StyledTermometroHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledTitulo = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledSubtitulo = styled.p`
  margin: 0;
  font-size: 13px;
  color: #a0a0b0;
`;

// ============================================
// BARRA DO TERMÔMETRO
// ============================================
export const StyledTermometro = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 8px;
`;

export const StyledBarra = styled.div`
  flex: 1;
  position: relative;
  height: 18px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
  overflow: visible;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const StyledTrilhoGradient = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(90deg,
    #ef4444 0%,
    #f59e0b 35%,
    #10b981 70%,
    #10b981 100%
  );
  opacity: 0.18;
`;

export const StyledEnchimento = styled.div<{ $cor: string }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-radius: 9999px;
  background: linear-gradient(90deg, ${props => props.$cor}AA, ${props => props.$cor});
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 12px ${props => props.$cor}66;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 50%);
    border-radius: 9999px;
  }
`;

export const StyledMarcador = styled.div<{ $cor: string; $pos: number }>`
  position: absolute;
  top: 50%;
  left: ${props => props.$pos}%;
  transform: translate(-50%, -50%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #0a0a14;
  border: 3px solid ${props => props.$cor};
  box-shadow: 0 0 16px ${props => props.$cor}99, 0 0 4px ${props => props.$cor};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const StyledMarcadorPonto = styled.span<{ $cor: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$cor};
  box-shadow: 0 0 8px ${props => props.$cor};
`;

export const StyledPercentual = styled.div<{ $cor: string }>`
  min-width: 64px;
  text-align: right;
  font-size: 22px;
  font-weight: 800;
  color: ${props => props.$cor};
  text-shadow: 0 0 18px ${props => props.$cor}55;
  line-height: 1;
  transition: color 0.3s ease;
`;

export const StyledEscala = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b6b7b;
  padding: 0 4px;
  margin-bottom: 18px;
`;

export const StyledEscalaItem = styled.span<{ $ativo?: boolean; $cor?: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: ${props => props.$ativo ? 1 : 0.5};
  color: ${props => (props.$ativo && props.$cor) ? props.$cor : '#6b6b7b'};
  transition: all 0.2s ease;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.$cor || '#6b6b7b'};
    opacity: ${props => props.$ativo ? 1 : 0.5};
  }
`;

// ============================================
// PILLS (contadores)
// ============================================
export const StyledInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledPill = styled.div<{ $bg: string; $border: string; $bgHover: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: ${props => props.$bg};
  border: 1px solid ${props => props.$border};
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: default;

  &:hover {
    background: ${props => props.$bgHover};
    transform: translateY(-1px);
  }
`;

export const StyledPillDot = styled.span<{ $cor: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$cor};
  box-shadow: 0 0 8px ${props => props.$cor}88;
  flex-shrink: 0;
`;

export const StyledPillNum = styled.strong<{ $cor: string }>`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.$cor};
  line-height: 1;
`;

export const StyledTextoPill = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #a0a0b0;
`;