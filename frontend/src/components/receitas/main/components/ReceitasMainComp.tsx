'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import ReceitasHeaderComp from '../../ReceitasHeader/components/ReceitasHeaderComp';
import ReceitasResumoComp from '../../ReceitasResumo/components/ReceitasResumoComp';
import ReceitasListComp from '../../ReceitasList/components/ReceitasListComp';
import ReceitasModalComp from '../../ReceitasModal/components/ReceitasModalComp';
import ReceitasDetalheComp from '../../ReceitasDetalhe/components/ReceitasDetalheComp';
import ReceitasConfirmComp from '../../ReceitasConfirm/components/ReceitasConfirmComp';
import ReceitasInfoComp from '../../ReceitasInfo/components/ReceitasInfoComp';
import { FeedbackModalComp } from '@/shared/feedback';
import { useReceitasMain } from '../utils/ReceitasMainUtils';
import {
  StyledReceitasLayout,
  StyledReceitasMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledReceitasContainer,
  StyledLoading,
} from '../styles/ReceitasMainStyles';

export default function ReceitasMainComp() {
  const { state, actions, helpers } = useReceitasMain();

  return (
    <StyledReceitasLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar} data-testid="receitas-hamburger">
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledReceitasMainContent>
        <HeaderComp />
        <StyledReceitasContainer>
          {state.isLoading && (
            <StyledLoading>Carregando receitas...</StyledLoading>
          )}
          {!state.isLoading && state.data && (
            <>
          <ReceitasHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <ReceitasResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <ReceitasListComp
            receitasFiltradas={state.receitasFiltradas}
            filtros={state.filtros}
            data={state.data}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            getRecorrenciaLabel={helpers.getRecorrenciaLabel}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirDetalhe={actions.abrirDetalhe}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <ReceitasModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            data={state.data}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarReceita={actions.salvarReceita}
          />

          <ReceitasDetalheComp
            detalheReceita={state.detalheReceita}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            getRecorrenciaLabel={helpers.getRecorrenciaLabel}
            onFecharDetalhe={actions.fecharDetalhe}
            onEditar={actions.handleEditarFromDetalhe}
          />

          <ReceitasConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <ReceitasInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />

          <FeedbackModalComp
            feedback={state.feedback}
            onFechar={actions.fecharFeedback}
          />
            </>
          )}
        </StyledReceitasContainer>
      </StyledReceitasMainContent>
    </StyledReceitasLayout>
  );
}