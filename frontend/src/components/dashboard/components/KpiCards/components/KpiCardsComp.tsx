'use client';

import { useKpiCards } from '../utils/KpiCardsUtils';
import {
  StyledKpiGrid,
  StyledKpiCard,
  StyledKpiIcon,
  StyledKpiLabel,
  StyledKpiValue,
  StyledTrendBadge,
  StyledTrendIcon,
  StyledTrendPercentage,
  StyledTrendText,
} from '../styles/KpiCardsStyles';

export default function KpiCardsComp() {
  const { state, helpers } = useKpiCards();
  const data = state.data;

  if (!data) return null;

  return (
    <StyledKpiGrid>
      {data.cards.map(card => (
        <StyledKpiCard key={card.id} $accentColor={card.iconColor}>
          <StyledKpiIcon $color={card.iconColor} $bg={card.iconBg}>
            {card.icon}
          </StyledKpiIcon>
          <StyledKpiLabel>{card.title}</StyledKpiLabel>
          <StyledKpiValue>{card.value}</StyledKpiValue>
          <StyledTrendBadge $trendColor={helpers.getTrendColor(card.trend)}>
            <StyledTrendIcon>{helpers.getTrendIcon(card.trend)}</StyledTrendIcon>
            <StyledTrendPercentage>{helpers.getPercentage(card.percentage)}%</StyledTrendPercentage>
            <StyledTrendText>{card.trendText}</StyledTrendText>
          </StyledTrendBadge>
        </StyledKpiCard>
      ))}
    </StyledKpiGrid>
  );
}