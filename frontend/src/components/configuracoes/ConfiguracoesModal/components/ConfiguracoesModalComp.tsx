'use client';

import type { ConfiguracoesModalProps } from '../types/ConfiguracoesModalTypes';
import {
  StyledModalOverlay,
  StyledModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledForm,
  StyledFormGroup,
  StyledFormRow,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  StyledFormSelect,
  StyledModalActions,
  StyledButton,
} from '../styles/ConfiguracoesModalStyles';

export default function ConfiguracoesModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarConfiguracao,
}: ConfiguracoesModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Configuracao' : 'Nova Configuracao'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome da Configuração *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Tema, Idioma..."
                
                
                
                
                value={formData.nome}
                onChange={e => onAtualizarForm('nome', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Categoria</StyledLabel>
              <StyledFormSelect
                value={formData.categoria}
                onChange={e => onAtualizarForm('categoria', e.target.value)}
              >
              <option value="aparencia">Aparência</option>
              <option value="idioma">Idioma</option>
              <option value="moeda">Moeda</option>
              <option value="backup">Backup</option>
              <option value="seguranca">Segurança</option>
              <option value="notificacoes">Notificações</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Valor *</StyledLabel>
            <StyledInput
              type="text" placeholder="Ex: Escuro, Português..."
              value={formData.valor}
              onChange={e => onAtualizarForm('valor', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Descrição</StyledLabel>
            <StyledTextarea
              placeholder="Adicione uma descrição para esta configuração..."
              value={formData.descricao}
              onChange={e => onAtualizarForm('descricao', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarConfiguracao}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Configuracao'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
