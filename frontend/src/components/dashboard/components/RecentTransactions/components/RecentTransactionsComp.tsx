'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { useRecentTransactions } from '../utils/RecentTransactionsUtils';
import {
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledCardLink,
  StyledFilterBar,
  StyledFilterButton,
  StyledTransactionItem,
  StyledTransactionIcon,
  StyledTransactionInfo,
  StyledTransactionName,
  StyledTransactionMeta,
  StyledTransactionAmount,
  StyledTransactionDate,
} from '../styles/RecentTransactionsStyles';

export default function RecentTransactionsComp() {
  const { state, helpers } = useRecentTransactions();
  const theme = useTheme();
  const data = state.data;

  if (!data) return null;

  return (
    <StyledCard theme={theme}>
      <StyledCardHeader>
        <StyledCardTitle theme={theme}>Atividades Recentes</StyledCardTitle>
        <StyledCardLink theme={theme}>Ver todos</StyledCardLink>
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledFilterButton theme={theme} $active>Todas</StyledFilterButton>
        <StyledFilterButton theme={theme}>Receitas</StyledFilterButton>
        <StyledFilterButton theme={theme}>Despesas</StyledFilterButton>
        <StyledFilterButton theme={theme}>Transferências</StyledFilterButton>
      </StyledFilterBar>

      {data.transactions.map(tx => (
        <StyledTransactionItem key={tx.id} theme={theme}>
          <StyledTransactionIcon $color={tx.categoryColor}>
            {helpers.getIcon(tx.icon)}
          </StyledTransactionIcon>
          <StyledTransactionInfo>
            <StyledTransactionName theme={theme}>{tx.description}</StyledTransactionName>
            <StyledTransactionMeta theme={theme}>{tx.category} • {tx.paymentMethod}</StyledTransactionMeta>
          </StyledTransactionInfo>
          <StyledTransactionAmount theme={theme} $type={tx.type}>
            {helpers.getTransactionSign(tx.type)} R$ {helpers.formatAmount(tx.amount)}
          </StyledTransactionAmount>
          <StyledTransactionDate theme={theme}>{tx.date}</StyledTransactionDate>
        </StyledTransactionItem>
      ))}
    </StyledCard>
  );
}