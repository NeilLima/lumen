'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import { useCalendario } from '../utils/CalendarioUtils';
import {
  StyledCalendarioLayout,
  StyledCalendarioMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledCalendarioContainer,
  StyledLoading,
  StyledMonthHeader,
  StyledMonthTitle,
  StyledMonthNav,
  StyledNavButton,
  StyledResumoRow,
  StyledResumoCard,
  StyledResumoLabel,
  StyledResumoValue,
  StyledResumoSub,
  StyledCalendarCard,
  StyledWeekHeader,
  StyledWeekDay,
  StyledDaysGrid,
  StyledDayCell,
  StyledDayNumber,
  StyledDayTx,
  StyledDayMore,
  StyledDayDetailCard,
  StyledDayDetailTitle,
  StyledTxRow,
  StyledTxIcon,
  StyledTxInfo,
  StyledTxName,
  StyledTxMeta,
  StyledTxAmount,
  StyledEmptyDay,
} from '../styles/CalendarioMainStyles';

const MAX_TX_POR_DIA = 2;

export default function CalendarioMainComp() {
  const { state, actions, helpers } = useCalendario();

  if (state.isLoading) {
    return (
      <StyledCalendarioLayout>
        <StyledCalendarioMainContent>
          <StyledCalendarioContainer>
            <StyledLoading>Carregando calendário...</StyledLoading>
          </StyledCalendarioContainer>
        </StyledCalendarioMainContent>
      </StyledCalendarioLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledCalendarioLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar} data-testid="calendario-menu-btn">
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledCalendarioMainContent>
        <HeaderComp />
        <StyledCalendarioContainer>
          <StyledMonthHeader>
            <StyledMonthTitle>{state.mesLabel}</StyledMonthTitle>
            <StyledMonthNav>
              <StyledNavButton onClick={actions.mesAnterior} data-testid="calendario-mes-anterior">
                ← Mês
              </StyledNavButton>
              <StyledNavButton onClick={actions.irParaHoje} data-testid="calendario-hoje">
                Hoje
              </StyledNavButton>
              <StyledNavButton onClick={actions.proximoMes} data-testid="calendario-proximo-mes">
                Mês →
              </StyledNavButton>
            </StyledMonthNav>
          </StyledMonthHeader>

          <StyledResumoRow>
            <StyledResumoCard $color="#10b981">
              <StyledResumoLabel>Receitas do mês</StyledResumoLabel>
              <StyledResumoValue $color="#10b981">{helpers.formatarValor(state.resumo.totalReceitas)}</StyledResumoValue>
              <StyledResumoSub>{state.resumo.quantidade} lançamento(s)</StyledResumoSub>
            </StyledResumoCard>
            <StyledResumoCard $color="#ef4444">
              <StyledResumoLabel>Despesas do mês</StyledResumoLabel>
              <StyledResumoValue $color="#ef4444">{helpers.formatarValor(state.resumo.totalDespesas)}</StyledResumoValue>
              <StyledResumoSub>Saídas registradas</StyledResumoSub>
            </StyledResumoCard>
            <StyledResumoCard $color={state.resumo.saldo >= 0 ? '#8b5cf6' : '#f59e0b'}>
              <StyledResumoLabel>Saldo do mês</StyledResumoLabel>
              <StyledResumoValue $color={state.resumo.saldo >= 0 ? '#8b5cf6' : '#f59e0b'}>
                {helpers.formatarValor(state.resumo.saldo)}
              </StyledResumoValue>
              <StyledResumoSub>Receitas − Despesas</StyledResumoSub>
            </StyledResumoCard>
          </StyledResumoRow>

          <StyledCalendarCard>
            <StyledWeekHeader>
              {state.diasSemana.map((d) => (
                <StyledWeekDay key={d}>{d}</StyledWeekDay>
              ))}
            </StyledWeekHeader>
            <StyledDaysGrid>
              {state.dias.map((dia, i) => {
                if (dia.dia === null) {
                  return <StyledDayCell key={`vazio-${i}`} $empty />;
                }
                const visiveis = dia.transacoes.slice(0, MAX_TX_POR_DIA);
                const restantes = dia.transacoes.length - visiveis.length;
                return (
                  <StyledDayCell
                    key={dia.data}
                    $selected={state.diaSelecionado === dia.data}
                    $isToday={dia.data === state.hoje}
                    $hasData={dia.transacoes.length > 0}
                    onClick={() => actions.selecionarDia(dia.data)}
                    data-testid={`calendario-dia-${dia.data}`}
                  >
                    <StyledDayNumber $isToday={dia.data === state.hoje}>{dia.dia}</StyledDayNumber>
                    {visiveis.map((t) => (
                      <StyledDayTx key={t.id} $color={helpers.getTipoCor(t.type)}>
                        <span>{t.description}</span>
                        <span>{helpers.formatarValor(t.amount)}</span>
                      </StyledDayTx>
                    ))}
                    {restantes > 0 && <StyledDayMore>+{restantes} mais</StyledDayMore>}
                  </StyledDayCell>
                );
              })}
            </StyledDaysGrid>
          </StyledCalendarCard>

          {state.diaSelecionado && (
            <StyledDayDetailCard>
              <StyledDayDetailTitle>
                Lançamentos de {helpers.formatarDataCurta(state.diaSelecionado)}
              </StyledDayDetailTitle>
              {state.transacoesDoDia.length === 0 ? (
                <StyledEmptyDay>Nenhum lançamento neste dia.</StyledEmptyDay>
              ) : (
                state.transacoesDoDia.map((t) => (
                  <StyledTxRow key={t.id}>
                    <StyledTxIcon $color={helpers.getTipoCor(t.type)}>
                      {t.type === 'INCOME' ? '💰' : t.type === 'EXPENSE' ? '💸' : '🔄'}
                    </StyledTxIcon>
                    <StyledTxInfo>
                      <StyledTxName>{t.description}</StyledTxName>
                      <StyledTxMeta>
                        {t.categoryName || 'Sem categoria'}
                        {t.accountName ? ` • ${t.accountName}` : ''}
                        {t.status ? ` • ${helpers.getStatusLabel(t.status)}` : ''}
                      </StyledTxMeta>
                    </StyledTxInfo>
                    <StyledTxAmount $color={helpers.getTipoCor(t.type)}>
                      {t.type === 'INCOME' ? '+' : t.type === 'EXPENSE' ? '-' : ''}{' '}
                      {helpers.formatarValor(t.amount)}
                    </StyledTxAmount>
                  </StyledTxRow>
                ))
              )}
            </StyledDayDetailCard>
          )}
        </StyledCalendarioContainer>
      </StyledCalendarioMainContent>
    </StyledCalendarioLayout>
  );
}
