'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import EstoqueHeaderComp from '../../EstoqueHeader/components/EstoqueHeaderComp';
import EstoqueResumoComp from '../../EstoqueResumo/components/EstoqueResumoComp';
import EstoqueTermometroComp from '../../EstoqueTermometro/components/EstoqueTermometroComp';
import EstoqueListComp from '../../EstoqueList/components/EstoqueListComp';
import EstoqueModalComp from '../../EstoqueModal/components/EstoqueModalComp';
import EstoqueConfirmComp from '../../EstoqueConfirm/components/EstoqueConfirmComp';
import { useEstoqueUtils } from '../utils/EstoqueUtils';
import {
  StyledEstoqueLayout,
  StyledEstoqueMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledEstoqueContainer,
} from '../styles/EstoqueMainStyles';
import { EstoqueDetalheComp } from '../../EstoqueDetalhe/components/EstoqueDetalheComp';
import { EstoqueInfoComp } from '../../EstoqueInfo/components/EstoqueInfoComp';

export default function EstoqueMainComp() {
  const { state, actions, helpers } = useEstoqueUtils();

  return (
    <StyledEstoqueLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>☰</StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledEstoqueMainContent>
        <HeaderComp />
        <StyledEstoqueContainer>
          <EstoqueHeaderComp onAbrirInfo={actions.abrirInfo} onAbrirModalNovo={actions.abrirModalNovo} />

          <EstoqueResumoComp
            itens={state.data?.itens || []}
            formatarValor={helpers.formatarValor}
            getStatusCor={helpers.getStatusCor}
          />

          <EstoqueTermometroComp
            itens={state.data?.itens || []}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
          />

          <EstoqueListComp
            itensFiltrados={state.itensFiltrados}
            filtros={state.filtros}
            data={state.data || { categorias: [], locais: [] }}
            formatarValor={helpers.formatarValor}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <EstoqueModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            data={state.data || { categorias: [], locais: [] }}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarItem={actions.salvarItem}
          />

          <EstoqueConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            onCancelar={actions.cancelarExclusao}
            onConfirmar={actions.confirmarEExcluir}
          />

          <EstoqueDetalheComp
            detalheItem={state.detalheItem}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            onFecharDetalhe={actions.fecharDetalhe}
            onEditar={actions.abrirModalEditar}
          />

          <EstoqueInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledEstoqueContainer>
      </StyledEstoqueMainContent>
    </StyledEstoqueLayout>
  );
}