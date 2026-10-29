'use client';
import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import TransferenciasHeaderComp from '../../TransferenciasHeader/components/TransferenciasHeaderComp';
import TransferenciasResumoComp from '../../TransferenciasResumo/components/TransferenciasResumoComp';
import TransferenciasListComp from '../../TransferenciasList/components/TransferenciasListComp';
import TransferenciasModalComp from '../../TransferenciasModal/components/TransferenciasModalComp';
import TransferenciasDetalheComp from '../../TransferenciasDetalhe/components/TransferenciasDetalheComp';
import TransferenciasConfirmComp from '../../TransferenciasConfirm/components/TransferenciasConfirmComp';
import TransferenciasInfoComp from '../../TransferenciasInfo/components/TransferenciasInfoComp';
import { useTransferenciasMain } from '../utils/TransferenciasMainUtils';
import { StyledLayout, StyledContent, StyledHamburger, StyledOverlay, StyledContainer, StyledLoading } from '../styles/TransferenciasMainStyles';
export default function TransferenciasMainComp() {
  const { state, actions, helpers } = useTransferenciasMain();
  if (state.isLoading) return <StyledLayout><StyledContent><StyledContainer><StyledLoading>Carregando...</StyledLoading></StyledContainer></StyledContent></StyledLayout>;
  if (!state.data) return null;
  return (
    <StyledLayout>
      <StyledHamburger onClick={actions.toggleSidebar}>☰</StyledHamburger>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledContent>
        <HeaderComp />
        <StyledContainer>
          <TransferenciasHeaderComp onAbrirInfo={actions.abrirInfo} onAbrirModalNovo={actions.abrirModalNovo} />
          <TransferenciasResumoComp resumo={state.data.resumo} formatarValor={helpers.formatarValor} />
          <TransferenciasListComp transferenciasFiltradas={state.transferenciasFiltradas} filtros={state.filtros} data={state.data} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao} />
          <TransferenciasModalComp modalAberto={state.modalAberto} editandoId={state.editandoId} formData={state.formData} data={state.data} onFecharModal={actions.fecharModal} onAtualizarForm={actions.atualizarForm} onSalvarTransferencia={actions.salvarTransferencia} />
          <TransferenciasDetalheComp detalheTransferencia={state.detalheTransferencia} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe} />
          <TransferenciasConfirmComp exclusaoPendente={state.exclusaoPendente} formatarValor={helpers.formatarValor} onCancelarExclusao={actions.cancelarExclusao} onConfirmarEExcluir={actions.confirmarEExcluir} />
          <TransferenciasInfoComp modalInfoAberto={state.modalInfoAberto} onFecharInfo={actions.fecharInfo} />
        </StyledContainer>
      </StyledContent>
    </StyledLayout>
  );
}
