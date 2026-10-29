'use client';

import { useState } from 'react';
import {
  StyledIncomesCard,
  StyledIncomesHeader,
  StyledIncomesTitle,
  StyledIncomesTotal,
  StyledIncomesTable,
  StyledBadge,
  StyledActionButton,
  StyledEmptyState,
  StyledLoading,
} from '../styles/IncomesStyles';
import { useIncomes } from '../utils/IncomesUtils';
import type { Income } from '../types/IncomesTypes';

export default function IncomesComp() {
  const { state, helpers, theme } = useIncomes();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    id?: string;
    description: string;
    amount: string;
    date: string;
    categoryId: string;
    accountId: string;
    paymentMethod: string;
    notes: string;
  }>({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
    accountId: '',
    paymentMethod: '',
    notes: '',
  });

  const { incomes, total, isLoading, error } = state;
  const { createIncome, updateIncome, deleteIncome, isCreating, isUpdating, isDeleting } = helpers;

  if (isLoading) {
    return (
      <StyledLoading theme={theme}>
        <p>Carregando receitas...</p>
      </StyledLoading>
    );
  }

  if (error) {
    return (
      <StyledEmptyState theme={theme}>
        <p>Erro ao carregar receitas</p>
      </StyledEmptyState>
    );
  }

  if (incomes.length === 0) {
    return (
      <StyledEmptyState theme={theme}>
        <p>Nenhuma receita cadastrada</p>
        <p>Adicione sua primeira receita para começar</p>
      </StyledEmptyState>
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    if (!formData.description || isNaN(amount) || amount <= 0) return;

    const payload = {
      description: formData.description,
      amount,
      date: formData.date,
      categoryId: formData.categoryId || null,
      accountId: formData.accountId || null,
      paymentMethod: formData.paymentMethod || null,
      notes: formData.notes || null,
    };

    try {
      if (editingId && formData.id) {
        await updateIncome({ id: formData.id, payload });
      } else {
        await createIncome(payload);
      }
      setShowForm(false);
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
        accountId: '',
        paymentMethod: '',
        notes: '',
      });
      setEditingId(null);
    } catch {
      // Erro tratado pelo service
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir esta receita?')) return;
    try {
      await deleteIncome(id);
    } catch {
      // Erro tratado pelo service
    }
  }

  function handleEdit(income: Income) {
    setFormData({
      id: income.id,
      description: income.description,
      amount: income.amount.toString(),
      date: income.date.split('T')[0],
      categoryId: income.categoryId || '',
      accountId: income.accountId || '',
      paymentMethod: income.paymentMethod || '',
      notes: income.notes || '',
    });
    setEditingId(income.id);
    setShowForm(true);
  }

  return (
    <StyledIncomesCard theme={theme}>
      <StyledIncomesHeader theme={theme}>
        <StyledIncomesTitle theme={theme}>Minhas Receitas</StyledIncomesTitle>
        <StyledIncomesTotal theme={theme}>
          {helpers.formatCurrency(total)}
        </StyledIncomesTotal>
      </StyledIncomesHeader>

      {showForm && (
        <form onSubmit={handleSave} style={{ marginBottom: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: theme.textSecondary }}>Descrição</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ex: Salário mensal"
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${theme.borderColor}`, background: theme.bgInput, color: theme.textPrimary }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: theme.textSecondary }}>Valor (R$)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0,00"
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${theme.borderColor}`, background: theme.bgInput, color: theme.textPrimary }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: theme.textSecondary }}>Data</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${theme.borderColor}`, background: theme.bgInput, color: theme.textPrimary }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: theme.textSecondary }}>Categoria</label>
            <input
              type="text"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              placeholder="Ex: Salário"
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${theme.borderColor}`, background: theme.bgInput, color: theme.textPrimary }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: theme.textSecondary }}>Método de Pagamento</label>
            <input
              type="text"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              placeholder="Ex: Pix"
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${theme.borderColor}`, background: theme.bgInput, color: theme.textPrimary }}
            />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: theme.textSecondary }}>Observações</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações adicionais..."
              style={{ width: '100%', padding: 8, borderRadius: 4, border: `1px solid ${theme.borderColor}`, background: theme.bgInput, color: theme.textPrimary }}
            />
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              style={{ flex: 1, padding: 10, borderRadius: 4, border: 'none', background: theme.primaryColor, color: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              {editingId ? 'Atualizar' : 'Adicionar Receita'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ padding: 10, borderRadius: 4, border: `1px solid ${theme.borderColor}`, background: 'transparent', color: theme.textSecondary, cursor: 'pointer' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <StyledIncomesTable theme={theme}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Categoria</th>
            <th>Método</th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id}>
              <td>{income.description}</td>
              <td>{helpers.formatCurrency(income.amount)}</td>
              <td>{helpers.formatDate(income.date)}</td>
              <td>
                <StyledBadge theme={theme} $color={income.categoryColor || '#8b5cf6'}>
                  {income.categoryName || '—'}
                </StyledBadge>
              </td>
              <td>{income.paymentMethod || '—'}</td>
              <td className="actions">
                <StyledActionButton
                  theme={theme}
                  onClick={() => handleEdit(income)}
                  data-testid={`edit-income-${income.id}`}
                >
                  ✏️
                </StyledActionButton>
                <StyledActionButton
                  theme={theme}
                  className="delete"
                  onClick={() => handleDelete(income.id)}
                  data-testid={`delete-income-${income.id}`}
                >
                  🗑️
                </StyledActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledIncomesTable>

      <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
        <button
          onClick={() => {
            setFormData({
              description: '',
              amount: '',
              date: new Date().toISOString().split('T')[0],
              categoryId: '',
              accountId: '',
              paymentMethod: '',
              notes: '',
            });
            setEditingId(null);
            setShowForm(true);
          }}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 4,
            border: `1px solid ${theme.primaryColor}`,
            background: 'transparent',
            color: theme.primaryColor,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          + Nova Receita
        </button>
      </div>
    </StyledIncomesCard>
  );
}