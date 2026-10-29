'use client';

import { useUpcomingPayments } from '../utils/UpcomingPaymentsUtils';
import {
  StyledCard, StyledCardHeader, StyledCardTitle, StyledCardLink,
  StyledPaymentItem, StyledPaymentDay, StyledPaymentDayNumber,
  StyledPaymentDayMonth, StyledPaymentInfo, StyledPaymentName,
  StyledPaymentDays, StyledPaymentAmount,
} from '../styles/UpcomingPaymentsStyles';

export default function UpcomingPaymentsComp() {
  const { state, helpers } = useUpcomingPayments();
  const pay = state.data;
  if (!pay) return null;

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Próximos Vencimentos</StyledCardTitle>
        <StyledCardLink>Ver calendário</StyledCardLink>
      </StyledCardHeader>
      {pay.payments.map(p => (
        <StyledPaymentItem key={p.id}>
          <StyledPaymentDay $urgent={p.daysUntil <= 3}>
            <StyledPaymentDayNumber $urgent={p.daysUntil <= 3}>{helpers.getDayFromDate(p.dueDate)}</StyledPaymentDayNumber>
            <StyledPaymentDayMonth $urgent={p.daysUntil <= 3}>{helpers.getMonthFromDate(p.dueDate)}</StyledPaymentDayMonth>
          </StyledPaymentDay>
          <StyledPaymentInfo>
            <StyledPaymentName>{p.description}</StyledPaymentName>
            <StyledPaymentDays $urgent={p.daysUntil <= 3}>{p.daysUntil <= 0 ? 'Vencido' : `Em ${p.daysUntil} dias`}</StyledPaymentDays>
          </StyledPaymentInfo>
          <StyledPaymentAmount>R$ {p.amount.toFixed(2)}</StyledPaymentAmount>
        </StyledPaymentItem>
      ))}
    </StyledCard>
  );
}