#!/usr/bin/env python3
"""
Gerador de Páginas - Lumen
Gera todas as páginas faltantes seguindo o padrão das páginas existentes (despesas, receitas, dívidas).

Páginas geradas:
1. Empréstimos
2. Investimentos
3. Assinaturas
4. Relatórios
5. Caridade Financeira
6. Categorias
7. Notificações
8. Configurações
9. Ajuda e Suporte

Uso: python gerar_paginas.py
"""

import os
import json
from pathlib import Path

# ============================================
# CONFIGURAÇÃO DAS PÁGINAS
# ============================================
PAGINAS = [
    {
        "nome": "Emprestimos",
        "pasta": "emprestimos",
        "titulo": "Empréstimos",
        "subtitulo": "Gerencie empréstimos feitos e recebidos",
        "emoji": "🏦",
        "item_singular": "Emprestimo",
        "item_plural": "emprestimos",
        "item_plural_display": "empréstimos",
        "campo_principal": "nome",
        "campo_valor": "valor",
        "campo_data": "dataVencimento",
        "campo_status": "situacao",
        "status_labels": {"em_dia": "Em Dia", "atrasada": "Atrasada", "quitada": "Quitada"},
        "status_cores": {"em_dia": "#3b82f6", "atrasada": "#ef4444", "quitada": "#10b981"},
        "tem_progresso": True,
        "campo_parcelas": "parcelas",
        "campo_parcelas_pagas": "parcelasPagas",
        "campos": [
            {"nome": "nome", "label": "Nome *", "tipo": "text", "placeholder": "Ex: Empréstimo Banco X..."},
            {"nome": "tipo", "label": "Tipo", "tipo": "select", "opcoes": [
                {"v": "feito", "l": "Feito por mim"}, {"v": "recebido", "l": "Recebido por mim"}
            ]},
            {"nome": "valor", "label": "Valor *", "tipo": "number", "placeholder": "0,00"},
            {"nome": "juros", "label": "Juros (%)", "tipo": "number", "placeholder": "0"},
            {"nome": "parcelas", "label": "Parcelas", "tipo": "number", "placeholder": "1"},
            {"nome": "parcelasPagas", "label": "Parcelas Pagas", "tipo": "number", "placeholder": "0"},
            {"nome": "dataVencimento", "label": "Data de Vencimento *", "tipo": "date"},
            {"nome": "situacao", "label": "Situação", "tipo": "select", "opcoes": [
                {"v": "em_dia", "l": "Em Dia"}, {"v": "atrasada", "l": "Atrasada"}, {"v": "quitada", "l": "Quitada"}
            ]},
            {"nome": "observacoes", "label": "Observações", "tipo": "textarea", "placeholder": "Adicione observações sobre este empréstimo..."},
        ],
        "filtros": [
            {"nome": "situacao", "label": "Todas situações", "opcoes": [
                {"v": "em_dia", "l": "Em Dia"}, {"v": "atrasada", "l": "Atrasada"}, {"v": "quitada", "l": "Quitada"}
            ]},
            {"nome": "tipo", "label": "Todos tipos", "opcoes": [
                {"v": "feito", "l": "Feito por mim"}, {"v": "recebido", "l": "Recebido por mim"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Empréstimos", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalEmprestimos", "prefixo": "", "tipo_calc": "count"},
            {"label": "Valor Total", "cor": "#ef4444", "emoji": "💰", "campo": "totalValor", "prefixo": "R$ ", "tipo_calc": "sum_valor"},
            {"label": "Atrasado", "cor": "#f59e0b", "emoji": "⚠️", "campo": "totalAtrasado", "prefixo": "R$ ", "tipo_calc": "sum_status_atrasada"},
            {"label": "Quitado", "cor": "#10b981", "emoji": "✅", "campo": "totalQuitado", "prefixo": "R$ ", "tipo_calc": "sum_status_quitada"},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de empréstimos, valor total, atrasado e quitado.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre empréstimos específicos por nome, situação ou tipo.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um empréstimo.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer empréstimo a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova empréstimos com confirmação de segurança.",
            "📈 <strong>Progresso de Parcelas:</strong> Acompanhe o percentual de parcelas pagas de cada empréstimo.",
            "⚡ <strong>Situação:</strong> Saiba se o empréstimo está em dia, atrasado ou quitado.",
        ],
        "mock_items": [
            {"id": "1", "nome": "Empréstimo Pessoal Banco do Brasil", "tipo": "recebido", "valor": 15000, "parcelas": 24, "parcelasPagas": 8, "juros": 1.5, "dataVencimento": "2026-08-15", "situacao": "em_dia", "categoria": "Banco", "categoriaCor": "#3b82f6", "categoriaIcone": "🏦", "observacoes": "Empréstimo pessoal para reforma"},
            {"id": "2", "nome": "Empréstimo para João", "tipo": "feito", "valor": 5000, "parcelas": 10, "parcelasPagas": 3, "juros": 0, "dataVencimento": "2026-07-20", "situacao": "atrasada", "categoria": "Pessoa", "categoriaCor": "#f59e0b", "categoriaIcone": "👤"},
            {"id": "3", "nome": "Financiamento Carro", "tipo": "recebido", "valor": 45000, "parcelas": 48, "parcelasPagas": 48, "juros": 1.2, "dataVencimento": "2026-06-30", "situacao": "quitada", "categoria": "Banco", "categoriaCor": "#3b82f6", "categoriaIcone": "🏦"},
        ],
    },
    {
        "nome": "Investimentos",
        "pasta": "investimentos",
        "titulo": "Investimentos",
        "subtitulo": "Acompanhe seus investimentos e rentabilidade",
        "emoji": "📈",
        "item_singular": "Investimento",
        "item_plural": "investimentos",
        "item_plural_display": "investimentos",
        "campo_principal": "nome",
        "campo_valor": "valorAtual",
        "campo_data": "dataAplicacao",
        "campo_status": "status",
        "status_labels": {"ativo": "Ativo", "resgatado": "Resgatado", "perda": "Perda"},
        "status_cores": {"ativo": "#10b981", "resgatado": "#3b82f6", "perda": "#ef4444"},
        "tem_progresso": False,
        "campos": [
            {"nome": "nome", "label": "Nome *", "tipo": "text", "placeholder": "Ex: Tesouro Direto, CDB..."},
            {"nome": "tipo", "label": "Tipo", "tipo": "select", "opcoes": [
                {"v": "cdb", "l": "CDB"}, {"v": "tesouro", "l": "Tesouro"}, {"v": "acoes", "l": "Ações"}, {"v": "fundos", "l": "Fundos"}, {"v": "cripto", "l": "Criptomoedas"}
            ]},
            {"nome": "valorAplicado", "label": "Valor Aplicado *", "tipo": "number", "placeholder": "0,00"},
            {"nome": "valorAtual", "label": "Valor Atual *", "tipo": "number", "placeholder": "0,00"},
            {"nome": "dataAplicacao", "label": "Data de Aplicação *", "tipo": "date"},
            {"nome": "status", "label": "Status", "tipo": "select", "opcoes": [
                {"v": "ativo", "l": "Ativo"}, {"v": "resgatado", "l": "Resgatado"}, {"v": "perda", "l": "Perda"}
            ]},
            {"nome": "observacoes", "label": "Observações", "tipo": "textarea", "placeholder": "Adicione observações sobre este investimento..."},
        ],
        "filtros": [
            {"nome": "tipo", "label": "Todos tipos", "opcoes": [
                {"v": "cdb", "l": "CDB"}, {"v": "tesouro", "l": "Tesouro"}, {"v": "acoes", "l": "Ações"}, {"v": "fundos", "l": "Fundos"}, {"v": "cripto", "l": "Criptomoedas"}
            ]},
            {"nome": "status", "label": "Todos status", "opcoes": [
                {"v": "ativo", "l": "Ativo"}, {"v": "resgatado", "l": "Resgatado"}, {"v": "perda", "l": "Perda"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Investimentos", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalInvestimentos", "prefixo": "", "tipo_calc": "count"},
            {"label": "Valor Aplicado", "cor": "#3b82f6", "emoji": "💵", "campo": "totalAplicado", "prefixo": "R$ ", "tipo_calc": "sum_campo", "campo_calc": "valorAplicado"},
            {"label": "Valor Atual", "cor": "#10b981", "emoji": "💰", "campo": "totalAtual", "prefixo": "R$ ", "tipo_calc": "sum_campo", "campo_calc": "valorAtual"},
            {"label": "Lucro/Prejuízo", "cor": "#f59e0b", "emoji": "📈", "campo": "lucroPrejuizo", "prefixo": "R$ ", "tipo_calc": "lucro_prejuizo"},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de investimentos, valor aplicado, atual e lucro/prejuízo.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre investimentos específicos por nome, tipo ou status.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um investimento.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer investimento a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova investimentos com confirmação de segurança.",
            "📈 <strong>Rentabilidade:</strong> Acompanhe o desempenho de cada investimento.",
            "⚡ <strong>Status:</strong> Saiba se o investimento está ativo, resgatado ou em perda.",
        ],
        "mock_items": [
            {"id": "1", "nome": "Tesouro Selic 2029", "tipo": "tesouro", "valorAplicado": 10000, "valorAtual": 11200, "dataAplicacao": "2025-01-15", "status": "ativo", "categoria": "Renda Fixa", "categoriaCor": "#3b82f6", "categoriaIcone": "🏛️", "observacoes": "Tesouro direto pós-fixado"},
            {"id": "2", "nome": "CDB Banco Inter 120%", "tipo": "cdb", "valorAplicado": 5000, "valorAtual": 5600, "dataAplicacao": "2025-03-10", "status": "ativo", "categoria": "Renda Fixa", "categoriaCor": "#3b82f6", "categoriaIcone": "🏦"},
            {"id": "3", "nome": "ITSA4 - Itaúsa", "tipo": "acoes", "valorAplicado": 8000, "valorAtual": 9200, "dataAplicacao": "2024-11-20", "status": "ativo", "categoria": "Renda Variável", "categoriaCor": "#f59e0b", "categoriaIcone": "📊"},
            {"id": "4", "nome": "Bitcoin", "tipo": "cripto", "valorAplicado": 3000, "valorAtual": 4500, "dataAplicacao": "2025-06-01", "status": "ativo", "categoria": "Cripto", "categoriaCor": "#ef4444", "categoriaIcone": "₿"},
        ],
    },
    {
        "nome": "Assinaturas",
        "pasta": "assinaturas",
        "titulo": "Assinaturas",
        "subtitulo": "Gerencie suas assinaturas e cobranças recorrentes",
        "emoji": "🔄",
        "item_singular": "Assinatura",
        "item_plural": "assinaturas",
        "item_plural_display": "assinaturas",
        "campo_principal": "nome",
        "campo_valor": "valor",
        "campo_data": "proximaCobranca",
        "campo_status": "status",
        "status_labels": {"ativa": "Ativa", "pausada": "Pausada", "cancelada": "Cancelada"},
        "status_cores": {"ativa": "#10b981", "pausada": "#f59e0b", "cancelada": "#ef4444"},
        "tem_progresso": False,
        "campos": [
            {"nome": "nome", "label": "Nome *", "tipo": "text", "placeholder": "Ex: Netflix, Spotify..."},
            {"nome": "categoria", "label": "Categoria", "tipo": "select", "opcoes": [
                {"v": "Streaming", "l": "Streaming"}, {"v": "Música", "l": "Música"}, {"v": "Produtividade", "l": "Produtividade"}, {"v": "Saúde", "l": "Saúde"}, {"v": "Internet", "l": "Internet"}, {"v": "Telefone", "l": "Telefone"}, {"v": "Outros", "l": "Outros"}
            ]},
            {"nome": "valor", "label": "Valor *", "tipo": "number", "placeholder": "0,00"},
            {"nome": "ciclo", "label": "Ciclo de Cobrança", "tipo": "select", "opcoes": [
                {"v": "mensal", "l": "Mensal"}, {"v": "anual", "l": "Anual"}, {"v": "trimestral", "l": "Trimestral"}
            ]},
            {"nome": "proximaCobranca", "label": "Próxima Cobrança *", "tipo": "date"},
            {"nome": "status", "label": "Status", "tipo": "select", "opcoes": [
                {"v": "ativa", "l": "Ativa"}, {"v": "pausada", "l": "Pausada"}, {"v": "cancelada", "l": "Cancelada"}
            ]},
            {"nome": "observacoes", "label": "Observações", "tipo": "textarea", "placeholder": "Adicione observações sobre esta assinatura..."},
        ],
        "filtros": [
            {"nome": "categoria", "label": "Todas categorias", "opcoes": [
                {"v": "Streaming", "l": "Streaming"}, {"v": "Música", "l": "Música"}, {"v": "Produtividade", "l": "Produtividade"}, {"v": "Saúde", "l": "Saúde"}, {"v": "Internet", "l": "Internet"}, {"v": "Telefone", "l": "Telefone"}, {"v": "Outros", "l": "Outros"}
            ]},
            {"nome": "status", "label": "Todos status", "opcoes": [
                {"v": "ativa", "l": "Ativa"}, {"v": "pausada", "l": "Pausada"}, {"v": "cancelada", "l": "Cancelada"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Assinaturas", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalAssinaturas", "prefixo": "", "tipo_calc": "count"},
            {"label": "Gasto Mensal", "cor": "#ef4444", "emoji": "💸", "campo": "totalMensal", "prefixo": "R$ ", "tipo_calc": "sum_valor"},
            {"label": "Gasto Anual", "cor": "#f59e0b", "emoji": "📅", "campo": "totalAnual", "prefixo": "R$ ", "tipo_calc": "sum_valor_x12"},
            {"label": "Ativas", "cor": "#10b981", "emoji": "✅", "campo": "totalAtivas", "prefixo": "", "tipo_calc": "count_status_ativa"},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de assinaturas, gasto mensal, anual e ativas.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre assinaturas específicas por nome, categoria ou status.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma assinatura.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer assinatura a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova assinaturas com confirmação de segurança.",
            "📅 <strong>Próxima Cobrança:</strong> Acompanhe quando será a próxima cobrança de cada assinatura.",
            "⚡ <strong>Status:</strong> Saiba se a assinatura está ativa, pausada ou cancelada.",
        ],
        "mock_items": [
            {"id": "1", "nome": "Netflix", "categoria": "Streaming", "valor": 55.90, "ciclo": "mensal", "proximaCobranca": "2026-08-05", "status": "ativa", "categoriaCor": "#ef4444", "categoriaIcone": "🎬"},
            {"id": "2", "nome": "Spotify", "categoria": "Música", "valor": 21.90, "ciclo": "mensal", "proximaCobranca": "2026-08-12", "status": "ativa", "categoriaCor": "#10b981", "categoriaIcone": "🎵"},
            {"id": "3", "nome": "ChatGPT Plus", "categoria": "Produtividade", "valor": 110, "ciclo": "mensal", "proximaCobranca": "2026-08-20", "status": "ativa", "categoriaCor": "#3b82f6", "categoriaIcone": "🤖"},
            {"id": "4", "nome": "Academia SmartFit", "categoria": "Saúde", "valor": 99.90, "ciclo": "mensal", "proximaCobranca": "2026-08-01", "status": "ativa", "categoriaCor": "#f59e0b", "categoriaIcone": "💪"},
            {"id": "5", "nome": "Amazon Prime", "categoria": "Streaming", "valor": 19.90, "ciclo": "mensal", "proximaCobranca": "2026-08-15", "status": "pausada", "categoriaCor": "#ef4444", "categoriaIcone": "📦"},
        ],
    },
    {
        "nome": "Relatorios",
        "pasta": "relatorios",
        "titulo": "Relatórios",
        "subtitulo": "Análise completa da sua vida financeira",
        "emoji": "📊",
        "item_singular": "Relatorio",
        "item_plural": "relatorios",
        "item_plural_display": "relatórios",
        "campo_principal": "nome",
        "campo_valor": "valor",
        "campo_data": "dataInicio",
        "campo_status": "status",
        "status_labels": {"gerado": "Gerado", "pendente": "Pendente"},
        "status_cores": {"gerado": "#10b981", "pendente": "#f59e0b"},
        "tem_progresso": False,
        "campos": [
            {"nome": "nome", "label": "Nome *", "tipo": "text", "placeholder": "Ex: Relatório Mensal..."},
            {"nome": "tipo", "label": "Tipo", "tipo": "select", "opcoes": [
                {"v": "receitas", "l": "Receitas"}, {"v": "despesas", "l": "Despesas"}, {"v": "fluxo", "l": "Fluxo de Caixa"}, {"v": "patrimonio", "l": "Patrimônio"}, {"v": "cartoes", "l": "Cartões"}, {"v": "investimentos", "l": "Investimentos"}, {"v": "categorias", "l": "Categorias"}
            ]},
            {"nome": "periodo", "label": "Período", "tipo": "select", "opcoes": [
                {"v": "mensal", "l": "Mensal"}, {"v": "anual", "l": "Anual"}
            ]},
            {"nome": "dataInicio", "label": "Data Início *", "tipo": "date"},
            {"nome": "dataFim", "label": "Data Fim *", "tipo": "date"},
            {"nome": "observacoes", "label": "Observações", "tipo": "textarea", "placeholder": "Adicione observações sobre este relatório..."},
        ],
        "filtros": [
            {"nome": "tipo", "label": "Todos tipos", "opcoes": [
                {"v": "receitas", "l": "Receitas"}, {"v": "despesas", "l": "Despesas"}, {"v": "fluxo", "l": "Fluxo de Caixa"}, {"v": "patrimonio", "l": "Patrimônio"}, {"v": "cartoes", "l": "Cartões"}, {"v": "investimentos", "l": "Investimentos"}, {"v": "categorias", "l": "Categorias"}
            ]},
            {"nome": "periodo", "label": "Todos períodos", "opcoes": [
                {"v": "mensal", "l": "Mensal"}, {"v": "anual", "l": "Anual"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Relatórios", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalRelatorios", "prefixo": "", "tipo_calc": "count"},
            {"label": "Receitas", "cor": "#10b981", "emoji": "💰", "campo": "totalReceitas", "prefixo": "R$ ", "tipo_calc": "constante", "valor": 8500},
            {"label": "Despesas", "cor": "#ef4444", "emoji": "💸", "campo": "totalDespesas", "prefixo": "R$ ", "tipo_calc": "constante", "valor": 4200},
            {"label": "Saldo", "cor": "#3b82f6", "emoji": "📈", "campo": "saldo", "prefixo": "R$ ", "tipo_calc": "constante", "valor": 4300},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de relatórios, receitas, despesas e saldo.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre relatórios específicos por nome, tipo ou período.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um relatório.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer relatório a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova relatórios com confirmação de segurança.",
            "📅 <strong>Período:</strong> Defina o período de análise (mensal ou anual).",
            "📤 <strong>Exportação:</strong> Exporte relatórios em PDF ou Excel.",
        ],
        "mock_items": [
            {"id": "1", "nome": "Relatório de Receitas - Julho 2026", "tipo": "receitas", "periodo": "mensal", "dataInicio": "2026-07-01", "dataFim": "2026-07-31", "categoria": "Receitas", "categoriaCor": "#10b981", "categoriaIcone": "💰", "observacoes": "Análise de receitas do mês"},
            {"id": "2", "nome": "Relatório de Despesas - Julho 2026", "tipo": "despesas", "periodo": "mensal", "dataInicio": "2026-07-01", "dataFim": "2026-07-31", "categoria": "Despesas", "categoriaCor": "#ef4444", "categoriaIcone": "💸"},
            {"id": "3", "nome": "Fluxo de Caixa - 2026", "tipo": "fluxo", "periodo": "anual", "dataInicio": "2026-01-01", "dataFim": "2026-12-31", "categoria": "Fluxo", "categoriaCor": "#3b82f6", "categoriaIcone": "📊"},
        ],
    },
    {
        "nome": "Caridade",
        "pasta": "caridade",
        "titulo": "Caridade Financeira",
        "subtitulo": "Gerencie suas doações e contribuições",
        "emoji": "❤️",
        "item_singular": "Caridade",
        "item_plural": "caridades",
        "item_plural_display": "doações",
        "campo_principal": "nome",
        "campo_valor": "valor",
        "campo_data": "data",
        "campo_status": "status",
        "status_labels": {"realizada": "Realizada", "pendente": "Pendente"},
        "status_cores": {"realizada": "#10b981", "pendente": "#f59e0b"},
        "tem_progresso": False,
        "campos": [
            {"nome": "nome", "label": "Nome *", "tipo": "text", "placeholder": "Ex: Doação para ONG..."},
            {"nome": "tipo", "label": "Tipo", "tipo": "select", "opcoes": [
                {"v": "unica", "l": "Única"}, {"v": "recorrente", "l": "Recorrente"}
            ]},
            {"nome": "valor", "label": "Valor *", "tipo": "number", "placeholder": "0,00"},
            {"nome": "instituicao", "label": "Instituição", "tipo": "text", "placeholder": "Ex: ONG, Igreja..."},
            {"nome": "data", "label": "Data *", "tipo": "date"},
            {"nome": "status", "label": "Status", "tipo": "select", "opcoes": [
                {"v": "realizada", "l": "Realizada"}, {"v": "pendente", "l": "Pendente"}
            ]},
            {"nome": "observacoes", "label": "Observações", "tipo": "textarea", "placeholder": "Adicione observações sobre esta doação..."},
        ],
        "filtros": [
            {"nome": "tipo", "label": "Todos tipos", "opcoes": [
                {"v": "unica", "l": "Única"}, {"v": "recorrente", "l": "Recorrente"}
            ]},
            {"nome": "status", "label": "Todos status", "opcoes": [
                {"v": "realizada", "l": "Realizada"}, {"v": "pendente", "l": "Pendente"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Doações", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalDoacoes", "prefixo": "", "tipo_calc": "count"},
            {"label": "Valor Total", "cor": "#ef4444", "emoji": "💰", "campo": "totalValor", "prefixo": "R$ ", "tipo_calc": "sum_valor"},
            {"label": "Realizadas", "cor": "#10b981", "emoji": "✅", "campo": "totalRealizadas", "prefixo": "", "tipo_calc": "count_status_realizada"},
            {"label": "Pendentes", "cor": "#f59e0b", "emoji": "⏳", "campo": "totalPendentes", "prefixo": "", "tipo_calc": "count_status_pendente"},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de doações, valor total, realizadas e pendentes.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre doações específicas por nome, tipo ou status.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma doação.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer doação a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova doações com confirmação de segurança.",
            "❤️ <strong>Instituição:</strong> Registre a instituição beneficiada.",
            "⚡ <strong>Status:</strong> Saiba se a doação foi realizada ou está pendente.",
        ],
        "mock_items": [
            {"id": "1", "nome": "Doação Mensal ONG Amor", "tipo": "recorrente", "valor": 100, "instituicao": "ONG Amor", "data": "2026-07-15", "status": "realizada", "categoria": "Social", "categoriaCor": "#ef4444", "categoriaIcone": "❤️"},
            {"id": "2", "nome": "Doação Igreja", "tipo": "unica", "valor": 50, "instituicao": "Igreja São João", "data": "2026-07-10", "status": "realizada", "categoria": "Religiosa", "categoriaCor": "#8b5cf6", "categoriaIcone": "⛪"},
            {"id": "3", "nome": "Contribuição Abrigo Animal", "tipo": "recorrente", "valor": 80, "instituicao": "Abrigo Animal", "data": "2026-08-01", "status": "pendente", "categoria": "Animal", "categoriaCor": "#f59e0b", "categoriaIcone": "🐾"},
        ],
    },
    {
        "nome": "Categorias",
        "pasta": "categorias",
        "titulo": "Categorias",
        "subtitulo": "Organize suas categorias financeiras",
        "emoji": "🏷️",
        "item_singular": "Categoria",
        "item_plural": "categorias",
        "item_plural_display": "categorias",
        "campo_principal": "nome",
        "campo_valor": "valor",
        "campo_data": "data",
        "campo_status": "tipo",
        "status_labels": {"despesa": "Despesa", "receita": "Receita", "ambos": "Ambos"},
        "status_cores": {"despesa": "#ef4444", "receita": "#10b981", "ambos": "#3b82f6"},
        "tem_progresso": False,
        "campos": [
            {"nome": "nome", "label": "Nome *", "tipo": "text", "placeholder": "Ex: Moradia, Alimentação..."},
            {"nome": "icone", "label": "Ícone (Emoji) *", "tipo": "text", "placeholder": "Ex: 🏠, 🛒..."},
            {"nome": "cor", "label": "Cor *", "tipo": "text", "placeholder": "Ex: #8b5cf6"},
            {"nome": "tipo", "label": "Tipo", "tipo": "select", "opcoes": [
                {"v": "despesa", "l": "Despesa"}, {"v": "receita", "l": "Receita"}, {"v": "ambos", "l": "Ambos"}
            ]},
            {"nome": "descricao", "label": "Descrição", "tipo": "textarea", "placeholder": "Adicione uma descrição para esta categoria..."},
        ],
        "filtros": [
            {"nome": "tipo", "label": "Todos tipos", "opcoes": [
                {"v": "despesa", "l": "Despesa"}, {"v": "receita", "l": "Receita"}, {"v": "ambos", "l": "Ambos"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Categorias", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalCategorias", "prefixo": "", "tipo_calc": "count"},
            {"label": "Despesas", "cor": "#ef4444", "emoji": "💸", "campo": "totalDespesas", "prefixo": "", "tipo_calc": "count_tipo_despesa"},
            {"label": "Receitas", "cor": "#10b981", "emoji": "💰", "campo": "totalReceitas", "prefixo": "", "tipo_calc": "count_tipo_receita"},
            {"label": "Ambos", "cor": "#3b82f6", "emoji": "🔄", "campo": "totalAmbos", "prefixo": "", "tipo_calc": "count_tipo_ambos"},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de categorias, despesas, receitas e ambos.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre categorias específicas por nome ou tipo.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma categoria.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer categoria a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova categorias com confirmação de segurança.",
            "🏷️ <strong>Ícone e Cor:</strong> Personalize cada categoria com ícone e cor.",
            "⚡ <strong>Tipo:</strong> Defina se a categoria é para despesa, receita ou ambos.",
        ],
        "mock_items": [
            {"id": "1", "nome": "Moradia", "icone": "🏠", "cor": "#8b5cf6", "tipo": "despesa", "descricao": "Despesas com casa, aluguel, contas", "categoria": "Despesa", "categoriaCor": "#8b5cf6", "categoriaIcone": "🏠"},
            {"id": "2", "nome": "Alimentação", "icone": "🛒", "cor": "#10b981", "tipo": "despesa", "descricao": "Supermercado e alimentação", "categoria": "Despesa", "categoriaCor": "#10b981", "categoriaIcone": "🛒"},
            {"id": "3", "nome": "Salário", "icone": "💰", "cor": "#10b981", "tipo": "receita", "descricao": "Renda mensal", "categoria": "Receita", "categoriaCor": "#10b981", "categoriaIcone": "💰"},
            {"id": "4", "nome": "Transporte", "icone": "🚗", "cor": "#3b82f6", "tipo": "ambos", "descricao": "Combustível, uber, manutenção", "categoria": "Ambos", "categoriaCor": "#3b82f6", "categoriaIcone": "🚗"},
        ],
    },
    {
        "nome": "Notificacoes",
        "pasta": "notificacoes",
        "titulo": "Notificações",
        "subtitulo": "Acompanhe seus alertas e lembretes",
        "emoji": "🔔",
        "item_singular": "Notificacao",
        "item_plural": "notificacoes",
        "item_plural_display": "notificações",
        "campo_principal": "titulo",
        "campo_valor": "valor",
        "campo_data": "data",
        "campo_status": "status",
        "status_labels": {"nao_lida": "Não Lida", "lida": "Lida", "arquivada": "Arquivada"},
        "status_cores": {"nao_lida": "#ef4444", "lida": "#10b981", "arquivada": "#6b6b7b"},
        "tem_progresso": False,
        "campos": [
            {"nome": "titulo", "label": "Título *", "tipo": "text", "placeholder": "Ex: Pagamento próximo..."},
            {"nome": "tipo", "label": "Tipo", "tipo": "select", "opcoes": [
                {"v": "pagamento", "l": "Pagamento"}, {"v": "conta", "l": "Conta"}, {"v": "meta", "l": "Meta"}, {"v": "cartao", "l": "Cartão"}, {"v": "orcamento", "l": "Orçamento"}
            ]},
            {"nome": "mensagem", "label": "Mensagem *", "tipo": "textarea", "placeholder": "Descreva a notificação..."},
            {"nome": "data", "label": "Data *", "tipo": "date"},
            {"nome": "status", "label": "Status", "tipo": "select", "opcoes": [
                {"v": "nao_lida", "l": "Não Lida"}, {"v": "lida", "l": "Lida"}, {"v": "arquivada", "l": "Arquivada"}
            ]},
        ],
        "filtros": [
            {"nome": "tipo", "label": "Todos tipos", "opcoes": [
                {"v": "pagamento", "l": "Pagamento"}, {"v": "conta", "l": "Conta"}, {"v": "meta", "l": "Meta"}, {"v": "cartao", "l": "Cartão"}, {"v": "orcamento", "l": "Orçamento"}
            ]},
            {"nome": "status", "label": "Todos status", "opcoes": [
                {"v": "nao_lida", "l": "Não Lida"}, {"v": "lida", "l": "Lida"}, {"v": "arquivada", "l": "Arquivada"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Notificações", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalNotificacoes", "prefixo": "", "tipo_calc": "count"},
            {"label": "Não Lidas", "cor": "#ef4444", "emoji": "🔴", "campo": "totalNaoLidas", "prefixo": "", "tipo_calc": "count_status_nao_lida"},
            {"label": "Lidas", "cor": "#10b981", "emoji": "✅", "campo": "totalLidas", "prefixo": "", "tipo_calc": "count_status_lida"},
            {"label": "Arquivadas", "cor": "#6b6b7b", "emoji": "📦", "campo": "totalArquivadas", "prefixo": "", "tipo_calc": "count_status_arquivada"},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de notificações, não lidas, lidas e arquivadas.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre notificações específicas por título, tipo ou status.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma notificação.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer notificação a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova notificações com confirmação de segurança.",
            "🔔 <strong>Tipos:</strong> Pagamento próximo, conta vencendo, meta atingida, limite do cartão, orçamento excedido.",
            "⚡ <strong>Status:</strong> Saiba se a notificação foi lida, não lida ou arquivada.",
        ],
        "mock_items": [
            {"id": "1", "titulo": "Pagamento de Aluguel Próximo", "tipo": "pagamento", "mensagem": "O pagamento do aluguel vence em 3 dias", "data": "2026-07-28", "status": "nao_lida", "categoria": "Pagamento", "categoriaCor": "#f59e0b", "categoriaIcone": "💳"},
            {"id": "2", "titulo": "Conta de Luz Vencendo", "tipo": "conta", "mensagem": "A conta de luz vence amanhã", "data": "2026-07-29", "status": "nao_lida", "categoria": "Conta", "categoriaCor": "#ef4444", "categoriaIcone": "⚡"},
            {"id": "3", "titulo": "Meta de Viagem Atingida", "tipo": "meta", "mensagem": "Parabéns! Você atingiu sua meta de viagem", "data": "2026-07-25", "status": "lida", "categoria": "Meta", "categoriaCor": "#10b981", "categoriaIcone": "🎯"},
        ],
    },
    {
        "nome": "Configuracoes",
        "pasta": "configuracoes",
        "titulo": "Configurações",
        "subtitulo": "Personalize sua experiência",
        "emoji": "⚙️",
        "item_singular": "Configuracao",
        "item_plural": "configuracoes",
        "item_plural_display": "configurações",
        "campo_principal": "nome",
        "campo_valor": "valor",
        "campo_data": "data",
        "campo_status": "categoria",
        "status_labels": {"aparencia": "Aparência", "idioma": "Idioma", "moeda": "Moeda", "backup": "Backup", "seguranca": "Segurança", "notificacoes": "Notificações"},
        "status_cores": {"aparencia": "#3b82f6", "idioma": "#10b981", "moeda": "#f59e0b", "backup": "#8b5cf6", "seguranca": "#ef4444", "notificacoes": "#f59e0b"},
        "tem_progresso": False,
        "campos": [
            {"nome": "nome", "label": "Nome da Configuração *", "tipo": "text", "placeholder": "Ex: Tema, Idioma..."},
            {"nome": "categoria", "label": "Categoria", "tipo": "select", "opcoes": [
                {"v": "aparencia", "l": "Aparência"}, {"v": "idioma", "l": "Idioma"}, {"v": "moeda", "l": "Moeda"}, {"v": "backup", "l": "Backup"}, {"v": "seguranca", "l": "Segurança"}, {"v": "notificacoes", "l": "Notificações"}
            ]},
            {"nome": "valor", "label": "Valor *", "tipo": "text", "placeholder": "Ex: Escuro, Português..."},
            {"nome": "descricao", "label": "Descrição", "tipo": "textarea", "placeholder": "Adicione uma descrição para esta configuração..."},
        ],
        "filtros": [
            {"nome": "categoria", "label": "Todas categorias", "opcoes": [
                {"v": "aparencia", "l": "Aparência"}, {"v": "idioma", "l": "Idioma"}, {"v": "moeda", "l": "Moeda"}, {"v": "backup", "l": "Backup"}, {"v": "seguranca", "l": "Segurança"}, {"v": "notificacoes", "l": "Notificações"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Configurações", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalConfiguracoes", "prefixo": "", "tipo_calc": "count"},
            {"label": "Aparência", "cor": "#3b82f6", "emoji": "🎨", "campo": "totalAparencia", "prefixo": "", "tipo_calc": "count_categoria_aparencia"},
            {"label": "Segurança", "cor": "#ef4444", "emoji": "🔒", "campo": "totalSeguranca", "prefixo": "", "tipo_calc": "count_categoria_seguranca"},
            {"label": "Notificações", "cor": "#f59e0b", "emoji": "🔔", "campo": "totalNotificacoesConfig", "prefixo": "", "tipo_calc": "count_categoria_notificacoes"},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de configurações por categoria.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre configurações específicas por nome ou categoria.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma configuração.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer configuração a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova configurações com confirmação de segurança.",
            "🎨 <strong>Aparência:</strong> Tema claro/escuro, cores e layout.",
            "🔒 <strong>Segurança:</strong> Senha, backup e exportação de dados.",
        ],
        "mock_items": [
            {"id": "1", "nome": "Tema Escuro", "categoria": "aparencia", "valor": "Ativado", "descricao": "Tema escuro para a aplicação", "categoriaCor": "#3b82f6", "categoriaIcone": "🎨"},
            {"id": "2", "nome": "Idioma", "categoria": "idioma", "valor": "Português (BR)", "descricao": "Idioma da aplicação", "categoriaCor": "#10b981", "categoriaIcone": "🌐"},
            {"id": "3", "nome": "Moeda", "categoria": "moeda", "valor": "Real (R$)", "descricao": "Moeda padrão", "categoriaCor": "#f59e0b", "categoriaIcone": "💰"},
            {"id": "4", "nome": "Backup Automático", "categoria": "backup", "valor": "Ativado", "descricao": "Backup automático semanal", "categoriaCor": "#8b5cf6", "categoriaIcone": "💾"},
        ],
    },
    {
        "nome": "Ajuda",
        "pasta": "ajuda",
        "titulo": "Ajuda e Suporte",
        "subtitulo": "Encontre respostas e tire dúvidas",
        "emoji": "❓",
        "item_singular": "Ajuda",
        "item_plural": "ajudas",
        "item_plural_display": "artigos",
        "campo_principal": "titulo",
        "campo_valor": "valor",
        "campo_data": "data",
        "campo_status": "status",
        "status_labels": {"publicado": "Publicado", "rascunho": "Rascunho"},
        "status_cores": {"publicado": "#10b981", "rascunho": "#f59e0b"},
        "tem_progresso": False,
        "campos": [
            {"nome": "titulo", "label": "Título *", "tipo": "text", "placeholder": "Ex: Como criar uma despesa..."},
            {"nome": "categoria", "label": "Categoria", "tipo": "select", "opcoes": [
                {"v": "inicio", "l": "Primeiros Passos"}, {"v": "despesas", "l": "Despesas"}, {"v": "receitas", "l": "Receitas"}, {"v": "cartoes", "l": "Cartões"}, {"v": "contas", "l": "Contas"}, {"v": "investimentos", "l": "Investimentos"}, {"v": "outros", "l": "Outros"}
            ]},
            {"nome": "conteudo", "label": "Conteúdo *", "tipo": "textarea", "placeholder": "Descreva a solução..."},
            {"nome": "status", "label": "Status", "tipo": "select", "opcoes": [
                {"v": "publicado", "l": "Publicado"}, {"v": "rascunho", "l": "Rascunho"}
            ]},
        ],
        "filtros": [
            {"nome": "categoria", "label": "Todas categorias", "opcoes": [
                {"v": "inicio", "l": "Primeiros Passos"}, {"v": "despesas", "l": "Despesas"}, {"v": "receitas", "l": "Receitas"}, {"v": "cartoes", "l": "Cartões"}, {"v": "contas", "l": "Contas"}, {"v": "investimentos", "l": "Investimentos"}, {"v": "outros", "l": "Outros"}
            ]},
            {"nome": "status", "label": "Todos status", "opcoes": [
                {"v": "publicado", "l": "Publicado"}, {"v": "rascunho", "l": "Rascunho"}
            ]},
        ],
        "resumo_cards": [
            {"label": "Total de Artigos", "cor": "#8b5cf6", "emoji": "📊", "campo": "totalArtigos", "prefixo": "", "tipo_calc": "count"},
            {"label": "Publicados", "cor": "#10b981", "emoji": "✅", "campo": "totalPublicados", "prefixo": "", "tipo_calc": "count_status_publicado"},
            {"label": "Rascunhos", "cor": "#f59e0b", "emoji": "📝", "campo": "totalRascunhos", "prefixo": "", "tipo_calc": "count_status_rascunho"},
            {"label": "Categorias", "cor": "#3b82f6", "emoji": "📁", "campo": "totalCategoriasAjuda", "prefixo": "", "tipo_calc": "constante", "valor": 7},
        ],
        "info_items": [
            "📊 <strong>Cards de Resumo:</strong> Acompanhe o total de artigos, publicados, rascunhos e categorias.",
            "🔍 <strong>Pesquisa e Filtros:</strong> Encontre artigos específicos por título, categoria ou status.",
            "👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um artigo.",
            "✏️ <strong>Editar:</strong> Atualize os dados de qualquer artigo a qualquer momento.",
            "🗑️ <strong>Excluir:</strong> Remova artigos com confirmação de segurança.",
            "❓ <strong>Categorias:</strong> Primeiros passos, despesas, receitas, cartões e mais.",
            "📝 <strong>Status:</strong> Saiba se o artigo está publicado ou em rascunho.",
        ],
        "mock_items": [
            {"id": "1", "titulo": "Como criar sua primeira despesa", "categoria": "despesas", "conteudo": "Para criar uma despesa, clique no botão + Nova Despesa...", "status": "publicado", "categoriaCor": "#ef4444", "categoriaIcone": "💸"},
            {"id": "2", "titulo": "Como configurar seu orçamento mensal", "categoria": "inicio", "conteudo": "Acesse a página de orçamento e defina limites por categoria...", "status": "publicado", "categoriaCor": "#8b5cf6", "categoriaIcone": "🎯"},
            {"id": "3", "titulo": "Como cadastrar um cartão de crédito", "categoria": "cartoes", "conteudo": "Na página de cartões, clique em Novo Cartão...", "status": "rascunho", "categoriaCor": "#3b82f6", "categoriaIcone": "💳"},
        ],
    },
]

# ============================================
# CAMINHOS BASE
# ============================================
BASE_DIR = Path(__file__).parent.parent.parent  # frontend/
COMPONENTS_DIR = BASE_DIR / "src" / "components"
APP_DIR = BASE_DIR / "src" / "app"

# ============================================
# FUNÇÕES UTILITÁRIAS
# ============================================
def ensure_dir(dir_path):
    dir_path.mkdir(parents=True, exist_ok=True)

def write_file(file_path, content):
    ensure_dir(file_path.parent)
    file_path.write_text(content, encoding='utf-8')
    print(f"✅ Criado: {file_path}")

def get_status_label(p, status):
    return p["status_labels"].get(status, status)

def get_status_cor(p, status):
    return p["status_cores"].get(status, "#6b6b7b")

# ============================================
# GERADORES DE ARQUIVOS
# ============================================

def gerar_page_app(p):
    content = f"""import {p['nome']}MainComp from '@/components/{p['pasta']}/main';
import {{ {p['nome']}Providers }} from '@/components/{p['pasta']}/main/Providers';

export default function {p['nome']}Page() {{
  return (
    <{p['nome']}Providers>
      <{p['nome']}MainComp />
    </{p['nome']}Providers>
  );
}}
"""
    write_file(APP_DIR / p['pasta'] / "page.tsx", content)

def gerar_main_index(p):
    content = f"export {{ default }} from './components/{p['nome']}MainComp';\n"
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "index.ts", content)

def gerar_providers(p):
    content = f"""'use client';

import {{ QueryClient, QueryClientProvider }} from '@tanstack/react-query';
import {{ ThemeProvider }} from '@/context/theme/ThemeContext';
import {{ theme }} from '@/theme/theme';
import {{ useState }} from 'react';

export function {p['nome']}Providers({{ children }}: {{ children: React.ReactNode }}) {{
  const [queryClient] = useState(() => new QueryClient({{
    defaultOptions: {{
      queries: {{
        retry: 1,
        refetchOnWindowFocus: false,
      }},
    }},
  }}));

  return (
    <QueryClientProvider client={{queryClient}}>
      <ThemeProvider theme={{theme}}>
        {{children}}
      </ThemeProvider>
    </QueryClientProvider>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "Providers.tsx", content)

def gerar_types(p):
    # Construir interface do item
    item_fields = "id: string; "
    for c in p['campos']:
        if c['nome'] in ['observacoes', 'descricao', 'conteudo', 'mensagem']:
            item_fields += f"{c['nome']}?: string; "
        elif c['tipo'] == 'number':
            item_fields += f"{c['nome']}: number; "
        else:
            item_fields += f"{c['nome']}: string; "
    item_fields += "categoria: string; categoriaCor: string; categoriaIcone: string;"

    # Construir interface de filtros
    filtros_fields = "pesquisa: string; "
    for f in p['filtros']:
        filtros_fields += f"{f['nome']}: string; "

    # Construir interface de form data
    form_fields = ""
    for c in p['campos']:
        form_fields += f"{c['nome']}: string; "

    # Construir interface de resumo
    resumo_fields = ""
    for c in p['resumo_cards']:
        resumo_fields += f"{c['campo']}: number; "

    content = f"""export interface {p['item_singular']} {{
  {item_fields}
}}
export interface {p['nome']}Filtros {{ {filtros_fields} }}
export interface {p['nome']}Resumo {{ {resumo_fields} }}
export interface {p['nome']}Data {{ {p['item_plural']}: {p['item_singular']}[]; resumo: {p['nome']}Resumo; }}
export interface {p['nome']}FormData {{ {form_fields} }}
export interface {p['nome']}State {{ data: {p['nome']}Data | null; isLoading: boolean; filtros: {p['nome']}Filtros; modalAberto: boolean; editandoId: string | null; formData: {p['nome']}FormData; exclusaoPendente: {p['item_singular']} | null; detalhe{p['item_singular']}: {p['item_singular']} | null; modalInfoAberto: boolean; }}
export interface {p['nome']}Actions {{ abrirModalNovo: () => void; abrirModalEditar: (d: {p['item_singular']}) => void; fecharModal: () => void; atualizarFiltro: (c: keyof {p['nome']}Filtros, v: string) => void; limparFiltros: () => void; salvar{p['item_singular']}: () => void; atualizarForm: (c: keyof {p['nome']}FormData, v: string) => void; confirmarExclusao: (d: {p['item_singular']}) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (d: {p['item_singular']}) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; }}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "types" / f"{p['nome']}Types.ts", content)

def gerar_services(p):
    mock_items_str = json.dumps(p['mock_items'], indent=2, ensure_ascii=False)
    
    # Construir função calcularResumo
    resumo_calc = ""
    for c in p['resumo_cards']:
        campo = c['campo']
        tipo_calc = c['tipo_calc']
        
        if tipo_calc == "count":
            resumo_calc += f"  const {campo} = {p['item_plural']}.length;\n"
        elif tipo_calc == "sum_valor":
            resumo_calc += f"  const {campo} = {p['item_plural']}.reduce((acc, d) => acc + (d.valor || 0), 0);\n"
        elif tipo_calc == "sum_campo":
            campo_calc = c.get('campo_calc', 'valor')
            resumo_calc += f"  const {campo} = {p['item_plural']}.reduce((acc, d) => acc + (d.{campo_calc} || 0), 0);\n"
        elif tipo_calc == "sum_valor_x12":
            resumo_calc += f"  const {campo} = {p['item_plural']}.reduce((acc, d) => acc + (d.valor || 0), 0) * 12;\n"
        elif tipo_calc == "lucro_prejuizo":
            resumo_calc += f"  const totalAplicado = {p['item_plural']}.reduce((acc, d) => acc + d.valorAplicado, 0);\n  const totalAtual = {p['item_plural']}.reduce((acc, d) => acc + d.valorAtual, 0);\n  const {campo} = totalAtual - totalAplicado;\n"
        elif tipo_calc == "sum_status_atrasada":
            resumo_calc += f"  const {campo} = {p['item_plural']}.filter(d => d.situacao === 'atrasada').reduce((acc, d) => acc + d.valor, 0);\n"
        elif tipo_calc == "sum_status_quitada":
            resumo_calc += f"  const {campo} = {p['item_plural']}.filter(d => d.situacao === 'quitada').reduce((acc, d) => acc + d.valor, 0);\n"
        elif tipo_calc.startswith("count_status_"):
            status_val = tipo_calc.replace("count_status_", "")
            resumo_calc += f"  const {campo} = {p['item_plural']}.filter(d => d.status === '{status_val}').length;\n"
        elif tipo_calc.startswith("count_tipo_"):
            tipo_val = tipo_calc.replace("count_tipo_", "")
            resumo_calc += f"  const {campo} = {p['item_plural']}.filter(d => d.tipo === '{tipo_val}').length;\n"
        elif tipo_calc.startswith("count_categoria_"):
            cat_val = tipo_calc.replace("count_categoria_", "")
            resumo_calc += f"  const {campo} = {p['item_plural']}.filter(d => d.categoria === '{cat_val}').length;\n"
        elif tipo_calc == "constante":
            val = c.get('valor', 0)
            resumo_calc += f"  const {campo} = {val};\n"
    
    resumo_return = ", ".join([c['campo'] for c in p['resumo_cards']])
    
    # Construir form data inicial
    form_inicial = {}
    for c in p['campos']:
        if c['tipo'] == 'date':
            form_inicial[c['nome']] = "new Date().toISOString().split('T')[0]"
        elif c['tipo'] == 'number':
            form_inicial[c['nome']] = "'0'" if c['nome'] in ['juros', 'parcelasPagas'] else "'1'" if c['nome'] == 'parcelas' else "''"
        elif c['tipo'] == 'select':
            form_inicial[c['nome']] = f"'{c['opcoes'][0]['v']}'"
        else:
            form_inicial[c['nome']] = "''"
    
    form_inicial_str = "{ " + ", ".join([f"{k}: {v}" for k, v in form_inicial.items()]) + " }"
    
    # Construir novo item no mutation
    novo_item_fields = ""
    for c in p['campos']:
        if c['nome'] in ['observacoes', 'descricao', 'conteudo', 'mensagem']:
            novo_item_fields += f"        {c['nome']}: formData.{c['nome']},\n"
        elif c['tipo'] == 'number':
            novo_item_fields += f"        {c['nome']}: Number(formData.{c['nome']}) || 0,\n"
        else:
            novo_item_fields += f"        {c['nome']}: formData.{c['nome']},\n"
    novo_item_fields += "        categoria: 'Geral',\n        categoriaCor: '#8b5cf6',\n        categoriaIcone: '📋',"
    
    content = f"""import {{ useQuery, useMutation, useQueryClient }} from '@tanstack/react-query';
import type {{ {p['item_singular']}, {p['nome']}Data, {p['nome']}FormData }} from '../types/{p['nome']}Types';

const MOCK_{p['nome'].upper()}: {p['item_singular']}[] = {mock_items_str};

function calcularResumo({p['item_plural']}: {p['item_singular']}[]) {{
{resumo_calc}
  return {{ {resumo_return} }};
}}

function construirDados({p['item_plural']}: {p['item_singular']}[]): {p['nome']}Data {{
  return {{
    {p['item_plural']},
    resumo: calcularResumo({p['item_plural']}),
  }};
}}

export function {p['nome'].lower()[0]}{p['nome'][1:]}Service() {{
  const queryClient = useQueryClient();

  const {{ data, isLoading }} = useQuery({{
    queryKey: ['{p['pasta']}'],
    queryFn: async () => {{
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_{p['nome'].upper()});
    }},
    staleTime: 5 * 60 * 1000,
  }});

  const criarMutation = useMutation({{
    mutationFn: async (formData: {p['nome']}FormData) => {{
      await new Promise(resolve => setTimeout(resolve, 300));
      const novo{p['item_singular']}: {p['item_singular']} = {{
        id: String(Date.now()),
{novo_item_fields}
      }};
      return novo{p['item_singular']};
    }},
    onSuccess: () => {{
      queryClient.invalidateQueries({{ queryKey: ['{p['pasta']}'] }});
    }},
  }});

  const atualizarMutation = useMutation({{
    mutationFn: async ({{ id, formData }}: {{ id: string; formData: {p['nome']}FormData }}) => {{
      await new Promise(resolve => setTimeout(resolve, 300));
      return {{ id, formData }};
    }},
    onSuccess: () => {{
      queryClient.invalidateQueries({{ queryKey: ['{p['pasta']}'] }});
    }},
  }});

  const excluirMutation = useMutation({{
    mutationFn: async (id: string) => {{
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    }},
    onSuccess: () => {{
      queryClient.invalidateQueries({{ queryKey: ['{p['pasta']}'] }});
    }},
  }});

  return {{
    data,
    isLoading,
    criar: criarMutation.mutate,
    atualizar: atualizarMutation.mutate,
    excluir: excluirMutation.mutate,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  }};
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "services" / f"{p['nome']}Services.ts", content)

def gerar_utils(p):
    # Construir filtros iniciais
    filtros_iniciais = "{ pesquisa: '', "
    for f in p['filtros']:
        filtros_iniciais += f"{f['nome']}: '', "
    filtros_iniciais += "}"
    
    # Construir form inicial
    form_inicial = "{ "
    for c in p['campos']:
        if c['tipo'] == 'date':
            form_inicial += f"{c['nome']}: new Date().toISOString().split('T')[0], "
        elif c['tipo'] == 'number':
            form_inicial += f"{c['nome']}: '0', " if c['nome'] in ['juros', 'parcelasPagas'] else f"{c['nome']}: '1', " if c['nome'] == 'parcelas' else f"{c['nome']}: '', "
        elif c['tipo'] == 'select':
            form_inicial += f"{c['nome']}: '{c['opcoes'][0]['v']}', "
        else:
            form_inicial += f"{c['nome']}: '', "
    form_inicial += "}"
    
    # Construir filtros useMemo
    filtros_use_memo = ""
    for f in p['filtros']:
        filtros_use_memo += f"      if (filtros.{f['nome']} && item.{f['nome']} !== filtros.{f['nome']}) return false;\n"
    
    # Construir abrirModalEditar
    editar_form = ""
    for c in p['campos']:
        if c['nome'] in ['observacoes', 'descricao', 'conteudo', 'mensagem']:
            editar_form += f"      {c['nome']}: item.{c['nome']} || '',\n"
        elif c['tipo'] == 'number':
            editar_form += f"      {c['nome']}: String(item.{c['nome']}),\n"
        else:
            editar_form += f"      {c['nome']}: item.{c['nome']},\n"
    
    # Status labels e cores
    status_labels_str = "{ " + ", ".join([f"'{k}': '{v}'" for k, v in p['status_labels'].items()]) + " }"
    status_cores_str = "{ " + ", ".join([f"'{k}': '{v}'" for k, v in p['status_cores'].items()]) + " }"
    
    # Helpers extras
    helpers_extras = ""
    if p['tem_progresso']:
        helpers_extras += f"""
  function calcularProgresso(pagas: number, total: number): number {{
    return total > 0 ? Math.round((pagas / total) * 100) : 0;
  }}
"""
    
    helpers_return = "formatarValor, formatarData, getStatusLabel, getStatusCor"
    if p['tem_progresso']:
        helpers_return += ", calcularProgresso"
    
    content = f"""import {{ useState, useMemo, useCallback }} from 'react';
import {{ {p['nome'].lower()[0]}{p['nome'][1:]}Service }} from '../services/{p['nome']}Services';
import {{ useTheme }} from '@/context/theme/ThemeContext';
import type {{ {p['item_singular']}, {p['nome']}Filtros, {p['nome']}FormData }} from '../types/{p['nome']}Types';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const FILTROS_INICIAIS: {p['nome']}Filtros = {filtros_iniciais};

const FORM_INICIAL: {p['nome']}FormData = {form_inicial};

const STATUS_LABELS: Record<string, string> = {status_labels_str};

const STATUS_CORES: Record<string, string> = {status_cores_str};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function use{p['nome']}() {{
  const [filtros, setFiltros] = useState<{p['nome']}Filtros>(FILTROS_INICIAIS);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{p['nome']}FormData>(FORM_INICIAL);
  const [exclusaoPendente, setExclusaoPendente] = useState<{p['item_singular']} | null>(null);
  const [detalhe{p['item_singular']}, setDetalhe{p['item_singular']}] = useState<{p['item_singular']} | null>(null);
  const [modalInfoAberto, setModalInfoAberto] = useState(false);

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = {p['nome'].lower()[0]}{p['nome'][1:]}Service();
  const theme = useTheme();

  const {p['item_plural']}Filtradas = useMemo(() => {{
    if (!service.data) return [];
    return service.data.{p['item_plural']}.filter(item => {{
      if (filtros.pesquisa && !item.{p['campo_principal']}.toLowerCase().includes(filtros.pesquisa.toLowerCase())) return false;
{filtros_use_memo}      return true;
    }});
  }}, [service.data, filtros]);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const abrirModalNovo = useCallback(() => {{
    setFormData(FORM_INICIAL);
    setEditandoId(null);
    setModalAberto(true);
  }}, []);

  const abrirModalEditar = useCallback((item: {p['item_singular']}) => {{
    setFormData({{
{editar_form}    }});
    setEditandoId(item.id);
    setModalAberto(true);
  }}, []);

  const fecharModal = useCallback(() => {{
    setModalAberto(false);
    setEditandoId(null);
    setFormData(FORM_INICIAL);
  }}, []);

  const atualizarFiltro = useCallback((campo: keyof {p['nome']}Filtros, valor: string) => {{
    setFiltros(prev => ({{ ...prev, [campo]: valor }}));
  }}, []);

  const limparFiltros = useCallback(() => {{
    setFiltros(FILTROS_INICIAIS);
  }}, []);

  const atualizarForm = useCallback((campo: keyof {p['nome']}FormData, valor: string) => {{
    setFormData(prev => ({{ ...prev, [campo]: valor }}));
  }}, []);

  const salvar{p['item_singular']} = useCallback(() => {{
    if (editandoId) {{
      service.atualizar({{ id: editandoId, formData }});
    }} else {{
      service.criar(formData);
    }}
    fecharModal();
  }}, [editandoId, formData, service, fecharModal]);

  const confirmarExclusao = useCallback((item: {p['item_singular']}) => {{
    setExclusaoPendente(item);
  }}, []);

  const cancelarExclusao = useCallback(() => {{
    setExclusaoPendente(null);
  }}, []);

  const confirmarEExcluir = useCallback(() => {{
    if (exclusaoPendente) {{
      service.excluir(exclusaoPendente.id);
      setExclusaoPendente(null);
    }}
  }}, [exclusaoPendente, service]);

  const abrirDetalhe = useCallback((item: {p['item_singular']}) => {{
    setDetalhe{p['item_singular']}(item);
  }}, []);

  const fecharDetalhe = useCallback(() => {{
    setDetalhe{p['item_singular']}(null);
  }}, []);

  const abrirInfo = useCallback(() => {{
    setModalInfoAberto(true);
  }}, []);

  const fecharInfo = useCallback(() => {{
    setModalInfoAberto(false);
  }}, []);

  function formatarValor(valor: number): string {{
    return valor.toLocaleString('pt-BR', {{
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }});
  }}

  function formatarData(data: string): string {{
    const partes = data.split('-');
    if (partes.length !== 3) return data;
    return `${{partes[2]}}/${{partes[1]}}/${{partes[0]}}`;
  }}

  function getStatusLabel(status: string): string {{
    return STATUS_LABELS[status] || status;
  }}

  function getStatusCor(status: string): string {{
    return STATUS_CORES[status] || '#6b6b7b';
  }}
{helpers_extras}
  return {{
    state: {{
      data: service.data,
      isLoading: service.isLoading,
      filtros,
      modalAberto,
      editandoId,
      formData,
      {p['item_plural']}Filtradas,
      isSaving: service.isSaving,
      exclusaoPendente,
      detalhe{p['item_singular']},
      modalInfoAberto,
    }},
    actions: {{
      abrirModalNovo,
      abrirModalEditar,
      fecharModal,
      atualizarFiltro,
      limparFiltros,
      salvar{p['item_singular']},
      atualizarForm,
      confirmarExclusao,
      cancelarExclusao,
      confirmarEExcluir,
      abrirDetalhe,
      fecharDetalhe,
      abrirInfo,
      fecharInfo,
    }},
    helpers: {{
      {helpers_return},
    }},
    theme,
  }};
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "utils" / f"{p['nome']}Utils.ts", content)

def gerar_main_utils(p):
    content = f"""import {{ useState, useCallback }} from 'react';
import {{ use{p['nome']} }} from './{p['nome']}Utils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function use{p['nome']}Main() {{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {p['nome'].lower()} = use{p['nome']}();

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const toggleSidebar = useCallback(() => {{
    setSidebarOpen(prev => !prev);
  }}, []);

  const closeSidebar = useCallback(() => {{
    setSidebarOpen(false);
  }}, []);

  const handleEditarFromDetalhe = useCallback((item: typeof {p['nome'].lower()}.state.detalhe{p['item_singular']}) => {{
    if (item) {{
      {p['nome'].lower()}.actions.fecharDetalhe();
      {p['nome'].lower()}.actions.abrirModalEditar(item);
    }}
  }}, [{p['nome'].lower()}.actions]);

  return {{
    state: {{
      sidebarOpen,
      ...{p['nome'].lower()}.state,
    }},
    actions: {{
      toggleSidebar,
      closeSidebar,
      ...{p['nome'].lower()}.actions,
      handleEditarFromDetalhe,
    }},
    helpers: {p['nome'].lower()}.helpers,
  }};
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "utils" / f"{p['nome']}MainUtils.ts", content)

def gerar_main_styles(p):
    content = f"""import styled from 'styled-components';

// ============================================
// LAYOUT PRINCIPAL
// ============================================
export const Styled{p['nome']}Layout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background: linear-gradient(135deg, #0a0a14 0%, #12121f 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;

  *, *::before, *::after {{
    box-sizing: border-box;
  }}
`;

export const Styled{p['nome']}MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 24px 32px;
  overflow-y: auto;
  overflow-x: hidden;
  width: calc(100vw - 260px);
  max-width: 100%;

  @media (max-width: 1024px) {{
    margin-left: 0;
    width: 100%;
    padding: 70px 16px 24px;
  }}

  @media (max-width: 480px) {{
    padding: 70px 12px 16px;
  }}
`;

export const StyledHamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 200;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(12px);
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;

  &:hover {{
    background: rgba(139, 92, 246, 0.2);
    border-color: #8b5cf6;
  }}

  @media (max-width: 1024px) {{
    display: flex;
  }}
`;

export const StyledOverlay = styled.div<{{ $visible: boolean }}>`
  display: ${{props => props.$visible ? 'block' : 'none'}};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 150;
  cursor: pointer;

  @media (min-width: 1025px) {{
    display: none;
  }}
`;

// ============================================
// CONTAINER E LOADING
// ============================================
export const Styled{p['nome']}Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {{
    gap: 16px;
  }}
`;

export const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #8b5cf6;
  font-size: 16px;
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "styles" / f"{p['nome']}MainStyles.ts", content)

def gerar_main_comp(p):
    # Construir props do list
    list_props = f"{p['item_plural']}Filtradas={{state.{p['item_plural']}Filtradas}} filtros={{state.filtros}}"
    for f in p['filtros']:
        pass  # já incluído
    list_props += f" formatarValor={{helpers.formatarValor}} formatarData={{helpers.formatarData}} getStatusLabel={{helpers.getStatusLabel}} getStatusCor={{helpers.getStatusCor}}"
    
    if p['tem_progresso']:
        list_props += " calcularProgresso={helpers.calcularProgresso}"
    
    list_props += " onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}"
    
    # Props do detalhe
    detalhe_props = f"detalhe{p['item_singular']}={{state.detalhe{p['item_singular']}}} formatarValor={{helpers.formatarValor}} formatarData={{helpers.formatarData}} getStatusLabel={{helpers.getStatusLabel}} getStatusCor={{helpers.getStatusCor}}"
    if p['tem_progresso']:
        detalhe_props += " calcularProgresso={helpers.calcularProgresso}"
    detalhe_props += f" onFecharDetalhe={{actions.fecharDetalhe}} onEditar={{actions.handleEditarFromDetalhe}}"
    
    content = f"""'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import {p['nome']}HeaderComp from '../../{p['nome']}Header/components/{p['nome']}HeaderComp';
import {p['nome']}ResumoComp from '../../{p['nome']}Resumo/components/{p['nome']}ResumoComp';
import {p['nome']}ListComp from '../../{p['nome']}List/components/{p['nome']}ListComp';
import {p['nome']}ModalComp from '../../{p['nome']}Modal/components/{p['nome']}ModalComp';
import {p['nome']}DetalheComp from '../../{p['nome']}Detalhe/components/{p['nome']}DetalheComp';
import {p['nome']}ConfirmComp from '../../{p['nome']}Confirm/components/{p['nome']}ConfirmComp';
import {p['nome']}InfoComp from '../../{p['nome']}Info/components/{p['nome']}InfoComp';
import {{ use{p['nome']}Main }} from '../utils/{p['nome']}MainUtils';
import {{
  Styled{p['nome']}Layout,
  Styled{p['nome']}MainContent,
  StyledHamburgerButton,
  StyledOverlay,
  Styled{p['nome']}Container,
  StyledLoading,
}} from '../styles/{p['nome']}MainStyles';

export default function {p['nome']}MainComp() {{
  const {{ state, actions, helpers }} = use{p['nome']}Main();

  if (state.isLoading) {{
    return (
      <Styled{p['nome']}Layout>
        <Styled{p['nome']}MainContent>
          <Styled{p['nome']}Container>
            <StyledLoading>Carregando {p['item_plural_display']}...</StyledLoading>
          </Styled{p['nome']}Container>
        </Styled{p['nome']}MainContent>
      </Styled{p['nome']}Layout>
    );
  }}

  if (!state.data) return null;

  return (
    <Styled{p['nome']}Layout>
      <StyledHamburgerButton onClick={{actions.toggleSidebar}}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={{state.sidebarOpen}} onClick={{actions.closeSidebar}} />
      <SidebarComp $isOpen={{state.sidebarOpen}} />
      <Styled{p['nome']}MainContent>
        <HeaderComp />
        <Styled{p['nome']}Container>
          <{p['nome']}HeaderComp
            onAbrirInfo={{actions.abrirInfo}}
            onAbrirModalNovo={{actions.abrirModalNovo}}
          />

          <{p['nome']}ResumoComp
            resumo={{state.data.resumo}}
            formatarValor={{helpers.formatarValor}}
          />

          <{p['nome']}ListComp
            {list_props}
          />

          <{p['nome']}ModalComp
            modalAberto={{state.modalAberto}}
            editandoId={{state.editandoId}}
            formData={{state.formData}}
            onFecharModal={{actions.fecharModal}}
            onAtualizarForm={{actions.atualizarForm}}
            onSalvar{p['item_singular']}={{actions.salvar{p['item_singular']}}}
          />

          <{p['nome']}DetalheComp
            {detalhe_props}
          />

          <{p['nome']}ConfirmComp
            exclusaoPendente={{state.exclusaoPendente}}
            formatarValor={{helpers.formatarValor}}
            onCancelarExclusao={{actions.cancelarExclusao}}
            onConfirmarEExcluir={{actions.confirmarEExcluir}}
          />

          <{p['nome']}InfoComp
            modalInfoAberto={{state.modalInfoAberto}}
            onFecharInfo={{actions.fecharInfo}}
          />
        </Styled{p['nome']}Container>
      </Styled{p['nome']}MainContent>
    </Styled{p['nome']}Layout>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / "main" / "components" / f"{p['nome']}MainComp.tsx", content)

def gerar_header(p):
    # Types
    types_content = f"""export interface {p['nome']}HeaderProps {{
  onAbrirInfo: () => void;
  onAbrirModalNovo: () => void;
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Header" / "types" / f"{p['nome']}HeaderTypes.ts", types_content)
    
    # Styles
    styles_content = f"""import styled from 'styled-components';

// ============================================
// HEADER
// ============================================
export const Styled{p['nome']}Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Styled{p['nome']}Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {{
    font-size: 20px;
  }}
`;

export const Styled{p['nome']}Subtitle = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 4px 0 0 0;

  @media (max-width: 480px) {{
    font-size: 12px;
  }}
`;

// ============================================
// BOTÕES
// ============================================
export const StyledButton = styled.button<{{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${{props => {{
    switch (props.$variant) {{
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {{
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }}
        `;
      case 'secondary':
        return `
          background: rgba(26, 26, 46, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {{
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }}
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {{
            background: rgba(239, 68, 68, 0.2);
          }}
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a0a0b0;
          &:hover {{
            background: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
          }}
        `;
      default:
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
        `;
    }}
  }}}}
`;

// ============================================
// BOTÃO DE INFO NO TÍTULO
// ============================================
export const StyledInfoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  transition: all 150ms ease;
  vertical-align: middle;

  &:hover {{
    background: rgba(139, 92, 246, 0.2);
    transform: scale(1.1);
  }}
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Header" / "styles" / f"{p['nome']}HeaderStyles.ts", styles_content)
    
    # Component
    comp_content = f"""'use client';

import type {{ {p['nome']}HeaderProps }} from '../types/{p['nome']}HeaderTypes';
import {{
  Styled{p['nome']}Header,
  Styled{p['nome']}Title,
  Styled{p['nome']}Subtitle,
  StyledButton,
  StyledInfoButton,
}} from '../styles/{p['nome']}HeaderStyles';

export default function {p['nome']}HeaderComp({{ onAbrirInfo, onAbrirModalNovo }}: {p['nome']}HeaderProps) {{
  return (
    <Styled{p['nome']}Header>
      <div>
        <Styled{p['nome']}Title>
          {p['titulo']}
          <StyledInfoButton title="Informações sobre a página" onClick={{onAbrirInfo}}>
            ℹ️
          </StyledInfoButton>
        </Styled{p['nome']}Title>
        <Styled{p['nome']}Subtitle>{p['subtitulo']}</Styled{p['nome']}Subtitle>
      </div>
      <StyledButton $variant="primary" onClick={{onAbrirModalNovo}}>
        + Nova {p['item_singular']}
      </StyledButton>
    </Styled{p['nome']}Header>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Header" / "components" / f"{p['nome']}HeaderComp.tsx", comp_content)

def gerar_resumo(p):
    # Types
    types_content = f"""import type {{ {p['nome']}Resumo }} from '../../main/types/{p['nome']}Types';

export interface {p['nome']}ResumoProps {{
  resumo: {p['nome']}Resumo;
  formatarValor: (v: number) => string;
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Resumo" / "types" / f"{p['nome']}ResumoTypes.ts", types_content)
    
    # Styles (igual ao padrão)
    styles_content = """import styled from 'styled-components';

// ============================================
// CARDS DE RESUMO (KPIs) - SCROLL HORIZONTAL
// ============================================
export const StyledResumoGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
  }
`;

export const StyledResumoCard = styled.div<{ $accentColor: string }>`
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(15, 15, 26, 0.9) 100%);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  transition: all 200ms ease;
  overflow: hidden;
  min-width: 220px;
  flex: 1 1 220px;
  max-width: 300px;
  scroll-snap-align: start;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.$accentColor}, transparent);
    border-radius: 16px 16px 0 0;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 0 20px ${props => props.$accentColor}22;
    border-color: ${props => props.$accentColor}44;
  }
`;

export const StyledResumoIcon = styled.div<{ $color: string; $bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.$color};
  margin-bottom: 12px;
  box-shadow: 0 0 12px ${props => props.$color}33;
`;

export const StyledResumoLabel = styled.span`
  font-size: 12px;
  color: #a0a0b0;
  font-weight: 500;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledResumoValue = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin: 4px 0 0 0;
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Resumo" / "styles" / f"{p['nome']}ResumoStyles.ts", styles_content)
    
    # Component
    cards_jsx = ""
    for c in p['resumo_cards']:
        bg = c['cor'].replace('#', 'rgba(')  # simplificado
        bg_rgba = f"rgba({int(c['cor'][1:3], 16)}, {int(c['cor'][3:5], 16)}, {int(c['cor'][5:7], 16)}, 0.1)"
        cards_jsx += f"""      <StyledResumoCard $accentColor="{c['cor']}">
        <StyledResumoIcon $color="{c['cor']}" $bg="{bg_rgba}">{c['emoji']}</StyledResumoIcon>
        <StyledResumoLabel>{c['label']}</StyledResumoLabel>
        <StyledResumoValue>{c['prefixo']}{{formatarValor(resumo.{c['campo']})}}</StyledResumoValue>
      </StyledResumoCard>

"""
    
    # Para campos que não são valores monetários (count), não usar formatarValor
    cards_jsx_fixed = ""
    for c in p['resumo_cards']:
        bg_rgba = f"rgba({int(c['cor'][1:3], 16)}, {int(c['cor'][3:5], 16)}, {int(c['cor'][5:7], 16)}, 0.1)"
        if c['prefixo'] == '':
            value_expr = f"{{resumo.{c['campo']}}}"
        else:
            value_expr = f"{c['prefixo']}{{formatarValor(resumo.{c['campo']})}}"
        cards_jsx_fixed += f"""      <StyledResumoCard $accentColor="{c['cor']}">
        <StyledResumoIcon $color="{c['cor']}" $bg="{bg_rgba}">{c['emoji']}</StyledResumoIcon>
        <StyledResumoLabel>{c['label']}</StyledResumoLabel>
        <StyledResumoValue>{value_expr}</StyledResumoValue>
      </StyledResumoCard>

"""
    
    comp_content = f"""'use client';

import type {{ {p['nome']}ResumoProps }} from '../types/{p['nome']}ResumoTypes';
import {{
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
}} from '../styles/{p['nome']}ResumoStyles';

export default function {p['nome']}ResumoComp({{ resumo, formatarValor }}: {p['nome']}ResumoProps) {{
  return (
    <StyledResumoGrid>
{cards_jsx_fixed}    </StyledResumoGrid>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Resumo" / "components" / f"{p['nome']}ResumoComp.tsx", comp_content)

def gerar_list(p):
    # Types
    list_props = f"  {p['item_plural']}Filtradas: {p['item_singular']}[];\n  filtros: {p['nome']}Filtros;\n"
    list_props += "  formatarValor: (v: number) => string;\n  formatarData: (d: string) => string;\n"
    list_props += "  getStatusLabel: (s: string) => string;\n  getStatusCor: (s: string) => string;\n"
    if p['tem_progresso']:
        list_props += "  calcularProgresso: (pg: number, pt: number) => number;\n"
    list_props += "  onAtualizarFiltro: (c: keyof %sFiltros, v: string) => void;\n" % p['nome']
    list_props += "  onLimparFiltros: () => void;\n"
    list_props += f"  onAbrirDetalhe: (d: {p['item_singular']}) => void;\n"
    list_props += f"  onAbrirModalEditar: (d: {p['item_singular']}) => void;\n"
    list_props += f"  onConfirmarExclusao: (d: {p['item_singular']}) => void;\n"
    
    types_content = f"""import type {{ {p['item_singular']}, {p['nome']}Filtros }} from '../../main/types/{p['nome']}Types';

export interface {p['nome']}ListProps {{
{list_props}}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}List" / "types" / f"{p['nome']}ListTypes.ts", types_content)
    
    # Styles - usar o mesmo padrão da lista de dívidas (grid)
    styles_content = """import styled from 'styled-components';

// ============================================
// CARD PRINCIPAL (LISTA)
// ============================================
export const StyledCard = styled.div`
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const StyledCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

// ============================================
// BARRA DE FILTROS
// ============================================
export const StyledFilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const StyledSearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 150ms ease;

  &::placeholder {
    color: #6b6b7b;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

export const StyledSelect = styled.select`
  padding: 10px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  option {
    background: #1a1a2e;
    color: #ffffff;
  }
`;

// ============================================
// GRID DE ITENS
// ============================================
export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
`;

export const StyledItem = styled.div`
  background: rgba(37, 37, 66, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  transition: all 200ms ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    background: rgba(37, 37, 66, 0.6);
    border-color: rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
  }
`;

export const StyledItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.$color};
  flex-shrink: 0;
  box-shadow: 0 0 12px ${props => props.$color}33;
`;

export const StyledInfo = styled.div`
  flex: 1;
`;

export const StyledName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  display: block;
`;

export const StyledSub = styled.span`
  font-size: 12px;
  color: #a0a0b0;
`;

// ============================================
// BADGES
// ============================================
export const StyledStatusBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$color};
  background: ${props => props.$color}1A;
  border: 1px solid ${props => props.$color}33;
  white-space: nowrap;
`;

// ============================================
// BARRA DE PROGRESSO
// ============================================
export const StyledProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledProgressTrack = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
`;

export const StyledProgressFill = styled.div<{ $pct: number; $color: string }>`
  width: ${props => Math.min(props.$pct, 100)}%;
  height: 100%;
  background: linear-gradient(90deg, ${props => props.$color}, ${props => props.$color}dd);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export const StyledProgressPct = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
`;

// ============================================
// VALORES
// ============================================
export const StyledValues = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

export const StyledLabel = styled.span`
  font-size: 11px;
  color: #6b6b7b;
`;

// ============================================
// AÇÕES
// ============================================
export const StyledActions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

// ============================================
// BOTÕES
// ============================================
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(26, 26, 46, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a0a0b0;
          &:hover {
            background: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
        `;
    }
  }}
`;

export const StyledIconButton = styled.button<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${props => props.$color || '#a0a0b0'};
  cursor: pointer;
  transition: all 150ms ease;
  font-size: 16px;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
    color: ${props => props.$color || '#8b5cf6'};
  }
`;

// ============================================
// ESTADO VAZIO
// ============================================
export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  gap: 12px;
`;

export const StyledEmptyIcon = styled.div`
  font-size: 48px;
  opacity: 0.5;
`;

export const StyledEmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

export const StyledEmptyText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0;
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}List" / "styles" / f"{p['nome']}ListStyles.ts", styles_content)
    
    # Component
    # Construir filtros select
    filtros_select = ""
    for f in p['filtros']:
        opcoes = "".join([f"<option value=\"{{o['v']}}\">{{o['l']}}</option>" for o in f['opcoes']])
        filtros_select += f"""        <StyledSelect
          value={{filtros.{f['nome']}}}
          onChange={{e => onAtualizarFiltro('{f['nome']}', e.target.value)}}
        >
          <option value="">{f['label']}</option>
{chr(10).join([f"          <option value=\"{o['v']}\">{o['l']}</option>" for o in f['opcoes']])}
        </StyledSelect>
"""
    
    # Construir item render
    if p['tem_progresso']:
        progress_jsx = f"""
            <StyledProgressBar>
              <StyledProgressTrack>
                <StyledProgressFill $pct={{pct}} $color={{cor}} />
              </StyledProgressTrack>
              <StyledProgressPct>{{pct}}%</StyledProgressPct>
            </StyledProgressBar>
"""
        progress_calc = f"const pct = calcularProgresso(d.{p['campo_parcelas_pagas']}, d.{p['campo_parcelas']}); const cor = d.{p['campo_status']} === 'quitada' ? '#10b981' : d.{p['campo_status']} === 'atrasada' ? '#ef4444' : '#3b82f6';"
    else:
        progress_jsx = ""
        progress_calc = ""
    
    # Campos de valor e data
    valor_campo = p['campo_valor']
    data_campo = p['campo_data']
    
    # Sub info (tipo, categoria, etc)
    sub_campo = p['filtros'][0]['nome'] if p['filtros'] else 'categoria'
    
    comp_content = f"""'use client';

import type {{ {p['nome']}ListProps }} from '../types/{p['nome']}ListTypes';
import {{
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledFilterBar,
  StyledSearchInput,
  StyledSelect,
  StyledGrid,
  StyledItem,
  StyledItemHeader,
  StyledIcon,
  StyledInfo,
  StyledName,
  StyledSub,
  StyledStatusBadge,
  StyledProgressBar,
  StyledProgressTrack,
  StyledProgressFill,
  StyledProgressPct,
  StyledValues,
  StyledAmount,
  StyledLabel,
  StyledActions,
  StyledButton,
  StyledIconButton,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyTitle,
  StyledEmptyText,
}} from '../styles/{p['nome']}ListStyles';

export default function {p['nome']}ListComp({{
  {p['item_plural']}Filtradas,
  filtros,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,
{", calcularProgresso" if p['tem_progresso'] else ""}
  onAtualizarFiltro,
  onLimparFiltros,
  onAbrirDetalhe,
  onAbrirModalEditar,
  onConfirmarExclusao,
}}: {p['nome']}ListProps) {{
  const temFiltros = filtros.pesquisa{"".join([f" || filtros.{f['nome']}" for f in p['filtros']])};

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle>Lista de {p['titulo']} ({{{p['item_plural']}Filtradas.length}})</StyledCardTitle>
        {{temFiltros && (
          <StyledButton $variant="ghost" onClick={{onLimparFiltros}}>
            Limpar filtros
          </StyledButton>
        )}}
      </StyledCardHeader>

      <StyledFilterBar>
        <StyledSearchInput
          type="text"
          placeholder="🔍 Pesquisar {p['item_plural_display']}..."
          value={{filtros.pesquisa}}
          onChange={{e => onAtualizarFiltro('pesquisa', e.target.value)}}
        />
{filtros_select}      </StyledFilterBar>

      {{{p['item_plural']}Filtradas.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyIcon>📭</StyledEmptyIcon>
          <StyledEmptyTitle>Nenhuma {p['item_singular'].lower()} encontrada</StyledEmptyTitle>
          <StyledEmptyText>
            {{temFiltros
              ? 'Tente ajustar os filtros para encontrar {p['item_plural_display']}.'
              : 'Comece cadastrando sua primeira {p['item_singular'].lower()}.'}}
          </StyledEmptyText>
        </StyledEmptyState>
      ) : (
        <StyledGrid>
          {{{p['item_plural']}Filtradas.map(d => {{
            {progress_calc}
            return (
              <StyledItem key={{d.id}}>
                <StyledItemHeader>
                  <StyledIcon $color={{d.categoriaCor}}>
                    {{d.categoriaIcone}}
                  </StyledIcon>
                  <StyledInfo>
                    <StyledName>{{d.{p['campo_principal']}}}</StyledName>
                    <StyledSub>{{getStatusLabel(d.{p['campo_status']})}}</StyledSub>
                  </StyledInfo>
                  <StyledStatusBadge $color={{getStatusCor(d.{p['campo_status']})}}>
                    {{getStatusLabel(d.{p['campo_status']})}}
                  </StyledStatusBadge>
                </StyledItemHeader>
{progress_jsx}
                <StyledValues>
                  <div>
                    <StyledLabel>Valor</StyledLabel>
                    <StyledAmount>R$ {{formatarValor(d.{valor_campo})}}</StyledAmount>
                  </div>
                  <div style={{{{ textAlign: 'right' }}}}>
                    <StyledLabel>Data</StyledLabel>
                    <StyledAmount>{{formatarData(d.{data_campo})}}</StyledAmount>
                  </div>
                </StyledValues>

                <StyledActions>
                  <StyledIconButton title="Ver detalhes" onClick={{() => onAbrirDetalhe(d)}}>
                    👁️
                  </StyledIconButton>
                  <StyledIconButton title="Editar" onClick={{() => onAbrirModalEditar(d)}}>
                    ✏️
                  </StyledIconButton>
                  <StyledIconButton title="Excluir" $color="#ef4444" onClick={{() => onConfirmarExclusao(d)}}>
                    🗑️
                  </StyledIconButton>
                </StyledActions>
              </StyledItem>
            );
          }})}}
        </StyledGrid>
      )}}
    </StyledCard>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}List" / "components" / f"{p['nome']}ListComp.tsx", comp_content)

def gerar_modal(p):
    # Types
    types_content = f"""import type {{ {p['nome']}FormData }} from '../../main/types/{p['nome']}Types';

export interface {p['nome']}ModalProps {{
  modalAberto: boolean;
  editandoId: string | null;
  formData: {p['nome']}FormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof {p['nome']}FormData, v: string) => void;
  onSalvar{p['item_singular']}: () => void;
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Modal" / "types" / f"{p['nome']}ModalTypes.ts", types_content)
    
    # Styles (igual ao padrão)
    styles_content = """import styled from 'styled-components';

// ============================================
// MODAL
// ============================================
export const StyledModalOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: ${props => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

export const StyledModal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const StyledModalClose = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #a0a0b0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

// ============================================
// FORMULÁRIO
// ============================================
export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #a0a0b0;
`;

export const StyledInput = styled.input`
  padding: 12px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 150ms ease;

  &::placeholder {
    color: #6b6b7b;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

export const StyledTextarea = styled.textarea`
  padding: 12px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: all 150ms ease;

  &::placeholder {
    color: #6b6b7b;
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

export const StyledFormSelect = styled.select`
  padding: 12px 16px;
  background: rgba(37, 37, 66, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  option {
    background: #1a1a2e;
    color: #ffffff;
  }
`;

export const StyledModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

// ============================================
// BOTÕES
// ============================================
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(26, 26, 46, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a0a0b0;
          &:hover {
            background: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
        `;
    }
  }}
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Modal" / "styles" / f"{p['nome']}ModalStyles.ts", styles_content)
    
    # Component - construir campos do form
    form_fields_jsx = ""
    i = 0
    while i < len(p['campos']):
        c = p['campos'][i]
        
        # Verificar se pode agrupar com o próximo em uma row
        next_c = p['campos'][i+1] if i+1 < len(p['campos']) else None
        can_row = next_c and c['tipo'] != 'textarea' and next_c['tipo'] != 'textarea' and c['nome'] not in ['observacoes', 'descricao', 'conteudo', 'mensagem']
        
        def build_field(field):
            if field['tipo'] == 'textarea':
                return f"""          <StyledFormGroup>
            <StyledLabel>{field['label']}</StyledLabel>
            <StyledTextarea
              placeholder="{field.get('placeholder', '')}"
              value={{formData.{field['nome']}}}
              onChange={{e => onAtualizarForm('{field['nome']}', e.target.value)}}
            />
          </StyledFormGroup>"""
            elif field['tipo'] == 'select':
                opcoes = "\n".join([f"              <option value=\"{o['v']}\">{o['l']}</option>" for o in field['opcoes']])
                return f"""            <StyledFormGroup>
              <StyledLabel>{field['label']}</StyledLabel>
              <StyledFormSelect
                value={{formData.{field['nome']}}}
                onChange={{e => onAtualizarForm('{field['nome']}', e.target.value)}}
              >
{opcoes}
              </StyledFormSelect>
            </StyledFormGroup>"""
            else:
                return f"""            <StyledFormGroup>
              <StyledLabel>{field['label']}</StyledLabel>
              <StyledInput
                type="{field['tipo']}"
                {f'placeholder="{field["placeholder"]}"' if field.get('placeholder') else ''}
                {f'step="0.01"' if field['tipo'] == 'number' and 'valor' in field['nome'] else ''}
                {f'step="0.1"' if field['tipo'] == 'number' and field['nome'] == 'juros' else ''}
                {f'min="1"' if field['tipo'] == 'number' and field['nome'] == 'parcelas' else ''}
                {f'min="0"' if field['tipo'] == 'number' and field['nome'] == 'parcelasPagas' else ''}
                value={{formData.{field['nome']}}}
                onChange={{e => onAtualizarForm('{field['nome']}', e.target.value)}}
              />
            </StyledFormGroup>"""
        
        if can_row:
            form_fields_jsx += f"""
          <StyledFormRow>
{build_field(c)}
{build_field(next_c)}
          </StyledFormRow>
"""
            i += 2
        else:
            if c['tipo'] == 'textarea':
                form_fields_jsx += f"\n{build_field(c)}\n"
            else:
                form_fields_jsx += f"\n          <StyledFormGroup>\n            <StyledLabel>{c['label']}</StyledLabel>\n"
                if c['tipo'] == 'select':
                    opcoes = "\n".join([f"              <option value=\"{o['v']}\">{o['l']}</option>" for o in c['opcoes']])
                    form_fields_jsx += f"            <StyledFormSelect\n              value={{formData.{c['nome']}}}\n              onChange={{e => onAtualizarForm('{c['nome']}', e.target.value)}}\n            >\n{opcoes}\n            </StyledFormSelect>\n"
                else:
                    extra = ""
                    if c['tipo'] == 'number' and 'valor' in c['nome']:
                        extra = ' step="0.01"'
                    elif c['tipo'] == 'number' and c['nome'] == 'juros':
                        extra = ' step="0.1"'
                    elif c['tipo'] == 'number' and c['nome'] == 'parcelas':
                        extra = ' min="1"'
                    elif c['tipo'] == 'number' and c['nome'] == 'parcelasPagas':
                        extra = ' min="0"'
                    placeholder = f' placeholder="{c.get("placeholder", "")}"' if c.get('placeholder') else ''
                    form_fields_jsx += f"            <StyledInput\n              type=\"{c['tipo']}\"{placeholder}{extra}\n              value={{formData.{c['nome']}}}\n              onChange={{e => onAtualizarForm('{c['nome']}', e.target.value)}}\n            />\n"
                form_fields_jsx += "          </StyledFormGroup>\n"
            i += 1
    
    comp_content = f"""'use client';

import type {{ {p['nome']}ModalProps }} from '../types/{p['nome']}ModalTypes';
import {{
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
}} from '../styles/{p['nome']}ModalStyles';

export default function {p['nome']}ModalComp({{
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvar{p['item_singular']},
}}: {p['nome']}ModalProps) {{
  return (
    <StyledModalOverlay $visible={{modalAberto}} onClick={{onFecharModal}}>
      <StyledModal onClick={{e => e.stopPropagation()}}>
        <StyledModalHeader>
          <StyledModalTitle>{{editandoId ? 'Editar {p['item_singular']}' : 'Nova {p['item_singular']}'}}</StyledModalTitle>
          <StyledModalClose onClick={{onFecharModal}}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>
{form_fields_jsx}
          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={{onFecharModal}}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={{onSalvar{p['item_singular']}}}>
              {{editandoId ? 'Salvar Alterações' : 'Cadastrar {p['item_singular']}'}}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Modal" / "components" / f"{p['nome']}ModalComp.tsx", comp_content)

def gerar_detalhe(p):
    # Types
    detalhe_props = f"  detalhe{p['item_singular']}: {p['item_singular']} | null;\n"
    detalhe_props += "  formatarValor: (v: number) => string;\n  formatarData: (d: string) => string;\n"
    detalhe_props += "  getStatusLabel: (s: string) => string;\n  getStatusCor: (s: string) => string;\n"
    if p['tem_progresso']:
        detalhe_props += "  calcularProgresso: (pg: number, pt: number) => number;\n"
    detalhe_props += "  onFecharDetalhe: () => void;\n"
    detalhe_props += f"  onEditar: (d: {p['item_singular']}) => void;\n"
    
    types_content = f"""import type {{ {p['item_singular']} }} from '../../main/types/{p['nome']}Types';

export interface {p['nome']}DetalheProps {{
{detalhe_props}}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Detalhe" / "types" / f"{p['nome']}DetalheTypes.ts", types_content)
    
    # Styles (igual ao padrão)
    styles_content = """import styled from 'styled-components';

// ============================================
// MODAL DE DETALHES
// ============================================
export const StyledDetalheOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: ${props => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 24px;
`;

export const StyledDetalheModal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const StyledModalClose = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #a0a0b0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

export const StyledDetalheHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StyledDetalheIcon = styled.div<{ $color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => props.$color}1A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${props => props.$color};
  flex-shrink: 0;
  box-shadow: 0 0 16px ${props => props.$color}33;
`;

export const StyledDetalheNome = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

// ============================================
// BARRA DE PROGRESSO
// ============================================
export const StyledDetalheProgress = styled.div`
  margin-bottom: 20px;
`;

export const StyledDetalheBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  overflow: hidden;
`;

export const StyledDetalheFill = styled.div<{ $pct: number; $color: string }>`
  width: ${props => Math.min(props.$pct, 100)}%;
  height: 100%;
  background: linear-gradient(90deg, ${props => props.$color}, ${props => props.$color}dd);
  border-radius: 6px;
  transition: width 0.5s ease;
`;

export const StyledDetalheProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 13px;
  color: #a0a0b0;
`;

// ============================================
// GRID DE DETALHES
// ============================================
export const StyledDetalheGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledDetalheItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledDetalheLabel = styled.span`
  font-size: 12px;
  color: #6b6b7b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledDetalheValue = styled.span`
  font-size: 15px;
  color: #ffffff;
  font-weight: 500;
`;

export const StyledDetalheObservacoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: rgba(37, 37, 66, 0.4);
  border-radius: 12px;
  margin-bottom: 20px;
`;

// ============================================
// BADGES
// ============================================
export const StyledStatusBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$color};
  background: ${props => props.$color}1A;
  border: 1px solid ${props => props.$color}33;
  white-space: nowrap;
`;

// ============================================
// BOTÕES
// ============================================
export const StyledModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(26, 26, 46, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a0a0b0;
          &:hover {
            background: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
        `;
    }
  }}
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Detalhe" / "styles" / f"{p['nome']}DetalheStyles.ts", styles_content)

    # Component
    if p['tem_progresso']:
        progress_jsx = f"""
            <StyledDetalheProgress>
              <StyledDetalheBar>
                <StyledDetalheFill $pct={{pct}} $color={{cor}} />
              </StyledDetalheBar>
              <StyledDetalheProgressInfo>
                <span>{{detalhe{p['item_singular']}.{p['campo_parcelas_pagas']}}}/{{detalhe{p['item_singular']}.{p['campo_parcelas']}}} parcelas</span>
                <span>{{pct}}%</span>
              </StyledDetalheProgressInfo>
            </StyledDetalheProgress>
"""
        progress_calc = f"const pct = calcularProgresso(detalhe{p['item_singular']}.{p['campo_parcelas_pagas']}, detalhe{p['item_singular']}.{p['campo_parcelas']}); const cor = detalhe{p['item_singular']}.{p['campo_status']} === 'quitada' ? '#10b981' : detalhe{p['item_singular']}.{p['campo_status']} === 'atrasada' ? '#ef4444' : '#3b82f6';"
    else:
        progress_jsx = ""
        progress_calc = ""

    # Construir grid de detalhes
    detalhe_grid = ""
    for c in p['campos']:
        if c['nome'] in ['observacoes', 'descricao', 'conteudo', 'mensagem']:
            continue
        if c['nome'] == p['campo_status']:
            detalhe_grid += f"""              <StyledDetalheItem>
                <StyledDetalheLabel>{c['label']}</StyledDetalheLabel>
                <StyledStatusBadge $color={{{{getStatusCor(detalhe{p['item_singular']}.{c['nome']})}}}}>
                  {{{{getStatusLabel(detalhe{p['item_singular']}.{c['nome']})}}}}
                </StyledStatusBadge>
              </StyledDetalheItem>

"""
        elif c['tipo'] == 'number':
            detalhe_grid += f"""              <StyledDetalheItem>
                <StyledDetalheLabel>{c['label']}</StyledDetalheLabel>
                <StyledDetalheValue>{{{{detalhe{p['item_singular']}.{c['nome']}}}}}</StyledDetalheValue>
              </StyledDetalheItem>

"""
        else:
            detalhe_grid += f"""              <StyledDetalheItem>
                <StyledDetalheLabel>{c['label']}</StyledDetalheLabel>
                <StyledDetalheValue>{{{{detalhe{p['item_singular']}.{c['nome']}}}}}</StyledDetalheValue>
              </StyledDetalheItem>

"""

    # Observacoes
    obs_campo = None
    for c in p['campos']:
        if c['nome'] in ['observacoes', 'descricao', 'conteudo', 'mensagem']:
            obs_campo = c['nome']
            break

    obs_jsx = ""
    if obs_campo:
        obs_jsx = f"""
            {{detalhe{p['item_singular']}.{obs_campo} && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{{{{detalhe{p['item_singular']}.{obs_campo}}}}}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}}
"""

    comp_content = f"""'use client';

import type {{ {p['nome']}DetalheProps }} from '../types/{p['nome']}DetalheTypes';
import {{
  StyledDetalheOverlay,
  StyledDetalheModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledDetalheHeader,
  StyledDetalheIcon,
  StyledDetalheNome,
  StyledDetalheProgress,
  StyledDetalheBar,
  StyledDetalheFill,
  StyledDetalheProgressInfo,
  StyledDetalheGrid,
  StyledDetalheItem,
  StyledDetalheLabel,
  StyledDetalheValue,
  StyledDetalheObservacoes,
  StyledStatusBadge,
  StyledModalActions,
  StyledButton,
}} from '../styles/{p['nome']}DetalheStyles';

export default function {p['nome']}DetalheComp({{
  detalhe{p['item_singular']},
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,
{", calcularProgresso" if p['tem_progresso'] else ""}
  onFecharDetalhe,
  onEditar,
}}: {p['nome']}DetalheProps) {{
  if (!detalhe{p['item_singular']}) return null;

  {progress_calc}

  return (
    <StyledDetalheOverlay $visible={{{{!!detalhe{p['item_singular']}}}}} onClick={{{{onFecharDetalhe}}}}>
      <StyledDetalheModal onClick={{{{e => e.stopPropagation()}}}}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do {p['item_singular']}</StyledModalTitle>
          <StyledModalClose onClick={{{{onFecharDetalhe}}}}>✕</StyledModalClose>
        </StyledModalHeader>

        {{detalhe{p['item_singular']} && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={{{{detalhe{p['item_singular']}.categoriaCor}}}}>
                {{{{detalhe{p['item_singular']}.categoriaIcone}}}}
              </StyledDetalheIcon>
              <StyledDetalheNome>{{{{detalhe{p['item_singular']}.{p['campo_principal']}}}}}</StyledDetalheNome>
            </StyledDetalheHeader>

{progress_jsx}
            <StyledDetalheGrid>
{detalhe_grid}            </StyledDetalheGrid>
{obs_jsx}
            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={{{{onFecharDetalhe}}}}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={{{{() => onEditar(detalhe{p['item_singular']})}}}}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Detalhe" / "components" / f"{p['nome']}DetalheComp.tsx", comp_content)

def gerar_confirm(p):
    # Types
    types_content = f"""import type {{ {p['item_singular']} }} from '../../main/types/{p['nome']}Types';

export interface {p['nome']}ConfirmProps {{
  exclusaoPendente: {p['item_singular']} | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Confirm" / "types" / f"{p['nome']}ConfirmTypes.ts", types_content)

    # Styles
    styles_content = """import styled from 'styled-components';

// ============================================
// MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
// ============================================
export const StyledConfirmOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: ${props => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 24px;
`;

export const StyledConfirmModal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  text-align: center;

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const StyledConfirmIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 20px;
`;

export const StyledConfirmTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

export const StyledConfirmText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

export const StyledConfirmItemName = styled.strong`
  color: #ffffff;
  font-weight: 600;
`;

export const StyledConfirmActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

// ============================================
// BOTÕES
// ============================================
export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(26, 26, 46, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a0a0b0;
          &:hover {
            background: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
        `;
    }
  }}
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Confirm" / "styles" / f"{p['nome']}ConfirmStyles.ts", styles_content)

    # Component
    comp_content = f"""'use client';

import type {{ {p['nome']}ConfirmProps }} from '../types/{p['nome']}ConfirmTypes';
import {{
  StyledConfirmOverlay,
  StyledConfirmModal,
  StyledConfirmIcon,
  StyledConfirmTitle,
  StyledConfirmText,
  StyledConfirmItemName,
  StyledConfirmActions,
  StyledButton,
}} from '../styles/{p['nome']}ConfirmStyles';

export default function {p['nome']}ConfirmComp({{
  exclusaoPendente,
  formatarValor,
  onCancelarExclusao,
  onConfirmarEExcluir,
}}: {p['nome']}ConfirmProps) {{
  return (
    <StyledConfirmOverlay $visible={{{{!!exclusaoPendente}}}} onClick={{{{onCancelarExclusao}}}}>
      <StyledConfirmModal onClick={{{{e => e.stopPropagation()}}}}>
        <StyledConfirmIcon>🗑️</StyledConfirmIcon>
        <StyledConfirmTitle>Excluir {p['item_singular']}?</StyledConfirmTitle>
        <StyledConfirmText>
          Tem certeza que deseja excluir {{exclusaoPendente?.{p['campo_principal']}}}?
        </StyledConfirmText>
        <StyledConfirmText>Esta ação não pode ser desfeita.</StyledConfirmText>
        <StyledConfirmActions>
          <StyledButton $variant="secondary" onClick={{{{onCancelarExclusao}}}}>
            Cancelar
          </StyledButton>
          <StyledButton $variant="danger" onClick={{{{onConfirmarEExcluir}}}}>
            Sim, Excluir
          </StyledButton>
        </StyledConfirmActions>
      </StyledConfirmModal>
    </StyledConfirmOverlay>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Confirm" / "components" / f"{p['nome']}ConfirmComp.tsx", comp_content)

def gerar_info(p):
    # Types
    types_content = f"""export interface {p['nome']}InfoProps {{
  modalInfoAberto: boolean;
  onFecharInfo: () => void;
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Info" / "types" / f"{p['nome']}InfoTypes.ts", types_content)

    # Styles
    styles_content = """import styled from 'styled-components';

// ============================================
// MODAL DE INFORMAÇÕES DA PÁGINA
// ============================================
export const StyledInfoOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: ${props => (props.$visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1150;
  padding: 24px;
`;

export const StyledInfoModal = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const StyledModalClose = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #a0a0b0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

export const StyledInfoIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.1);
  border: 2px solid rgba(139, 92, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 20px;
`;

export const StyledInfoTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px 0;
  text-align: center;
`;

export const StyledInfoText = styled.p`
  font-size: 14px;
  color: #a0a0b0;
  margin: 0 0 20px 0;
  line-height: 1.6;
  text-align: center;
`;

export const StyledInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledInfoListItem = styled.li`
  font-size: 13px;
  color: #a0a0b0;
  line-height: 1.5;
  padding: 12px 16px;
  background: rgba(37, 37, 66, 0.4);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);

  strong {
    color: #ffffff;
    font-weight: 600;
  }
`;

// ============================================
// BOTÕES
// ============================================
export const StyledModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  border: none;
  white-space: nowrap;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(26, 26, 46, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(37, 37, 66, 0.8);
            border-color: rgba(139, 92, 246, 0.3);
          }
        `;
      case 'danger':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          &:hover {
            background: rgba(239, 68, 68, 0.2);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a0a0b0;
          &:hover {
            background: rgba(139, 92, 246, 0.1);
            color: #8b5cf6;
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
        `;
    }
  }}
`;
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Info" / "styles" / f"{p['nome']}InfoStyles.ts", styles_content)

    # Component
    info_items_jsx = "\n          ".join([f"<StyledInfoListItem>{item}</StyledInfoListItem>" for item in p['info_items']])

    comp_content = f"""'use client';

import type {{ {p['nome']}InfoProps }} from '../types/{p['nome']}InfoTypes';
import {{
  StyledInfoOverlay,
  StyledInfoModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledInfoIcon,
  StyledInfoTitle,
  StyledInfoText,
  StyledInfoList,
  StyledInfoListItem,
  StyledModalActions,
  StyledButton,
}} from '../styles/{p['nome']}InfoStyles';

export default function {p['nome']}InfoComp({{
  modalInfoAberto,
  onFecharInfo,
}}: {p['nome']}InfoProps) {{
  return (
    <StyledInfoOverlay $visible={{{{modalInfoAberto}}}} onClick={{{{onFecharInfo}}}}>
      <StyledInfoModal onClick={{{{e => e.stopPropagation()}}}}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de {p['titulo']}</StyledModalTitle>
          <StyledModalClose onClick={{{{onFecharInfo}}}}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>{p['emoji']}</StyledInfoIcon>
        <StyledInfoTitle>{p['subtitulo']}</StyledInfoTitle>
        <StyledInfoText>
          A página de {p['titulo']} permite que você gerencie todos os seus {p['item_plural_display']}
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          {info_items_jsx}
        </StyledInfoList>

        <StyledModalActions>
          <StyledButton $variant="primary" onClick={{{{onFecharInfo}}}}>
            Entendi
          </StyledButton>
        </StyledModalActions>
      </StyledInfoModal>
    </StyledInfoOverlay>
  );
}}
"""
    write_file(COMPONENTS_DIR / p['pasta'] / f"{p['nome']}Info" / "components" / f"{p['nome']}InfoComp.tsx", comp_content)

# ============================================
# FUNÇÃO PRINCIPAL
# ============================================
def main():
    print("=" * 60)
    print("🚀 Gerador de Páginas - Lumen")
    print("=" * 60)
    print()

    for p in PAGINAS:
        print(f"\n📋 Gerando página: {p['titulo']}")
        print("-" * 40)

        # App page
        gerar_page_app(p)

        # Main
        gerar_main_index(p)
        gerar_providers(p)
        gerar_types(p)
        gerar_services(p)
        gerar_utils(p)
        gerar_main_utils(p)
        gerar_main_styles(p)
        gerar_main_comp(p)

        # Sub-componentes
        gerar_header(p)
        gerar_resumo(p)
        gerar_list(p)
        gerar_modal(p)
        gerar_detalhe(p)
        gerar_confirm(p)
        gerar_info(p)

        print(f"✅ Página {p['titulo']} gerada com sucesso!")

    print("\n" + "=" * 60)
    print("🎉 Todas as páginas foram geradas com sucesso!")
    print("=" * 60)
    print(f"\n📊 Total de páginas geradas: {len(PAGINAS)}")
    print("\n💡 Para verificar, rode: cd frontend && npx tsc --noEmit")

if __name__ == "__main__":
    main()
