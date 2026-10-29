import styled from 'styled-components';

// ============================================
// LAYOUT PRINCIPAL - PAINEL DE CONFIGURAÇÕES
// ============================================
export const StyledSettingsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const StyledSettingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const StyledSettingsTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StyledSettingsSubtitle = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 4px 0 0 0;
`;

// ============================================
// NAVEGAÇÃO POR TABS
// ============================================
export const StyledTabsNav = styled.div`
  display: flex;
  gap: 4px;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 6px;
  overflow-x: auto;
  margin-bottom: 8px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 2px;
  }
`;

export const StyledTab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$active ? '#ffffff' : '#a0a0b0'};
  background: ${props => props.$active ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    ${props => !props.$active && 'background: rgba(139, 92, 246, 0.1);'}
  }
`;

// ============================================
// SEÇÕES DE CONFIGURAÇÃO
// ============================================
export const StyledSettingsSection = styled.div`
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const StyledSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 6px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledSectionDescription = styled.p`
  font-size: 13px;
  color: #a0a0b0;
  margin: 0 0 24px 0;
`;

// ============================================
// LINHA DE CONFIGURAÇÃO
// ============================================
export const StyledSettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  gap: 16px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const StyledSettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

export const StyledSettingIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

export const StyledSettingText = styled.div`
  flex: 1;
`;

export const StyledSettingLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 2px;
`;

export const StyledSettingHint = styled.div`
  font-size: 12px;
  color: #6b6b7b;
`;

export const StyledSettingControl = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ============================================
// TOGGLE SWITCH
// ============================================
export const StyledToggle = styled.button<{ $checked: boolean }>`
  position: relative;
  width: 48px;
  height: 26px;
  border-radius: 13px;
  border: none;
  background: ${props => props.$checked ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'rgba(255, 255, 255, 0.1)'};
  cursor: pointer;
  transition: all 200ms ease;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.$checked ? '25px' : '3px'};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    transition: all 200ms ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    ${props => !props.$checked && 'background: rgba(255, 255, 255, 0.15);'}
  }
`;

// ============================================
// SELECT / DROPDOWN
// ============================================
export const StyledSelect = styled.select`
  padding: 10px 36px 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
  min-width: 160px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23a0a0b0' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  option {
    background: #1a1a2e;
    color: #ffffff;
  }
`;

// ============================================
// BOTÕES DE AÇÃO
// ============================================
export const StyledActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      default:
        return `
          background: rgba(37, 37, 66, 0.6);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }
        `;
    }
  }}
`;

// ============================================
// GRID DE SEÇÕES
// ============================================
export const StyledSettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// ============================================
// CARD DE ESTATÍSTICAS / INFO
// ============================================
export const StyledInfoCard = styled.div<{ $color: string }>`
  background: ${props => props.$color}0D;
  border: 1px solid ${props => props.$color}33;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledInfoIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

export const StyledInfoContent = styled.div`
  flex: 1;
`;

export const StyledInfoValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
`;

export const StyledInfoLabel = styled.div`
  font-size: 12px;
  color: #a0a0b0;
  margin-top: 2px;
`;

// ============================================
// BARRA DE PESQUISA
// ============================================
export const StyledSearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 150ms ease;

  &::placeholder {
    color: #6b6b7b;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

// ============================================
// ESTADO VAZIO
// ============================================
export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  gap: 12px;
`;

export const StyledEmptyIcon = styled.div`
  font-size: 48px;
  opacity: 0.5;
`;

export const StyledEmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const StyledEmptyText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0;
`;

// ============================================
// COMPONENTS ANTIGOS (mantidos para compatibilidade)
// ============================================
export const StyledCard = styled.div`
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const StyledCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const StyledFilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
`;

export const StyledItem = styled.div`
  background: rgba(37, 37, 66, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  transition: all 200ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    background: rgba(37, 37, 66, 0.6);
    border-color: rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
  }
`;

export const StyledItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

export const StyledInfo = styled.div`
  flex: 1;
`;

export const StyledName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  display: block;
`;

export const StyledSub = styled.span`
  font-size: 12px;
  color: #a0a0b0;
`;

export const StyledStatusBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$color};
  background: ${props => props.$color}1A;
  border: 1px solid ${props => props.$color}33;
  white-space: nowrap;
`;

export const StyledValues = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

export const StyledLabel = styled.span`
  font-size: 11px;
  color: #6b6b7b;
`;

export const StyledActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff;`;
      case 'ghost':
        return `background: transparent; color: #a0a0b0; &:hover { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }`;
      default:
        return `background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff;`;
    }
  }}
`;

export const StyledIconButton = styled.button<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${props => props.$color || '#a0a0b0'};
  cursor: pointer;
  transition: all 150ms ease;
  font-size: 16px;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
    color: ${props => props.$color || '#8b5cf6'};
  }
`;