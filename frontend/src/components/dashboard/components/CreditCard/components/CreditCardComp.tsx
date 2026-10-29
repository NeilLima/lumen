'use client';

import { useCreditCard } from '../utils/CreditCardUtils';
import {
  StyledCard, StyledCardHeader, StyledCardTitle, StyledCardLink,
  StyledCardName, StyledLabel, StyledValue, StyledSmallText,
  StyledProgressBar, StyledProgressFill, StyledPercentText,
  StyledCardInfo, StyledInfoBlock, StyledInfoLabel, StyledInfoValue,
} from '../styles/CreditCardStyles';

export default function CreditCardComp() {
  const { state, helpers } = useCreditCard();
  const card = state.data;
  if (!card) return null;

  const limitPercent = helpers.getLimitPercentage(card.limitUsed, card.limitTotal);

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Cartão de Crédito</StyledCardTitle>
        <StyledCardLink>Ver todos</StyledCardLink>
      </StyledCardHeader>
      <StyledCardName>{card.name}</StyledCardName>
      <StyledLabel>Limite utilizado</StyledLabel>
      <StyledValue>R$ {card.limitUsed.toFixed(2)}</StyledValue>
      <StyledSmallText>de R$ {card.limitTotal.toFixed(2)}</StyledSmallText>
      <StyledProgressBar><StyledProgressFill $percentage={limitPercent} /></StyledProgressBar>
      <StyledPercentText>{limitPercent.toFixed(0)}%</StyledPercentText>
      <StyledCardInfo>
        <StyledInfoBlock>
          <StyledInfoLabel>Fatura atual</StyledInfoLabel>
          <StyledInfoValue>R$ {card.currentInvoice.toFixed(2)}</StyledInfoValue>
        </StyledInfoBlock>
        <StyledInfoBlock>
          <StyledInfoLabel>Vencimento</StyledInfoLabel>
          <StyledInfoValue>{card.dueDate}</StyledInfoValue>
        </StyledInfoBlock>
      </StyledCardInfo>
    </StyledCard>
  );
}