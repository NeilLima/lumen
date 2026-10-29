'use client';
import type { OrcamentoDetalheProps } from '../types/OrcamentoDetalheTypes';
import { StyledOverlay, StyledModal, StyledHeader, StyledTitle, StyledClose, StyledContent, StyledIcon, StyledNome, StyledBar, StyledFill, StyledGrid, StyledItem, StyledLabel, StyledValue, StyledBadge, StyledActions, StyledButton } from '../styles/OrcamentoDetalheStyles';
export default function OrcamentoDetalheComp({ detalheCategoria, formatarValor, getStatusLabel, getStatusCor, calcularPercentual, onFecharDetalhe, onEditar }: OrcamentoDetalheProps) {
  if (!detalheCategoria) return null;
  const pct = calcularPercentual(detalheCategoria.gasto, detalheCategoria.limite);
  const cor = pct > 90 ? '#ef4444' : pct > 70 ? '#f59e0b' : '#10b981';
  return (
    <StyledOverlay $visible={!!detalheCategoria} onClick={onFecharDetalhe}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledHeader><StyledTitle>Detalhes da Categoria</StyledTitle><StyledClose onClick={onFecharDetalhe}>✕</StyledClose></StyledHeader>
        <StyledContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><StyledIcon $color={detalheCategoria.categoriaCor}>{detalheCategoria.categoriaIcone}</StyledIcon><StyledNome>{detalheCategoria.categoria}</StyledNome></div>
          <div><StyledBar><StyledFill $pct={pct} $color={cor} /></StyledBar><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', color: '#a0a0b0' }}><span>R$ {formatarValor(detalheCategoria.gasto)}</span><span>{pct}%</span><span>R$ {formatarValor(detalheCategoria.limite)}</span></div></div>
          <StyledGrid>
            <StyledItem><StyledLabel>Status</StyledLabel><StyledBadge $color={getStatusCor(detalheCategoria.status)}>{getStatusLabel(detalheCategoria.status)}</StyledBadge></StyledItem>
            <StyledItem><StyledLabel>Disponível</StyledLabel><StyledValue>R$ {formatarValor(detalheCategoria.limite - detalheCategoria.gasto)}</StyledValue></StyledItem>
          </StyledGrid>
        </StyledContent>
        <StyledActions><StyledButton $variant="secondary" onClick={onFecharDetalhe}>Fechar</StyledButton><StyledButton $variant="primary" onClick={() => onEditar(detalheCategoria)}>Editar</StyledButton></StyledActions>
      </StyledModal>
    </StyledOverlay>
  );
}
