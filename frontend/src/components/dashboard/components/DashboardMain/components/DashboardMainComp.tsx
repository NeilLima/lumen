'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import KpiCardsComp from '../../KpiCards/components/KpiCardsComp';
import CashFlowChartComp from '../../CashFlowChart/components/CashFlowChartComp';
import CategoryChartComp from '../../CategoryChart/components/CategoryChartComp';
import RecentTransactionsComp from '../../RecentTransactions/components/RecentTransactionsComp';
import MonthlySummaryComp from '../../MonthlySummary/components/MonthlySummaryComp';
import CreditCardComp from '../../CreditCard/components/CreditCardComp';
import UpcomingPaymentsComp from '../../UpcomingPayments/components/UpcomingPaymentsComp';
import GoalsComp from '../../Goals/components/GoalsComp';
import AlertsComp from '../../Alerts/components/AlertsComp';
import { useDashboardMain } from '../utils/DashboardMainUtils';
import {
  StyledDashboardLayout,
  StyledMainContent,
  StyledKpiRow,
  StyledKpiCard,
  StyledKpiLabel,
  StyledKpiValue,
  StyledKpiSubtitle,
  StyledContentGrid,
  StyledLeftColumn,
  StyledRightColumn,
  StyledSectionCard,
  StyledSectionHeader,
  StyledSectionTitle,
  StyledSectionLink,
  StyledSectionBody,
  StyledTwoColumnGrid,
  StyledColumn,
  StyledHamburgerButton,
  StyledOverlay,
} from '../styles/DashboardMainStyles';

export default function DashboardMainComp() {
  const { state, actions } = useDashboardMain();
  const theme = useTheme();

  return (
    <StyledDashboardLayout theme={theme}>
      <StyledHamburgerButton theme={theme} onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledMainContent theme={theme}>
        <HeaderComp />

        <StyledKpiRow>
          <StyledKpiCard theme={theme} $accentColor="#10b981">
            <StyledKpiLabel theme={theme}>Saldo Total</StyledKpiLabel>
            <StyledKpiValue theme={theme}>R$ 0,00</StyledKpiValue>
            <StyledKpiSubtitle theme={theme}>em relação ao mês anterior</StyledKpiSubtitle>
          </StyledKpiCard>
          <StyledKpiCard theme={theme} $accentColor="#f59e0b">
            <StyledKpiLabel theme={theme}>Receitas</StyledKpiLabel>
            <StyledKpiValue theme={theme}>R$ 0,00</StyledKpiValue>
            <StyledKpiSubtitle theme={theme}>este mês</StyledKpiSubtitle>
          </StyledKpiCard>
          <StyledKpiCard theme={theme} $accentColor="#ef4444">
            <StyledKpiLabel theme={theme}>Despesas</StyledKpiLabel>
            <StyledKpiValue theme={theme}>R$ 0,00</StyledKpiValue>
            <StyledKpiSubtitle theme={theme}>este mês</StyledKpiSubtitle>
          </StyledKpiCard>
          <StyledKpiCard theme={theme} $accentColor="#8b5cf6">
            <StyledKpiLabel theme={theme}>Economia</StyledKpiLabel>
            <StyledKpiValue theme={theme}>R$ 0,00</StyledKpiValue>
            <StyledKpiSubtitle theme={theme}>em relação ao mês anterior</StyledKpiSubtitle>
          </StyledKpiCard>
        </StyledKpiRow>

        <StyledContentGrid>
          <StyledLeftColumn>
            <StyledSectionCard theme={theme}>
              <StyledSectionHeader theme={theme}>
                <StyledSectionTitle theme={theme}>Fluxo de Caixa</StyledSectionTitle>
                <StyledSectionLink theme={theme}>Ver relatório</StyledSectionLink>
              </StyledSectionHeader>
              <StyledSectionBody theme={theme}>
                <CashFlowChartComp />
              </StyledSectionBody>
            </StyledSectionCard>

            <StyledSectionCard theme={theme}>
              <StyledSectionHeader theme={theme}>
                <StyledSectionTitle theme={theme}>Gastos por Categoria</StyledSectionTitle>
                <StyledSectionLink theme={theme}>Ver todos</StyledSectionLink>
              </StyledSectionHeader>
              <StyledSectionBody theme={theme}>
                <CategoryChartComp />
              </StyledSectionBody>
            </StyledSectionCard>
          </StyledLeftColumn>

          <StyledRightColumn>
            <StyledSectionCard theme={theme}>
              <StyledSectionHeader theme={theme}>
                <StyledSectionTitle theme={theme}>Transações Recentes</StyledSectionTitle>
                <StyledSectionLink theme={theme}>Ver todos</StyledSectionLink>
              </StyledSectionHeader>
              <StyledSectionBody theme={theme}>
                <RecentTransactionsComp />
              </StyledSectionBody>
            </StyledSectionCard>

            <StyledSectionCard theme={theme}>
              <StyledSectionHeader theme={theme}>
                <StyledSectionTitle theme={theme}>Resumo do Mês</StyledSectionTitle>
                <StyledSectionLink theme={theme}>Ver relatório completo</StyledSectionLink>
              </StyledSectionHeader>
              <StyledSectionBody theme={theme}>
                <MonthlySummaryComp />
              </StyledSectionBody>
            </StyledSectionCard>
          </StyledRightColumn>
        </StyledContentGrid>
      </StyledMainContent>
    </StyledDashboardLayout>
  );
}