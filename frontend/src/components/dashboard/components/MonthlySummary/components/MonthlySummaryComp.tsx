'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { useMonthlySummary } from '../utils/MonthlySummaryUtils';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledCardLink,
  StyledSummaryItem,
  StyledSummaryIcon,
  StyledSummaryInfo,
  StyledSummaryLabel,
  StyledSummaryValue,
} from '../styles/MonthlySummaryStyles';

export default function MonthlySummaryComp() {
  const { state, helpers } = useMonthlySummary();
  const theme = useTheme();
  const data = state.data;

  if (!data) return null;

  const items = helpers.getSummaryItems(data);

  return (
    <StyledCard theme={theme}>
      <StyledCardHeader>
        <StyledCardTitle theme={theme}>Resumo do Mês</StyledCardTitle>
        <StyledCardLink theme={theme}>Ver relatório completo</StyledCardLink>
      </StyledCardHeader>

      {items.map((item, i) => (
        <StyledSummaryItem key={i} theme={theme}>
          <StyledSummaryIcon>{item.icon}</StyledSummaryIcon>
          <StyledSummaryInfo>
            <StyledSummaryLabel theme={theme}>{item.label}</StyledSummaryLabel>
            <StyledSummaryValue theme={theme}>{item.value}</StyledSummaryValue>
          </StyledSummaryInfo>
        </StyledSummaryItem>
      ))}
    </StyledCard>
  );
}