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

        <KpiCardsComp />

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