'use client';

import { useAlerts } from '../utils/AlertsUtils';
import {
  StyledCard, StyledCardHeader, StyledCardTitle, StyledCardLink,
  StyledAlertItem, StyledAlertIcon, StyledAlertInfo, StyledAlertTitle, StyledAlertDesc,
} from '../styles/AlertsStyles';

export default function AlertsComp() {
  const { state, helpers } = useAlerts();
  const alerts = state.data;
  if (!alerts) return null;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Alertas Importantes</StyledCardTitle>
        <StyledCardLink>Ver todos</StyledCardLink>
      </StyledCardHeader>
      {alerts.alerts.map(a => (
        <StyledAlertItem key={a.id} $type={a.type}>
          <StyledAlertIcon $type={a.type}>{helpers.getIcon(a.icon)}</StyledAlertIcon>
          <StyledAlertInfo>
            <StyledAlertTitle>{a.title}</StyledAlertTitle>
            <StyledAlertDesc>{a.description}</StyledAlertDesc>
          </StyledAlertInfo>
        </StyledAlertItem>
      ))}
    </StyledCard>
  );
}