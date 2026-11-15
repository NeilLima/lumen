# Lumen — Gestão Financeira Pessoal

Plataforma completa de finanças pessoais: controle de receitas e despesas, cartões de crédito, metas, investimentos, dívidas, empréstimos, estoque e dashboard com relatórios.

🔗 **Demo:** https://lumen-frontend-gold.vercel.app

---

## ✨ Funcionalidades

### 💰 Finanças
- Receitas e despesas com categorização automática
- Contas (corrente, poupança, carteira)
- Orçamento mensal com acompanhamento de limites
- Metas financeiras com progresso
- Investimentos e aplicações
- Dívidas e empréstimos com amortização

### 💳 Cartões
- Múltiplos cartões de crédito/débito
- Fatura com fechamento e vencimento
- Lançamentos por cartão com categorização

### 📦 Estoque & Compras
- Cadastro de produtos com preço e estoque
- Lista de compras vinculada ao estoque
- Sincronização automática produto → item de compra

### 📊 Dashboard
- Visão geral de entradas/saídas
- Gráficos de gastos por categoria
- Fluxo de caixa mensal
- Alertas de orçamento estourado

### 🔐 Autenticação
- Registro e login com JWT
- Perfis isolados por usuário
- Sessão persistente

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, styled-components, TanStack Query |
| **Backend** | NestJS, TypeScript, Prisma ORM |
| **Banco** | PostgreSQL (Neon) |
| **Deploy** | Vercel (frontend + backend serverless) |
| **Auth** | JWT + Passport |

---

## 🏗️ Arquitetura

```
lumen/
├── frontend/          # Next.js App Router
│   └── src/
│       ├── app/       # Rotas (App Router)
│       ├── components/# Features por domínio
│       ├── services/  # Camada HTTP (TanStack Query)
│       ├── hooks/     # Hooks reutilizáveis
│       └── theme/     # Design system (styled-components)
│
└── backend/           # NestJS modular
    └── src/
        ├── modules/   # Um módulo por domínio
        │   ├── accounts/    # Contas bancárias
        │   ├── incomes/     # Receitas
        │   ├── expenses/    # Despesas
        │   ├── cards/       # Cartões de crédito
        │   ├── orcamento/   # Orçamento
        │   ├── metas/       # Metas
        │   ├── investimentos/# Investimentos
        │   ├── dividas/     # Dívidas
        │   ├── emprestimos/ # Empréstimos
        │   ├── estoque/     # Estoque
        │   ├── compras/     # Lista de compras
        │   ├── dashboard/   # Agregações/relatórios
        │   └── ...
        ├── auth/       # JWT + registro/login
        ├── core/       # Prisma, storage, base
        └── common/     # Guards, decorators, pipes
```

### Padrão de camadas (backend)

```
HTTP Request → Controller → Service → Repository → Prisma → PostgreSQL
```

- **Controller**: recebe HTTP, valida JWT, delega
- **Service**: regras de negócio (cálculos, validações)
- **Repository**: queries Prisma isoladas
- **DTO**: validação de entrada com class-validator

### Padrão de camadas (frontend)

```
Component → Utils → Services → API → Backend
```

- **Component**: só renderização
- **Utils**: estado, funções, objetos
- **Services**: TanStack Query + HTTP + cache

---

## 🚀 Como rodar localmente

### Backend

```bash
cd backend
npm install
cp .env.example .env   # configure DATABASE_URL (Neon)
npx prisma generate
npx prisma db push     # cria as tabelas
npm run start:dev      # http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # configure NEXT_PUBLIC_API_URL
npm run dev            # http://localhost:3000
```

---

## 🧪 Testes

```bash
cd backend
npm test               # Jest unit tests
npm run test:e2e       # E2E tests
```

---

## 📦 Módulos implementados

| Módulo | Descrição |
|---|---|
| `accounts` | Contas bancárias do usuário |
| `incomes` | Receitas/entradas |
| `expenses` | Despesas/saídas |
| `cards` | Cartões de crédito com fatura |
| `orcamento` | Orçamento mensal por categoria |
| `metas` | Metas financeiras com progresso |
| `investimentos` | Investimentos e aplicações |
| `dividas` | Dívidas e parcelas |
| `emprestimos` | Empréstimos concedidos/tomados |
| `estoque` | Controle de estoque |
| `compras` | Lista de compras |
| `dashboard` | Agregações e relatórios |
| `notificacoes` | Alertas e notificações |
| `configuracoes` | Preferências do usuário |
| `auth` | Autenticação JWT |

---

## 🔒 Decisões técnicas

- **Prisma + PostgreSQL (Neon)**: ORM type-safe, migrations versionadas, serverless-friendly
- **NestJS modular**: cada domínio isolado em módulo próprio (scalável)
- **JWT stateless**: auth sem sessão no servidor, funciona em serverless
- **TanStack Query**: cache automático, invalidação inteligente, loading states
- **Repository pattern**: queries isoladas do service — testável e substituível
- **Vercel serverless**: frontend Next.js + backend NestJS como function

---

## 📄 Licença

Uso educacional e portfólio.
