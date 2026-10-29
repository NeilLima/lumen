'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { useCategoryChart } from '../utils/CategoryChartUtils';
import {
  StyledChartCard, StyledChartHeader, StyledChartTitle, StyledSelect,
  StyledDonutContainer, StyledDonut, StyledDonutHole, StyledDonutTotal,
  StyledDonutLabel, StyledCategoryLegend, StyledCategoryItem,
  StyledCategoryLeft, StyledCategoryColor, StyledCategoryName,
  StyledCategoryRight, StyledCategoryPercent, StyledCategoryAmount,
} from '../styles/CategoryChartStyles';

export default function CategoryChartComp() {
  const { state, helpers } = useCategoryChart();
  const theme = useTheme();
  const data = state.data;

  if (!data) return null;

  return (
    <StyledChartCard theme={theme}>
      <StyledChartHeader>
        <StyledChartTitle theme={theme}>Gastos por Categoria</StyledChartTitle>
        <StyledSelect theme={theme}>
          <option>Mês</option>
        </StyledSelect>
      </StyledChartHeader>

      <StyledDonutContainer>
        <StyledDonut $segments={helpers.getDonutBackground(data.categories)}>
          <StyledDonutHole theme={theme}>
            <StyledDonutTotal theme={theme}>{helpers.formatCurrency(data.total)}</StyledDonutTotal>
            <StyledDonutLabel theme={theme}>Total</StyledDonutLabel>
          </StyledDonutHole>
        </StyledDonut>
      </StyledDonutContainer>

      <StyledCategoryLegend>
        {data.categories.map(cat => (
          <StyledCategoryItem key={cat.id} theme={theme}>
            <StyledCategoryLeft>
              <StyledCategoryColor $color={cat.color} />
              <StyledCategoryName theme={theme}>{cat.name}</StyledCategoryName>
            </StyledCategoryLeft>
            <StyledCategoryRight>
              <StyledCategoryPercent theme={theme}>{cat.percentage}%</StyledCategoryPercent>
              <StyledCategoryAmount theme={theme}>{helpers.formatCurrency(cat.amount)}</StyledCategoryAmount>
            </StyledCategoryRight>
          </StyledCategoryItem>
        ))}
      </StyledCategoryLegend>
    </StyledChartCard>
  );
}