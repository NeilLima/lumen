'use client';
import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import OrcamentoHeaderComp from '../../OrcamentoHeader/components/OrcamentoHeaderComp';
import OrcamentoResumoComp from '../../OrcamentoResumo/components/OrcamentoResumoComp';
import OrcamentoListComp from '../../OrcamentoList/components/OrcamentoListComp';
import OrcamentoChartComp from '../../OrcamentoChart/components/OrcamentoChartComp';
import OrcamentoModalComp from '../../OrcamentoModal/components/OrcamentoModalComp';
import OrcamentoDetalheComp from '../../OrcamentoDetalhe/components/OrcamentoDetalheComp';
import OrcamentoConfirmComp from '../../OrcamentoConfirm/components/OrcamentoConfirmComp';
import OrcamentoInfoComp from '../../OrcamentoInfo/components/OrcamentoInfoComp';
import { useOrcamentoMain } from '../utils/OrcamentoMainUtils';
import { StyledOrcamentoLayout, StyledOrcamentoMainContent, StyledHamburgerButton, StyledOverlay, StyledOrcamentoContainer, StyledLoading, StyledGraficoButton } from '../styles/OrcamentoMainStyles';

export default function OrcamentoMainComp() {
  const { state, actions, helpers, graficosRef } = useOrcamentoMain();
  if (state.isLoading) return <StyledOrcamentoLayout><StyledOrcamentoMainContent><StyledOrcamentoContainer><StyledLoading>Carregando orçamento...</StyledLoading></StyledOrcamentoContainer></StyledOrcamentoMainContent></StyledOrcamentoLayout>;
  if (!state.data) return null;
  return (
    <StyledOrcamentoLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>☰</StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledOrcamentoMainContent>
        <HeaderComp />
        <StyledOrcamentoContainer>
          <OrcamentoHeaderComp onAbrirInfo={actions.abrirInfo} onAbrirModalNovo={actions.abrirModalNovo} />
          <OrcamentoResumoComp resumo={state.data.resumo} formatarValor={helpers.formatarValor} />
          <OrcamentoListComp
            categoriasFiltradas={state.categoriasFiltradas} filtros={state.filtros} data={state.data}
            formatarValor={helpers.formatarValor} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} calcularPercentual={helpers.calcularPercentual}
            onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />
          <StyledGraficoButton onClick={actions.toggleGraficos}>
            {state.mostrarGraficos ? '📊 Fechar Gráficos' : '📊 Gerar Gráficos'}
          </StyledGraficoButton>
          {state.mostrarGraficos && (
            <div ref={graficosRef}>
              <OrcamentoChartComp categorias={state.data.categorias} formatarValor={helpers.formatarValor} />
            </div>
          )}
          <OrcamentoModalComp modalAberto={state.modalAberto} editandoId={state.editandoId} formData={state.formData} data={state.data} onFecharModal={actions.fecharModal} onAtualizarForm={actions.atualizarForm} onSalvarCategoria={actions.salvarCategoria} />
          <OrcamentoDetalheComp detalheCategoria={state.detalheCategoria} formatarValor={helpers.formatarValor} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} calcularPercentual={helpers.calcularPercentual} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe} />
          <OrcamentoConfirmComp exclusaoPendente={state.exclusaoPendente} formatarValor={helpers.formatarValor} onCancelarExclusao={actions.cancelarExclusao} onConfirmarEExcluir={actions.confirmarEExcluir} />
          <OrcamentoInfoComp modalInfoAberto={state.modalInfoAberto} onFecharInfo={actions.fecharInfo} />
        </StyledOrcamentoContainer>
      </StyledOrcamentoMainContent>
    </StyledOrcamentoLayout>
  );
}