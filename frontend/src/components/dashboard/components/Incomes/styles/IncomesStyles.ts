import styled from 'styled-components';

export const StyledIncomesCard = styled.div<{ theme: any }>`
  background: ${(props) => props.theme.bgCard};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 24px;
  color: ${(props) => props.theme.textPrimary};
`;

export const StyledIncomesHeader = styled.div<{ theme: any }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.textPrimary};
`;

export const StyledIncomesTitle = styled.h2<{ theme: any }>`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: ${(props) => props.theme.textPrimary};
`;

export const StyledIncomesTotal = styled.div<{ theme: any }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.primaryColor};
`;

export const StyledIncomesTable = styled.table<{ theme: any }>`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  color: ${(props) => props.theme.textPrimary};

  th {
    text-align: left;
    padding: 12px;
    font-weight: 600;
    color: ${(props) => props.theme.textSecondary};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }

  td {
    padding: 12px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }

  tr:hover {
    background: ${(props) => props.theme.bgHover};
  }
`;

export const StyledBadge = styled.span<{ theme: any; $color?: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => props.$color || props.theme.bgSecondary};
  color: ${(props) => props.theme.textPrimary};
`;

export const StyledActionButton = styled.button<{ theme: any }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  color: ${(props) => props.theme.textSecondary};

  &:hover {
    color: ${(props) => props.theme.primaryColor};
    background: ${(props) => props.theme.bgHover};
  }

  &.delete {
    color: #ef4444;

    &:hover {
      color: #dc2626;
    }
  }
`;

export const StyledEmptyState = styled.div<{ theme: any }>`
  text-align: center;
  padding: 48px 24px;
  color: ${(props) => props.theme.textSecondary};

  p {
    font-size: 16px;
    margin: 8px 0;
  }
`;

export const StyledLoading = styled.div<{ theme: any }>`
  text-align: center;
  padding: 48px 24px;
  color: ${(props) => props.theme.textSecondary};
`;