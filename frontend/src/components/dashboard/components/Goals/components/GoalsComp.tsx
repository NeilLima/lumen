'use client';

import { useGoals } from '../utils/GoalsUtils';
import {
  StyledCard, StyledCardHeader, StyledCardTitle, StyledCardLink,
  StyledGoalItem, StyledGoalHeader, StyledGoalIcon, StyledGoalName,
  StyledGoalPercentage, StyledProgressBar, StyledProgressFill, StyledGoalProgress,
} from '../styles/GoalsStyles';

export default function GoalsComp() {
  const { state, helpers } = useGoals();
  const goals = state.data;
  if (!goals) return null;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Metas em Andamento</StyledCardTitle>
        <StyledCardLink>Ver todas</StyledCardLink>
      </StyledCardHeader>
      {goals.goals.map(g => (
        <StyledGoalItem key={g.id}>
          <StyledGoalHeader>
            <StyledGoalIcon>{helpers.getIcon(g.icon)}</StyledGoalIcon>
            <StyledGoalName>{g.name}</StyledGoalName>
            <StyledGoalPercentage>{g.percentage}%</StyledGoalPercentage>
          </StyledGoalHeader>
          <StyledProgressBar><StyledProgressFill $percentage={g.percentage} /></StyledProgressBar>
          <StyledGoalProgress>R$ {g.currentAmount.toLocaleString('pt-BR')} / R$ {g.targetAmount.toLocaleString('pt-BR')}</StyledGoalProgress>
        </StyledGoalItem>
      ))}
    </StyledCard>
  );
}